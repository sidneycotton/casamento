# Casamento Vitor & Julia · 26.06.2027

Site-convite estático (HTML/CSS/JS, sem build).

- `index.html`: estrutura das seções
- `css/style.css`: visual (oliva e bege)
- `js/config.js`: **nomes, data, PIX, WhatsApp, fotos e lista de presentes**. É o único arquivo que precisa ser editado.
- `js/main.js`: envelope, carrossel, contagem, RSVP, carrinho e PIX
- `img/fotos/`: fotos do carrossel

Para ver localmente: `python3 -m http.server` e abrir http://localhost:8000.

Veja `PROPOSTA.md` para o plano completo.

## Publicar no Firebase Hosting

O site é publicado sozinho pelo GitHub Actions (`.github/workflows/firebase-deploy.yml`) a cada push. Configuração única:

1. Em https://console.firebase.google.com crie um projeto (plano Spark, gratuito). Anote o **ID do projeto**.
2. Se o ID não for `casamento-vitor-julia`, troque-o em `.firebaserc`.
3. No Firebase, abra **Configurações do projeto → Contas de serviço → Gerar nova chave privada**. Isso baixa um arquivo `.json`.
4. No GitHub, abra o repositório → **Settings → Secrets and variables → Actions → New repository secret**:
   - Nome: `FIREBASE_SERVICE_ACCOUNT`
   - Valor: o conteúdo inteiro do arquivo `.json`
5. Em **Actions → Publicar no Firebase → Run workflow** (ou faça qualquer push). O site fica em `https://<id-do-projeto>.web.app`.

Para usar um domínio próprio: Firebase → **Hosting → Adicionar domínio personalizado**.

Alternativa manual, do seu computador: `npx firebase-tools login` e depois `npx firebase-tools deploy --only hosting`.
