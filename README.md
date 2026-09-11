# Aqui e Agora Pet — Secretária Virtual de Triagem

## Fluxo corrigido

O botão flutuante não é mais um atalho direto para o WhatsApp.

1. O usuário abre a **Secretária de Triagem (Nala)**.
2. A Nala coleta o perfil do adotante.
3. A triagem gera um resumo estruturado.
4. O usuário autoriza o encaminhamento.
5. O front envia a triagem para `POST /api/triagem/handoff`.
6. O backend seleciona o especialista disponível.
7. A triagem deve ser salva/encaminhada automaticamente para esse especialista.
8. Só depois o botão **Falar com especialista no WhatsApp** é liberado.
9. O usuário entra no WhatsApp sem precisar repetir toda a triagem.

## Estrutura

```text
aqui-agora-pet-secretaria-triagem/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── backend/
│   └── server.js
└── README.md
```

## Importante

Um HTML estático, sozinho, não consegue enviar silenciosamente uma mensagem
para o WhatsApp de um atendente.

Para que o encaminhamento seja realmente automático, o endpoint de handoff
precisa ser conectado ao sistema de atendimento da ONG, CRM ou API oficial
do WhatsApp Business.

O arquivo `backend/server.js` já demonstra:
- recebimento da triagem;
- escolha de um especialista disponível;
- retorno do especialista ao front-end.

A função `notifySpecialist()` é o ponto onde a integração real deverá ser feita.

## Número de teste

Os números atuais são demonstrativos. Substitua pelos números reais antes de publicar.


## Correção V3 — campo de resposta persistente

- O composer de resposta agora fica sempre visível na base da conversa.
- Perguntas de múltipla escolha exibem opções rápidas acima do composer, sem remover o campo de texto.
- O usuário também pode digitar uma resposta livre; nesse caso ela é marcada para revisão humana.
- A altura do modal passou a respeitar a altura real da tela, evitando o corte observado em notebooks/telas baixas.
- A Nala recebeu uma imagem de Golden Retriever como mascote visual.
