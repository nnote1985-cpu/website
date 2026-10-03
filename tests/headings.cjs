// Render the actual hero components as server HTML. Font/image transforms and
// registration forms are stubbed; heading ownership stays in the real components.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const originalLoad = Module._load;
let brokenPromo = false;
Module._load = function (id, parent, main) {
  if (id === 'next/font/google') return { Montserrat: () => ({ className: 'font-test' }) };
  if (id === 'next/image') return () => null;
  if (/RegisterForm(?:Dark)?$/.test(id)) return () => null;
  if (id === 'react' && parent?.filename.endsWith('ElysiumCustom.tsx')) {
    return { ...React, useState: initial => React.useState(brokenPromo && initial === null ? '/promo.webp' : initial) };
  }
  if (id.startsWith('@/')) id = path.join(root, id.slice(2));
  return originalLoad.call(this, id, parent, main);
};
require.extensions['.tsx'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  });
  module._compile(result.outputText, filename);
};
const load = name => require(path.join(root, 'components', name)).default;
const Hero = load('home/HeroExperience.tsx');
const Elysium = load('projects/custom/ElysiumCustom.tsx');
const Celine = load('projects/custom/CelineCustom.tsx');
const Wela = load('projects/custom/WelaCustom.tsx');
const Promo = load('projects/PromoHeroWrapper.tsx');
const project = { name: 'ASAKAN Test Residence', image: '/hero.webp', promoBanner: '/promo.webp' };
function check(label, element, expected) {
  const html = renderToStaticMarkup(element);
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(headings.length, 1, `${label}: exactly one H1`);
  const text = headings[0][1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.equal(text, expected, label);
  assert.ok(!/sr-only|hidden/.test(headings[0][0].split('>')[0]), `${label}: visible heading`);
  console.log(`PASS ${label}`);
}
try {
  check('Homepage', React.createElement(Hero), 'ASAKAN คอนโดมิเนียมในกรุงเทพฯ');
  for (const [name, Component] of [['Elysium', Elysium], ['Celine', Celine], ['Wela', Wela]]) {
    const fallback = React.createElement(Component, { project: { ...project, promoBanner: undefined } });
    check(`${name} standard`, fallback, project.name);
    if (name === 'Elysium') {
      check('Elysium promo', React.createElement(Component, { project }), project.name);
      brokenPromo = true;
      check('Elysium broken promo fallback', React.createElement(Component, { project }), project.name);
      brokenPromo = false;
    } else {
      check(`${name} promo`, React.createElement(Promo, { promoBanner: '/promo.webp', projectName: project.name, fallbackHero: fallback }), project.name);
      check(`${name} missing promo fallback`, React.createElement(Promo, { projectName: project.name, fallbackHero: fallback }), project.name);
    }
  }
} finally { Module._load = originalLoad; }
