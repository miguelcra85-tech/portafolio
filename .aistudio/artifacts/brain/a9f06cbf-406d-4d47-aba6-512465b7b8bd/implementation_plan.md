# Rediseño Ejecutivo de Cabecera: Tipografía Flotante y Botón Knockout

Diseño e integración de una cabecera de nivel directivo para reclutadores, con tipografía limpia en dos renglones flotando sobre el fondo (sin cajas ni orillas visibles) y un botón de cristal anaranjado tenue con letras recortadas transparentes que revelan el fondo limpio.

## Decisiones Críticas Confirmadas

> [!IMPORTANT]
> - **Titular en 2 renglones confirmado:** "Arquitectura de datos y ventas de alto impacto" orientado a captar directores y reclutadores técnicos/comerciales.
> - **Eliminación total de contenedores del título:** Se retira la tarjeta envolvente, bordes y badges previos para que las palabras floten de manera limpia en el espacio tridimensional de la landing.
> - **Efecto Stencil / Knockout en botón "Dale Clic":** Botón de cristal esmerilado anaranjado tenue con tipografía calada/recortada que deja ver el fondo limpio sin desenfoque ni opacidad dentro de las letras.
> - **Protección estructural:** El canvas 3D interactivo (`FloatingFish`), modales de video y el resto de la página se mantienen intactos al 100%.

---

## 1. Concepto y Enfoque de Copywriting

- **Propósito:** Posicionar inmediatamente al titular como un estratega técnico capaz de conectar arquitectura de datos, medición precisa y campañas publicitarias con facturación y retorno tangible.
- **Titular en 2 renglones balanceados:**
  - *Renglón 1:* **Arquitectura de Datos & Medición**
  - *Renglón 2:* **que Escala Ventas de Alto Impacto**
- **Subtítulo sutil y flotante:** Indicador discreto del entorno interactivo de Meta Ads y Google Ads, sin cajas ni bordes de tarjeta.

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│           Arquitectura de Datos & Medición             │
│        que Escala Ventas de Alto Impacto               │
│                                                        │
│     Entorno interactivo • Casos prácticos y datos      │
│                                                        │
│                  ┌─────────────────┐                   │
│                  │ [ Dale Clic ↗ ] │  ← Botón Naranja  │
│                  └─────────────────┘    Tenue Knockout │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 2. Experiencia Visual y Estilo UI/UX

### Tipografía Flotante (Zero-Card Discipline)
- Las palabras se proyectan directamente sobre la atmósfera del canvas 3D.
- Sin contenedores, sin marcos opacos y sin bordes de tarjeta visibles.
- Tipografía moderna `font-geist` con acabado nítido y balance de pesos (Renglón 1 refinado en blanco puro, Renglón 2 con énfasis sutil en oro/ámbar cálido).

### Botón de Cristal con Recorte Knockout
- **Cuerpo del botón:** Cristal esmerilado translúcido anaranjado suave (`bg-orange-500/15`, `backdrop-blur-md`, borde delicado `border-orange-500/25`).
- **Letras "Dale Clic":** Máscara stencil vectorial SVG donde las letras son 100% transparentes, recortando la superficie de cristal para mostrar el fondo nítido y original detrás del botón.
- **Interacción Hover:** Iluminación sutil del borde en tono ámbar/naranja elegante sin destellos excesivos ni sobrecarga visual.

---

## 3. Plan de Componentes y Ejecución Técnica

```
  TopConversionHero.tsx
  ├─ <motion.div> (animación de entrada limpia y suave)
  │   ├─ <h1> Tipografía en 2 renglones flotante (sin tarjeta)
  │   ├─ <p> Subtítulo descriptivo mínimo y elegante
  │   └─ <a> Enlace al entorno interactivo
  │       └─ <ButtonKnockout>
  │           ├─ Capa de fondo esmerilado suave (blur + orange tint)
  │           └─ Máscara de texto stencil transparente ("Dale Clic")
```

### Pasos de Implementación:
1. **Actualizar `TopConversionHero.tsx`:**
   - Desmontar la tarjeta oscura exterior y remover los badges/pills decorativos previos.
   - Insertar el titular estructurado exactamente en dos renglones centrados.
   - Crear el componente del botón con técnica SVG mask o CSS knockout stencil para lograr las letras "Dale Clic" 100% transparentes sobre el cristal esmerilado anaranjado tenue.
   - Conectar el enlace hacia `ADS_ENVIRONMENT_URL` preservando navegación y accesibilidad.
2. **Validación:**
   - Ejecutar `compile_applet` y `lint_applet` para garantizar cero errores.
   - Verificar la experiencia visual en el entorno de desarrollo.
