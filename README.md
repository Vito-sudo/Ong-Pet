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


## Entrega acadêmica — páginas e imagens locais

- `index.html`: página inicial original, triagem Nala, adoção, doações demonstrativas e contato.
- `projetos.html`: projetos sociais, voluntariado e acesso às doações.
- `cadastro.html`: nome completo, e-mail, CPF, telefone, nascimento, endereço, CEP, cidade e estado. Agrupamento em fieldsets, validação HTML5, máscaras e verificação dos dígitos do CPF.
- `css/entrega.css` e `js/entrega.js`: complementos das novas páginas.
- `imagens/`: fotografias locais em JPEG e WebP; origens em `fontes.json`. Uma URL quebrada foi substituída pela foto de cães já utilizada na capa.

### Execução e validação

Abra `index.html` no navegador ou use `python -m http.server 8000` e acesse http://localhost:8000. O backend da triagem tem execução e integração separadas; mantenha sua configuração existente.

Antes da entrega, valide as três páginas em https://validator.w3.org/nu/ usando upload dos arquivos. Esta entrega inclui verificação local de caminhos, IDs e sintaxe JavaScript; não há certificação W3C ou auditoria completa WCAG AA. O carregamento inferior a cinco segundos depende da conexão e hospedagem e ainda exige medição. CSS/JS originais foram mantidos legíveis para estudo; minificação de produção permanece pendente.

O cadastro só valida os dados na memória da página. Não faz inscrições reais nem persiste dados. Valores, métricas, contatos, doações e números de WhatsApp são demonstrativos. Autenticação, área administrativa, gestão de voluntários, certificados, newsletter, pagamentos reais e integração WhatsApp não estão implementados como serviços de produção.

### GitHub

A entrega deve conter todo o código e imagens em repositório público. Confirme a visibilidade nas configurações do GitHub. Cada integrante deve enviar o mesmo link. GitHub Pages pode hospedar o front-end com HTTPS; não executa o backend Node. Para publicar as correções na principal, revise e faça merge da branch `ajustes-entrega-ong`.
