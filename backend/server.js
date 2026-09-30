const http = require("http");

const PORT = 3001;

// Exemplo de fila. Em produção viria do CRM/banco/sistema de atendimento.
const specialists = [
  {
    id: "esp-01",
    name: "Ana Matos",
    whatsapp: "5515988184871",
    available: true,
    activeChats: 1
  },
  {
    id: "esp-02",
    name: "Carlos",
    whatsapp: "5511888888888",
    available: true,
    activeChats: 2
  }
];

function pickAvailableSpecialist() {
  return specialists
    .filter(item => item.available)
    .sort((a, b) => a.activeChats - b.activeChats)[0] || null;
}

async function notifySpecialist(specialist, triage) {
  /*
    IMPLEMENTAÇÃO DE PRODUÇÃO:
    - salvar triagem no CRM/banco;
    - criar atendimento/ticket;
    - vincular ao especialista;
    - enviar notificação usando a integração oficial escolhida.

    Nunca coloque token da API do WhatsApp no front-end.
  */

  console.log("\n=== NOVA TRIAGEM RECEBIDA ===");
  console.log("Especialista:", specialist.name);
  console.log("Pet:", triage.pet?.name || "não selecionado");
  console.log("Adotante:", triage.adopter?.name || "não informado");
  console.log("Resultado:", triage.result?.title || "não informado");
  console.log("=============================\n");

  return true;
}

const server = http.createServer((req, res) => {
  // CORS apenas para desenvolvimento local.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/triagem/handoff") {
    let raw = "";

    req.on("data", chunk => {
      raw += chunk;
    });

    req.on("end", async () => {
      try {
        const triage = JSON.parse(raw || "{}");
        const specialist = pickAvailableSpecialist();

        if (!specialist) {
          res.writeHead(503);
          res.end(JSON.stringify({
            error: "Nenhum especialista disponível no momento."
          }));
          return;
        }

        await notifySpecialist(specialist, triage);
        specialist.activeChats += 1;

        res.writeHead(200);
        res.end(JSON.stringify({
          ok: true,
          specialistId: specialist.id,
          specialistName: specialist.name,
          specialistWhatsapp: specialist.whatsapp
        }));

      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          error: "Payload de triagem inválido."
        }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada." }));
});

server.listen(PORT, () => {
  console.log(`Backend de triagem em http://localhost:${PORT}`);
});
