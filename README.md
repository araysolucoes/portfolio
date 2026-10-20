# Aray Soluções — Site Institucional

Website institucional estático da **Aray Soluções**, publicado via [GitHub Pages](https://docs.github.com/pages), com domínio configurado em [CNAME](./CNAME): `araysolucoes.com.br`.

> Estado do projeto: HTML, CSS e JavaScript sem backend. Fluxo de revisão proposto: `dev` → `hml` → `main`. A publicação do GitHub Pages deve continuar apontando para `main`; confirmar isso nas configurações antes de implantar alterações.

## Estrutura

```text
├── index.html          # Conteúdo, metadados SEO e JSON-LD
├── css/styles.css      # Design system e responsividade
├── js/main.js          # Navegação, efeitos visuais e fallback WhatsApp
├── static/imgs/        # Logomarcas e imagens
├── favicon.ico
├── favicon.svg
├── CNAME               # Domínio personalizado
└── README.md
```

## Desenvolvimento

Não há processo de build. Para testar localmente, rode um servidor estático a partir da raiz:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000/`. Não adicione chaves secretas ou credenciais aos arquivos: todo o código servido pelo GitHub Pages é público.

## Fluxo de alterações e revisão

1. Trabalhe na branch `dev` (ou em branch de recurso baseada nela).
2. Verifique alterações no navegador, incluindo dispositivos móveis e navegação por teclado.
3. Promova o conteúdo revisado para `hml`, por PR ou integração controlada, sem publicação automática em produção.
4. Solicite aprovação explícita antes de mesclar `hml` em `main`.
5. Após a publicação, confira o domínio, links, console, prévia social e os principais pontos de contato.

**Atenção:** branch `hml` não é sinônimo de ambiente com URL de testes disponível. GitHub Pages suporta apenas a origem configurada. Uma prévia HML separada exige hospedagem ou workflow específico, a aprovar antes de implementar.

## GitHub Pages e domínio

- Origem de publicação planejada: `main` na pasta `/ (root)`.
- `CNAME`: `araysolucoes.com.br`.
- Site divulgado: https://www.araysolucoes.com.br.
- **Pendente de validação:** redirecionamento apex ↔ www e escolha do hostname canônico. Os metadados da branch `dev` usam www provisoriamente; não publicar sem verificar o domínio realmente servido.

Não remova `CNAME` nem altere DNS sem validação do ambiente real. Mudanças em `main` poderão afetar imediatamente o site público.

## SEO e redes sociais

O arquivo `index.html` contém `description`, Open Graph, Twitter Card e JSON-LD `Organization`/`Person`. As correções P0 em `dev` adicionam URL canônica, `og:url`, imagens absolutas e LinkedIn em `sameAs`.

Antes da publicação:
- validar 200/HTTPS para URL canônica e imagens;
- validar HTML e JSON-LD;
- inspecionar prévia de compartilhamento no LinkedIn e outras redes;
- garantir que links para o site não estejam apontando para GitHub como URL institucional.

## Contato — conferir antes de modificar

Os contatos atualmente inscritos no código são:
- WhatsApp: `+55 51 99484-1638` (`https://wa.me/5551994841638`);
- E-mail: `aray.solucoes@gmail.com`;
- Instagram: https://www.instagram.com/aray_solucoes/;
- LinkedIn empresarial: https://www.linkedin.com/company/aray-solucoes/.

**Pendente:** confirmação do número comercial ativo. O número aparece em links diretos de `index.html` e em `CONFIG.whatsapp` dentro de `js/main.js`. Não substitua contatos sem autorização.

## Checklist para revisão de PR

- [ ] Card Trello vinculado e escopo definido;
- [ ] Nenhuma senha, token ou segredo no frontend;
- [ ] Layout testado em celular e desktop;
- [ ] Navegação por teclado, foco e alt revisados;
- [ ] Links, e-mail e WhatsApp verificados;
- [ ] Metadados e imagens sociais validados;
- [ ] `CNAME` e configuração de Pages preservados;
- [ ] Documentação e evidências atualizadas;
- [ ] Aprovação antes de mesclar para `main`.

## Reversão

Caso uma publicação apresente regressão, identifique o commit publicado na branch `main` e reverta-o por um novo commit de correção/revert, preferencialmente via PR. Não use `git reset --hard` seguido de push forçado em produção. Teste o rollback e registre o incidente no Trello.

## Gestão do projeto

- [Kanban portifolio aray](https://trello.com/b/SfgPGwRC/portifolio-aray)
- [Auditoria e Roadmap no Drive](https://docs.google.com/document/d/1agKgJhI1TvoLQ52afM50nqXrHXqf8kYCY_AjP9LmeLk/edit)

© 2026 Aray Soluções. Todos os direitos reservados.
