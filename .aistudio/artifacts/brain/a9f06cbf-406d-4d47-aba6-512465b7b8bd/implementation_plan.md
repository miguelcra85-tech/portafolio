# Rediseño del Botón "Ver Flujo": Contorno Naranja Exterior y Recorte Transparente

Se completó el ajuste de legibilidad y precisión visual para el botón principal **"Ver Flujo"** en la sección Hero (`TopConversionHero.tsx`).

## Ajuste Realizado

- **Contorno Naranja Estrictamente por Fuera de las Letras:**
  - Se implementó un trazo exterior vectorial SVG mediante una máscara selectiva (`#outer-letter-stroke-mask`), donde el interior de los glifos se bloquea al 100% (`fill="#000000"`).
  - Al aplicar `mask="url(#outer-letter-stroke-mask)"` sobre el texto con `strokeWidth="3.8"` y gradiente ámbar-naranja, toda la porción del trazo que se proyecta hacia adentro es recortada y eliminada.
  - El trazo visible queda **exclusivamente por fuera de los glifos** (~1.9px de grosor exterior), garantizando que las letras resalten con alto contraste contra el fondo oscuro sin perder ni un píxel de su área interna.

- **Interior de las Letras 100% Libre y Transparente:**
  - El recorte stencil en el cristal esmerilado (`backdrop-filter: blur(20px)` y `15% de opacidad`) se mantiene totalmente despejado.
  - El video de fondo y los rayos de luz se aprecian con máxima nitidez y movimiento continuo a través del cuerpo de las letras "Ver Flujo".

- **Enlace y Comportamiento:**
  - Enlace activo a `https://digymik.vercel.app`.
  - Resplandor interactivo de orilla guiado por el cursor del ratón.
  - Línea inferior de apoyo: `escalando ventas · incrementando aov` con puntos diferenciados.
