# StudyQuest v3 — cambios (4 de noviembre de 2026)

## Estructura
- La web está ahora en `public/` (index.html, manifest.json y los dibujos en `public/art/`).
- El servidor está en `netlify/functions/`: `claude.js` (IA) y `sync.mjs` (sincronización).
- `package.json` añade `@netlify/blobs` para la sincronización: ejecuta `npm install` una vez.
- Para publicar: `netlify deploy --prod` (ya no hace falta `--dir .`).

## Mundo
- 23 países en 4 continentes: Europa (14), América (4), Medio Oriente (3) y Asia (2).
- América se desbloquea con 4 países conquistados en Europa; Medio Oriente con 2 en América; Asia con 2 en Medio Oriente.
- Cada edificio tiene 3 niveles: en construcción (andamios y grúa), terminado y de lujo (luces, destellos y gente). El nivel 2 cuesta ×1.5 y el nivel 3 cuesta ×2.
- El % de cada país = niveles construidos / 15. Bonos: +100 al 50 %, +150 al 75 %, y conquista con +500 y fuegos artificiales al 100 %.
- Tu progreso anterior se mantiene: los edificios que tenías pasan a "terminado" y los países conquistados siguen conquistados, sin cobrar dos veces el bono.

## Formas de ganar tokens
- Racha diaria: +5 por cada día seguido estudiando, hasta un máximo de +50.
- Tiempo de lectura: +1 por minuto de lectura activa, hasta 30 al día.
- Repaso espaciado: las flashcards se guardan y vuelven a los 1, 3, 7, 14 y 30 días. Repasarlas a tiempo da +4, el doble de lo normal.
- Libro terminado: +200.
- Retos semanales: 4 retos de +40 cada uno, y un cofre de +100 al completarlos todos.
- Feynman por voz: dictas tu explicación con el micrófono y ganas +10 extra.

## Voces
- Solo se muestran las 2 mejores voces de mujer y las 2 mejores de hombre en español y en inglés, priorizando las Premium, Mejoradas y Naturales.
- Al tocar una voz en Config la escuchas.
- La lectura en voz alta va frase por frase, para que funcione en el iPhone.

## Teléfono y PC
- La API key puede guardarse en Netlify (`ANTHROPIC_API_KEY`) y queda protegida con un PIN (`APP_PIN`). Cualquier navegador funciona con solo escribir el PIN.
- El progreso (tokens, ciudades, libros, tarjetas, racha) se sincroniza entre dispositivos.
- El servidor solo acepta modelos de Claude y limita `max_tokens`.

# v3.1 — Lectura verificada
- Cronómetro por capítulo: solo cuenta en la pestaña Leer, con la pantalla activa y si hubo actividad en los últimos 45 s (o si la voz está leyendo).
- Tiempo mínimo para validar: palabras ÷ 300 ppm (por ejemplo, 1.500 palabras = 5 min).
- Avance: se registra hasta dónde llegaste en el capítulo; hay que llegar al 90 %.
- Alerta "⚡ despacio" si el avance supera 450 palabras por minuto.
- "¿Sigues leyendo?" aparece cada 6 a 10 minutos y pausa el reloj hasta que respondes.
- Test de comprensión: 3 preguntas de la IA sobre detalles del inicio, la mitad y el final del capítulo. Aprobar 2 da +10, y 3 de 3 suma +5 de bono. Si fallas, puedes reintentar tras 2 minutos más de lectura, con preguntas nuevas.
- Estadísticas: lecturas verificadas y velocidad media.
- Versión visible en Config y actualización automática cuando se publica una versión nueva.
