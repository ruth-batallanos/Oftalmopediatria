# Sitio web — Dra. Ruth Martha Batallanos · Oftalmopediatría

Sitio estático (HTML + CSS + JavaScript, sin dependencias) listo para publicar gratis en **GitHub Pages**.

```
sitio-ruth/
├── index.html          ← todos los textos, ubicaciones y contacto
├── css/styles.css      ← colores, tipografías y diseño
├── js/main.js          ← menú, animaciones y formulario
├── images/             ← acá van foto-1.jpg … foto-4.jpg
├── optimizar-fotos.py  ← (opcional) achica las fotos
├── robots.txt / sitemap.xml   ← SEO
└── .nojekyll
```

---

## 1. Antes de subir: completar 3 datos

Usá "Buscar y reemplazar" (en VS Code: Ctrl+Shift+H) en **todos los archivos**:

| Buscar | Reemplazar por |
|---|---|
| `CORREO@EJEMPLO.COM` | el correo real (ej. `consultas@gmail.com`) |
| `USUARIO_INSTAGRAM` | el usuario de Instagram |
| `USUARIO.github.io` | la dirección final del sitio (ver paso 3) |

Después, en `index.html` completá todo lo que está **[entre corchetes]**: trayectoria, matrícula, direcciones, días y horarios.

## 2. Las 4 fotografías

Guardalas en `images/` con estos nombres exactos:

| Archivo | Dónde aparece | Formato ideal |
|---|---|---|
| `foto-1.jpg` | Portada | vertical (retrato) |
| `foto-2.jpg` | Sobre mí | vertical |
| `foto-3.jpg` | Mi enfoque de atención | vertical |
| `foto-4.jpg` | Trayectoria (presentación profesional) | vertical |

- Mientras falte una foto, se muestra un fondo suave que dice "Foto pendiente".
- **Peso:** idealmente menos de 400 KB cada una. Podés usar [squoosh.app](https://squoosh.app) o el script:
  `pip install pillow` y después `python optimizar-fotos.py carpeta_con_las_fotos`
- **Encuadre:** si una cara queda cortada, en el `<img>` de esa foto cambiá `style="--pos: 50% 25%;"`.
  El primer número mueve la foto horizontalmente y el segundo verticalmente (`0%` = arriba, `100%` = abajo).

## 3. Publicar en GitHub Pages (sin programar)

1. Creá una cuenta en [github.com](https://github.com).
2. Arriba a la derecha: **+ → New repository**.
   - **Nombre:** para que la dirección sea `https://TUUSUARIO.github.io/`, poné exactamente `TUUSUARIO.github.io`.
     Si usás otro nombre (ej. `dra-batallanos`), la dirección será `https://TUUSUARIO.github.io/dra-batallanos/`.
   - Marcá **Public** → **Create repository**.
3. En el repositorio vacío: **uploading an existing file**.
   Arrastrá **el contenido** de la carpeta `sitio-ruth` (no la carpeta en sí: `index.html` tiene que quedar en la raíz).
   Asegurate de que las carpetas `css`, `js` e `images` se suban con su contenido → **Commit changes**.
4. **Settings → Pages** → en *Build and deployment*: Source **Deploy from a branch**, Branch **main** / **(root)** → **Save**.
5. Esperá 1–2 minutos y entrá a la dirección que aparece arriba en esa misma página.

> El archivo `.nojekyll` empieza con punto y a veces queda oculto. Si no se sube, no pasa nada: el sitio funciona igual.

**Para hacer cambios después:** abrí el archivo en GitHub → ícono del lápiz → editá → **Commit changes**. Se actualiza en uno o dos minutos.

### Opción con la terminal (si ya usás git)

```bash
cd sitio-ruth
git init
git add .
git commit -m "Sitio Dra. Batallanos"
git branch -M main
git remote add origin https://github.com/TUUSUARIO/TUUSUARIO.github.io.git
git push -u origin main
```

## 4. Activar el formulario de contacto

GitHub Pages no tiene servidor, así que el formulario usa **FormSubmit** (gratis, sin crear cuenta):

1. Con el correo ya reemplazado y el sitio publicado, mandá un mensaje de prueba desde el formulario.
2. Llega un correo de FormSubmit a esa casilla: tocá **Activate Form** (revisá spam).
3. Desde ahí, cada consulta llega al correo con nombre, email, teléfono, zona y mensaje.

Opcional: FormSubmit te da después un código alfanumérico; podés usarlo en lugar del correo en el `action` del formulario para no mostrar la dirección en el código.
Si el envío falla, el sitio ofrece automáticamente escribir por mail.

## 5. Ubicaciones y mapas

Cada ubicación está marcada en `index.html` con `UBICACIÓN 1` / `UBICACIÓN 2`. Para que el mapa muestre el consultorio exacto, reemplazá en el `src` del `iframe` y en el botón "Cómo llegar" el texto después de `q=` / `query=` por la dirección, con `+` en lugar de espacios:

```
https://www.google.com/maps?q=Av.+de+Mayo+1234,+Ramos+Mejía&output=embed
```

Para agregar una tercera sede, copiá un bloque `<article class="location">` completo y pegalo debajo.

## 6. SEO (que aparezca en Google)

Ya incluye título y descripción orientados a "oftalmopediatría Ramos Mejía / Capital Federal", datos estructurados de médica, vista previa para WhatsApp/redes, `sitemap.xml` y `robots.txt`.

Recomendado después de publicar:
- Cargar el sitio en [Google Search Console](https://search.google.com/search-console) y enviar el `sitemap.xml`.
- Crear o reclamar un **Perfil de Empresa en Google** para cada consultorio, con el link del sitio: es lo que más ayuda en búsquedas locales.

## 7. Personalizar el estilo

En `css/styles.css`, al principio (`:root`), están los colores:
`--cream` (fondo), `--blush` (rosa suave), `--rose` (acento), `--deep` (texto y botones).

## 8. Dominio propio (opcional)

Si más adelante comprás un dominio (ej. `drabatallanos.com.ar` en NIC Argentina), se configura en **Settings → Pages → Custom domain** y luego se reemplaza `USUARIO.github.io` por el dominio en los archivos.
