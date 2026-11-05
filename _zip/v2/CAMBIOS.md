# StudyQuest — cambios (noviembre 2026)

## Dibujos nuevos de Europa
- Cada uno de los 40 edificios tiene su propia ilustración (Torre Eiffel, Sagrada Família, Big Ben, Coliseo, Torre de Pisa, Partenón, Torre de Belém, molino holandés, etc.).
- La ciudad es una escena nocturna con estrellas, luna, colinas, ventanas encendidas y la bandera del país ondeando.
- Animaciones suaves: aspas del molino, humo de fábrica y pizzería, góndola y barcos meciéndose, faro girando.
- La tienda y las casillas de edificios muestran el dibujo en vez del emoji (los no construidos salen en gris).
- Todo se dibuja con código (canvas): no hay imágenes externas ni costes extra.

## Libros en Markdown (.md)
- La biblioteca acepta `.md`. Los capítulos salen de los títulos `#` / `##` / `###` (elige el nivel que da capítulos de tamaño razonable).
- Las secciones muy cortas (dedicatoria, prólogo breve) se unen al capítulo vecino.
- El texto se limpia antes de mostrarlo y enviarlo a la IA: sin asteriscos, enlaces, imágenes ni marcas de tabla.

## Ahorro de tokens
- El lector muestra el capítulo completo sin traducir (antes se cortaba en 20 párrafos y pedía traducir).
- Las traducciones se guardan por capítulo: reabrir un capítulo ya traducido no vuelve a llamar a la API (guarda las 40 más recientes).

## Archivos
- `index.html` — la app (único archivo modificado).
- `netlify/functions/claude.js`, `netlify.toml`, `manifest.json` — sin cambios.
