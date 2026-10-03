const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
require.extensions['.tsx'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }, fileName: filename,
  }).outputText, filename);
};
const PromoBanner = require('../components/home/PromoBanner.tsx').default;
const promos = [1, 2].map(n => ({ id: String(n), title: `Offer ${n}`, subtitle: `Subtitle ${n}`, description: `Terms ${n}: selected units only`, project: 'Residence', discount: '1.39M', validUntil: '2026-12-31', ctaText: `View offer ${n}`, ctaUrl: `/promotion?offer=${n}`, isActive: true }));
const html = renderToStaticMarkup(React.createElement(PromoBanner, { promos }));
for (const promo of promos) {
  for (const value of [promo.title, promo.subtitle, promo.description, promo.validUntil, promo.ctaUrl]) assert.ok(html.includes(value), `Server HTML includes ${value}`);
}
assert.equal((html.match(/<details\b/g) || []).length, 2);
assert.ok(html.includes('<noscript>'), 'No-JS display fallback');
assert.ok(!html.includes('tabindex="-1"'), 'No-JS links and disclosures remain keyboard accessible');
assert.equal(renderToStaticMarkup(React.createElement(PromoBanner, { promos: [] })), '');
const page = fs.readFileSync(path.join(__dirname, '../app/page.tsx'), 'utf8');
assert.ok(page.includes("import PromoBanner from '@/components/home/PromoBanner'"));
assert.ok(!page.includes('DeferredPromoBanner'));
console.log('PASS initial HTML: all offers, terms, dates, links; no-JS accessibility; empty state; homepage direct import');
