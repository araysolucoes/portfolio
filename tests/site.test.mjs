// Auditoria estática sem dependências; execução: node tests/site.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../js/main.js', import.meta.url), 'utf8');
const cname = readFileSync(new URL('../CNAME', import.meta.url), 'utf8').trim();
assert.match(html, /lang="pt-BR"/);
assert.match(html, /<meta name="description"/);
assert.match(html, /rel="canonical"/);
assert.match(html, /property="og:url"/);
assert.match(html, /property="og:image" content="https:\/\//);
assert.match(html, /name="twitter:image" content="https:\/\//);
assert.match(html, /"@type": "Organization"/);
assert.match(html, /linkedin\.com\/company\/aray-solucoes/);
for (const section of ['hero','sobre','servicos','tecnologias','diferenciais','portfolio','contato','fundador']) {
  assert.ok(html.includes('id="' + section + '"'), 'Seção ausente: ' + section);
}
assert.match(css, /:focus-visible/);
assert.match(css, /prefers-reduced-motion/);
assert.match(js, /aria-expanded/);
assert.match(js, /visibilitychange/);
assert.match(js, /cancelAnimationFrame/);
assert.equal(cname, 'araysolucoes.com.br');
console.log('Validações estáticas: OK. Atenção: não substituem testes de navegador, acessibilidade ou URLs.');
