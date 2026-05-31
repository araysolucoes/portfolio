# Aray Soluções — Site Institucional

Landing page one-page da **Aray Soluções**, hospedada no GitHub Pages.

## Estrutura

```
├── index.html
├── css/styles.css
├── js/main.js
├── favicon.ico
└── static/imgs/
    ├── logo-marca_fundo-transparente.png
    ├── logo-aray.jpeg
    └── foto-perfil.jpeg
```

## Publicar no GitHub Pages

1. Envie o repositório para o GitHub (`main`).
2. Em **Settings → Pages**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / **Folder:** `/ (root)`
3. Aguarde o deploy. A URL será algo como:
   - `https://<usuario>.github.io/<repositorio>/`
   - ou `https://<usuario>.github.io/` se o repositório for `<usuario>.github.io`

### URL canônica e Open Graph

Após o deploy, edite `index.html` e adicione (se desejar) em `<head>`:

```html
<link rel="canonical" href="https://SUA-URL-AQUI/">
<meta property="og:url" content="https://SUA-URL-AQUI/">
```

Substitua `og:image` e `twitter:image` pela URL absoluta da imagem se o compartilhamento social não exibir o logo corretamente.

## Formulário de contato (mailto)

O formulário usa `mailto:aray.solucoes@gmail.com` com `enctype="text/plain"`. Ao enviar, o **programa de e-mail do visitante** abre (Gmail, Outlook, app do celular, etc.) com os dados preenchidos. O cliente precisa clicar em **Enviar** na janela de e-mail para a mensagem chegar na caixa da Aray.

Funciona em GitHub Pages, servidor local e ao abrir o HTML direto no navegador (desde que exista um app de e-mail configurado).

## Alterar WhatsApp ou e-mail

- **WhatsApp:** edite os links em `index.html` ou a constante `CONFIG.whatsapp` em `js/main.js`.
- **E-mail do formulário:** altere o `action="mailto:..."` do `<form>` em `index.html`.

Número atual: `+55 51 9 9484-1638` → `https://wa.me/5551994841638`

## Desenvolvimento local

Abra `index.html` diretamente no navegador ou use um servidor estático simples:

```bash
npx serve .
```

## Licença

© 2026 Aray Soluções. Todos os direitos reservados.
