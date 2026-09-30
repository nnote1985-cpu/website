import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
const slides = JSON.parse(await readFile('public/hero/slides.json', 'utf8'));
await mkdir('public/hero', { recursive: true });
for (const slide of slides) {
  const name = slide.src.split('/').pop();
  const folder = name.startsWith('perspective') ? 'perspective' : 'facility';
  await sharp(`reference-website/public/images/projects/elysium-phahol-59/gallery/${folder}/${name}`).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/hero/${name}`);
  console.log(name);
}
