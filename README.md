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

## Formulário de contato (FormSubmit)

O formulário envia para **aray.solucoes@gmail.com** via [FormSubmit.co](https://formsubmit.co), usando envio AJAX (o visitante permanece no site).

### Importante: não abrir como arquivo local

Se você abrir `index.html` com duplo clique (`file:///...`), o FormSubmit **não funciona** e aparece erro na tela do FormSubmit. Isso é limitação do serviço, não do código.

**Como testar corretamente:**

1. **Produção:** publique no GitHub Pages e acesse pela URL `https://...`
2. **Local:** na pasta do projeto, execute `npx serve .` e abra `http://localhost:3000` (ou a porta exibida)

### Ativação do e-mail (obrigatória na primeira vez)

1. Com o site em **https** (GitHub Pages ou `npx serve`), envie um formulário de teste.
2. Abra o e-mail de confirmação em `aray.solucoes@gmail.com` (assunto da FormSubmit).
3. Clique no link de ativação.
4. Novos envios passam a chegar na caixa de entrada (verifique também spam).

Se o envio falhar após publicar, o formulário oferece link **mailto:** como alternativa.

## Alterar WhatsApp ou e-mail

- **WhatsApp:** edite os links em `index.html` ou a constante `CONFIG.whatsapp` em `js/main.js`.
- **E-mail do formulário:** altere `action` do `<form>` em `index.html` e o destino no painel FormSubmit, se necessário.

Número atual: `+55 51 9 9484-1638` → `https://wa.me/5551994841638`

## Desenvolvimento local

Abra `index.html` diretamente no navegador ou use um servidor estático simples:

```bash
npx serve .
```

## Licença

© 2026 Aray Soluções. Todos os direitos reservados.
