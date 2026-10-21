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

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
for (const anchor of anchors) {
  assert.ok(ids.has(anchor), 'Âncora sem destino: #' + anchor);
}
const waNumbers = [...html.matchAll(/wa\.me\/(\d+)/g)].map(m => m[1]);
assert.ok(waNumbers.length > 0, 'Nenhum contato WhatsApp encontrado');
assert.equal(new Set(waNumbers).size, 1, 'Os CTAs usam números WhatsApp distintos');
assert.match(html, /mailto:aray\.solucoes@gmail\.com/);
for (const project of ['Vitro', 'RetailFlow', 'Priora', 'MultAgent', 'ArayFlow', 'DashInfojobs-Tech']) {
  assert.ok(html.includes('https://github.com/llongaray/' + project), 'Link do projeto ausente: ' + project);
}
assert.match(html, /Projeto real/);


const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert.ok(jsonLdBlocks.length >= 2, 'Dados estruturados ausentes');
for (const block of jsonLdBlocks) {
  const parsed = JSON.parse(block[1]);
  assert.equal(parsed['@context'], 'https://schema.org');
}
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
assert.equal(canonical, ogUrl, 'Canonical difere do Open Graph URL');
const org = jsonLdBlocks.map(b => JSON.parse(b[1])).find(v => v['@type'] === 'Organization');
assert.equal(org?.url, canonical, 'Organization.url difere da URL canônica');
assert.equal(new URL(canonical).hostname, cname, 'Host canônico difere de CNAME');

assert.match(html, /class="skip-link" href="#main"/);
assert.match(html, /<main id="main" tabindex="-1">/);
assert.match(html, /aria-controls="navMenu"/);
assert.match(html, /aria-label="Navegação principal"/);
console.log('Validações estáticas: OK. Atenção: não substituem testes de navegador, acessibilidade ou URLs.');
