"""Create responsive derivatives of the owner's existing project imagery."""
from pathlib import Path
from PIL import Image, ImageOps
import json

source = Path('reference-website/public')
target = Path('public/media')
target.mkdir(parents=True, exist_ok=True)
assets = {
    'hero': 'images/elysium-phahol.webp',
    'phahol': 'images/elysium-phahol.webp',
    'ram': 'images/elysium-ram.jpg',
    'celine': 'images/the-celine.webp',
    'wela': 'images/wela.webp',
    'garden': 'images/projects/elysium-phahol-59/gallery/perspective/perspective14.webp',
    'courtyard': 'images/projects/elysium-phahol-59/gallery/perspective/perspective5.webp',
    'lounge': 'images/projects/elysium-phahol-59/gallery/facility/facilities10.webp',
    'residence': 'images/projects/elysium-phahol-59/gallery/room/43 sqm/1.webp',
    'celine-living': 'images/projects/the-celine-bang-chan/gallery/room/25 duo/2.webp',
}
manifest = []
for name, relative in assets.items():
    im = ImageOps.exif_transpose(Image.open(source / relative)).convert('RGB')
    for width in (640, 1200, 1920):
        image = im.copy()
        image.thumbnail((width, round(width * im.height / im.width)), Image.Resampling.LANCZOS)
        dest = target / f'{name}-{width}.webp'
        image.save(dest, 'WEBP', quality=83 if width == 1920 else 79, method=6)
        manifest.append({'file': str(dest), 'source': relative, 'width': image.width, 'height': image.height, 'bytes': dest.stat().st_size})
logo = Image.open(source / 'logo.png').convert('RGBA')
logo.thumbnail((128, 128), Image.Resampling.LANCZOS)
logo.save(target / 'logo.png', optimize=True)
og = ImageOps.fit(Image.open(source / assets['hero']).convert('RGB'), (1200, 630))
og.save(target / 'social.jpg', quality=86)
Path('docs').mkdir(exist_ok=True)
Path('docs/asset-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(f'Prepared {len(manifest)} images. Total: {sum(i["bytes"] for i in manifest):,} bytes.')
