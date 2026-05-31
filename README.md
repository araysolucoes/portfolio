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

## Contato

A seção **Entre em contato** exibe apenas links diretos:

- **WhatsApp:** +55 51 9 9484-1638
- **E-mail:** aray.solucoes@gmail.com
- **Instagram:** [@aray_solucoes](https://www.instagram.com/aray_solucoes/)

## Alterar WhatsApp ou e-mail

- **WhatsApp:** edite os links em `index.html` ou a constante `CONFIG.whatsapp` em `js/main.js`.
- **E-mail / Instagram:** edite os links na seção `#contato` em `index.html`.

Número atual: `+55 51 9 9484-1638` → `https://wa.me/5551994841638`

## Desenvolvimento local

Abra `index.html` diretamente no navegador ou use um servidor estático simples:

```bash
npx serve .
```

## Licença

© 2026 Aray Soluções. Todos os direitos reservados.
