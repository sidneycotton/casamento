# Site-convite do casamento: proposta

## O que esses sites costumam ter

Plataformas brasileiras como iCasei, Casar.com, Lejour e Zankyou, e os sites feitos sob medida, costumam seguir a mesma estrutura:

| Seção | Para que serve | No mockup? |
|---|---|---|
| Abertura / capa | Primeira impressão: nomes, data, foto ou animação | ✅ Envelope com selo de cera |
| Galeria / carrossel | Fotos do casal (ensaio pré-wedding) | ✅ |
| Contagem regressiva | Cria expectativa | ✅ |
| Cerimônia e local | Data, hora, endereço, mapa, "salvar na agenda" | ✅ Google Maps, Waze, Google Agenda |
| Traje / paleta | Orienta os convidados sobre o que vestir | ✅ Social + paleta oliva/bege |
| Confirmação de presença (RSVP) | Lista de quem vem, com prazo | ✅ Formulário que envia pelo WhatsApp |
| Lista de presentes | Cotas em dinheiro com nomes de presentes | ✅ Loja com carrinho + PIX com valor |
| Dicas para quem vem de fora | Aeroporto, hotéis, passeios | ✅ Esboço |
| Perguntas frequentes | Crianças, estacionamento, horários | ✅ |
| Nossa história | Linha do tempo de como se conheceram | ❌ Sugestão |
| Mural de recados | Convidados deixam mensagens públicas | ❌ Sugestão |
| Padrinhos | Fotos e nomes de padrinhos e madrinhas | ❌ Sugestão |
| Playlist / sugestão de música | Convidados sugerem músicas | ❌ Menos útil sem festa |
| Galeria pós-casamento | Fotos do dia, enviadas depois | ❌ Para depois do casamento |

## Como funciona a lista de presentes no mockup

Os presentes não são produtos de verdade, são "cotas" com nome bonito. O convidado:

1. Escolhe um ou mais presentes (ou digita um valor livre) e eles vão para um carrinho.
2. Informa o nome e uma mensagem.
3. Recebe um **QR code PIX com o valor exato** e o código "copia e cola". O código segue o padrão BR Code do Banco Central e é gerado no próprio navegador.
4. Toca em "Já fiz o PIX" e pode enviar o comprovante e a mensagem pelo WhatsApp de vocês.

**Vantagens:** sem taxa nenhuma, o dinheiro cai direto na conta, não precisa de servidor.
**Limitação:** o site não "sabe" quem pagou. A confirmação vem pelo extrato do banco e pelo WhatsApp.

### Opções para evoluir

| Opção | Custo | O que ganha |
|---|---|---|
| **PIX direto (atual)** | Grátis | Simples, sem taxas |
| Mercado Pago / Stripe (links de pagamento) | ~4% a 5% por transação | Cartão de crédito parcelado e confirmação automática |
| Planilha Google + Apps Script | Grátis | Registro automático de presentes e recados, e "cotas esgotadas" (ex.: passagens 3/10) |
| Plataformas prontas (iCasei, Casar.com) | Taxa sobre os presentes | Tudo pronto, mas visual limitado e sem o envelope |

**Recomendação:** começar com PIX direto e, se quiserem, ligar o RSVP e os recados a uma planilha Google (grátis). Assim vocês têm a lista de convidados confirmados num lugar só, sem depender do WhatsApp.

## Hospedagem do site

GitHub Pages (grátis, já que o projeto está no GitHub) ou Vercel/Netlify. Dá para usar um domínio próprio, por exemplo `sidneyenome.com.br` (cerca de R$ 40/ano no registro.br).

**Convite personalizado:** o site aceita `?para=Família Souza` no link, e o envelope mostra "Um convite para Família Souza". Dá para mandar um link diferente para cada família.

## O que preciso de vocês

- [ ] Nomes como querem que apareçam (e iniciais para o selo)
- [ ] Horário da cerimônia
- [ ] 8 a 15 fotos para o carrossel (de preferência horizontais, boa resolução) e uma foto da igreja
- [ ] Legenda curta para cada foto (opcional)
- [ ] Chave PIX, nome do recebedor e cidade
- [ ] Número de WhatsApp para confirmações e comprovantes
- [ ] Prazo para confirmar presença
- [ ] Revisão da lista de presentes (itens, valores, textos)
- [ ] Traje: confirmar "Social" e as cores reservadas para padrinhos
- [ ] Texto de "Nossa história", se quiserem essa seção
- [ ] Dicas de hotel e informação de estacionamento
- [ ] Versículo: manter Mateus 19:6 ou trocar
