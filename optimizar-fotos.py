"""
Optimiza las 4 fotos antes de subirlas.
Uso:  pip install pillow
      python optimizar-fotos.py carpeta_con_fotos_originales
Toma las 4 primeras imágenes (orden alfabético) y genera
images/foto-1.jpg ... foto-4.jpg (máx. 1400 px, calidad 82).
No recorta: el encuadre se ajusta en el HTML con --pos.
"""
import sys, pathlib
from PIL import Image, ImageOps

src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "originales")
out = pathlib.Path(__file__).parent / "images"
fotos = sorted(p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".heic", ".webp"})[:4]
for i, p in enumerate(fotos, 1):
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    im.thumbnail((1400, 1400), Image.LANCZOS)
    dest = out / f"foto-{i}.jpg"
    im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{p.name} -> {dest.name} ({im.width}x{im.height}, {dest.stat().st_size // 1024} KB)")
