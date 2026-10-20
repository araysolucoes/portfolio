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

const ids = new Set([...html.matchAll(/\\bid="([^"]+)"/g)].map(m => m[1]));
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
for (const anchor of anchors) {
  assert.ok(ids.has(anchor), 'Âncora sem destino: #' + anchor);
}
const waNumbers = [...html.matchAll(/wa\\.me\\/(\\d+)/g)].map(m => m[1]);
assert.ok(waNumbers.length > 0, 'Nenhum contato WhatsApp encontrado');
assert.equal(new Set(waNumbers).size, 1, 'Os CTAs usam números WhatsApp distintos');
assert.match(html, /mailto:aray\\.solucoes@gmail\\.com/);
assert.match(html, /Demonstração/);

console.log('Validações estáticas: OK. Atenção: não substituem testes de navegador, acessibilidade ou URLs.');
