import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ADS_ENVIRONMENT_URL } from '../data';

interface TitleWord {
  text: string;
  line: 1 | 2;
  isAmpersand?: boolean;
}

const TITLE_WORDS: TitleWord[] = [
  { text: 'Arquitectura', line: 1 },
  { text: 'de', line: 2 },
  { text: 'Datos', line: 2 },
  { text: '&', line: 2, isAmpersand: true },
  { text: 'Medición', line: 2 },
];

const BUTTON_MASK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 76" width="320" height="76"><defs><mask id="m"><rect width="320" height="76" rx="38" fill="#ffffff"/><text x="160" y="39.5" text-anchor="middle" dominant-baseline="central" fill="#000000" stroke="#000000" stroke-width="2.4" stroke-linejoin="round" font-size="37" font-weight="950" letter-spacing="0.8" font-family="'Clash Display', 'Satoshi', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif">Ver Flujo</text></mask></defs><rect width="320" height="76" rx="38" fill="#ffffff" mask="url(#m)"/></svg>`;
const BUTTON_MASK_URI = `url("data:image/svg+xml,${encodeURIComponent(BUTTON_MASK_SVG)}")`;

export function TopConversionHero() {
  // Animación del título que aparece palabra por palabra
  const [revealedWordCount, setRevealedWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Posición relativa del cursor dentro del botón para el resplandor de orilla interactivo
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedWordCount(count);
      if (count >= TITLE_WORDS.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 220); // Ritmo elegante palabra por palabra

    return () => clearInterval(interval);
  }, []);

  // Rastreo del cursor para iluminar la orilla del botón exactamente por el lado que entra el cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(320, ((e.clientX - rect.left) / rect.width) * 320));
    const y = Math.max(0, Math.min(76, ((e.clientY - rect.top) / rect.height) * 76));
    setMousePos({ x, y });
  };

  const line1Words = TITLE_WORDS.filter((w) => w.line === 1);
  const line2Words = TITLE_WORDS.filter((w) => w.line === 2);

  return (
    <section className="relative w-full min-h-screen h-[100dvh] z-20 flex flex-col justify-center px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto select-none pt-24 sm:pt-28 md:pt-32 lg:pt-24 pb-8 sm:pb-10">
      {/* 
        Layout de Dos Columnas Equilibrado:
        - LADO IZQUIERDO (col-span-7): Título H1 (tamaño refinado, bajado para no tapar el logo),
          subtítulo con amplio aire vertical y bloque de ecosistema optimizado.
        - LADO DERECHO (col-span-5): Botón "VER FLUJO" con letras anchas transparentes y
          el texto "escalando ventas · incrementando aov" debajo del botón, no tan abajo y con aire
          respecto a la orilla derecha.
      */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* 1. LADO IZQUIERDO: Composición tipográfica escalonada */}
        <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">

          {/* 
            Título principal H1:
            - Letras ligeramente más chicas para máxima elegancia
            - Bajado para respetar el logo en la esquina superior izquierda
            - Renglón 1: "Arquitectura"
            - Renglón 2: Escalonado a la derecha "de Datos & Medición" (Triángulo Horizontal)
            - Signo & en degradado dorado-ámbar elegante y refinado
          */}
          <h1 className="font-clash text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] font-semibold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] flex flex-col">
            
            {/* Renglón 1: Arquitectura */}
            <div className="flex items-center min-h-[1.15em]">
              {revealedWordCount >= 1 && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {line1Words[0].text}
                </motion.span>
              )}
              {isTyping && revealedWordCount < 2 && (
                <span 
                  className="inline-block w-[3px] h-[0.8em] bg-amber-400 ml-2.5 animate-pulse rounded-full align-middle shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
                  aria-hidden="true" 
                />
              )}
            </div>

            {/* Renglón 2: Pegado a la izquierda con mucho aire vertical */}
            <div className="flex items-center flex-wrap min-h-[1.25em] mt-2.5 sm:mt-3.5">
              {line2Words.map((word, idx) => {
                const wordGlobalIndex = 1 + idx;
                if (revealedWordCount < wordGlobalIndex + 1) return null;

                if (word.isAmpersand) {
                  return (
                    <motion.span
                      key={word.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="font-editorial italic font-normal text-[1.2em] mx-2 sm:mx-2.5 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent inline-block drop-shadow-[0_0_14px_rgba(251,191,36,0.55)] select-none align-baseline"
                    >
                      &amp;
                    </motion.span>
                  );
                }

                return (
                  <motion.span
                    key={word.text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                    className="inline-block mr-2 sm:mr-3"
                  >
                    {word.text}
                  </motion.span>
                );
              })}

              {isTyping && revealedWordCount >= 2 && (
                <span 
                  className="inline-block w-[3px] h-[0.8em] bg-amber-400 ml-2 animate-pulse rounded-full align-middle shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
                  aria-hidden="true" 
                />
              )}
            </div>
          </h1>

          {/* 
            Subtítulo: Con amplio aire vertical y tipografía geométrica Satoshi
            Escala tus ventas con un flujo
            de rastreo profesional en Google y Meta.
          */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="font-satoshi text-base sm:text-lg md:text-xl font-normal text-white/95 tracking-normal mt-6 sm:mt-8 md:mt-9 flex flex-col leading-[1.65] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl"
          >
            <span>Escala tus ventas con un flujo</span>
            <span className="text-white/90">de rastreo profesional en Google y Meta.</span>
          </motion.div>

          {/* 
            Ecosistema base:
            Ecosistema optimizado con Spectra, Astra, SureCart.
            Las piezas base del anuncio; 
            Elementor y Gutenberg.
          */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="font-satoshi text-xs sm:text-sm text-zinc-300/85 font-normal leading-relaxed mt-4 sm:mt-5 max-w-lg border-l-2 border-amber-500/50 pl-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            <p>Ecosistema optimizado con Spectra, Astra, SureCart.</p>
            <p className="text-zinc-400/90 mt-1">Las piezas base del anuncio;</p>
            <p className="text-zinc-400/90 mt-0.5">Elementor y Gutenberg.</p>
          </motion.div>

        </div>

        {/* 
          2. LADO DERECHO: Botón "Ver Flujo" y textos inferiores
          - Ubicado del lado derecho, pero no tan abajo ni pegado a la orilla (con amplio aire visual)
          - Letras "Ver Flujo" anchas que recortan el botón de forma 100% transparente
          - Cuerpo y contorno del botón 85% transparentes (tono naranja tenue esmerilado al 15% de opacidad)
          - Permite que el fondo oscuro pase nítido a través de las letras del botón
          - Justo debajo del botón: "escalando ventas · incrementando aov" con los 3 puntos medios diferenciados
        */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-center justify-center w-full lg:pr-4 xl:pr-8 mt-2 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="relative flex flex-col items-center"
          >
            <a
              href={ADS_ENVIRONMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                setIsHovered(true);
                handleMouseMove(e);
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsHovered(false);
                setMousePos(null);
              }}
              className="group relative inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none w-[270px] sm:w-[295px] md:w-[320px] h-[64px] sm:h-[70px] md:h-[76px] rounded-full"
              aria-label="Ver flujo de rastreo en Google y Meta"
            >
              {/* Resplandor periférico interactivo que sigue el cursor en la orilla del botón */}
              {isHovered && mousePos && (
                <div
                  className="absolute w-28 h-28 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-lg opacity-85 transition-opacity duration-150"
                  style={{
                    left: `${(mousePos.x / 320) * 100}%`,
                    top: `${(mousePos.y / 76) * 100}%`,
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 145, 40, 0.45) 45%, rgba(249, 115, 22, 0.15) 75%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
              )}

              {/* 
                1. CÁPSULA DE CRISTAL ESMERILADO (Fondo 85% translúcido + blur 20px profundo)
                con RECORTE 100% TRANSPARENTE para el texto ('Ver Flujo'):
                - Fondo anaranjado tenue y elegante al 15% de opacidad (85% transparente).
                - Desenfoque de fondo profundo (backdrop-filter: blur(20px)).
                - El texto 'Ver Flujo' actúa como una máscara de recorte (stencil SVG mask).
                - Las letras tienen recorte 100% transparente: no reciben ni blur ni tinte,
                  permitiendo que el video oscuro de fondo y los rayos de luz se vean totalmente nítidos.
              */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
                style={{
                  backgroundColor: 'rgba(255, 125, 25, 0.15)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  maskImage: BUTTON_MASK_URI,
                  WebkitMaskImage: BUTTON_MASK_URI,
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                }}
              />

              {/* 
                2. OVERLAY VECTORIAL SVG:
                - Contorno sutil y elegante de la cápsula (1.4px a 2.2px) con iluminación reactiva al cursor.
                - Garantiza proporciones exactas y alta definición en pantallas retina.
              */}
              <svg
                viewBox="0 0 320 76"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
              >
                <defs>
                  {/* Gradiente dinámico de orilla que ilumina el punto exacto por donde entra el cursor */}
                  <radialGradient
                    id="cursor-edge-glow"
                    cx={mousePos ? mousePos.x : 160}
                    cy={mousePos ? mousePos.y : 38}
                    r="90"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="35%" stopColor="#ffb060" stopOpacity="0.85" />
                    <stop offset="70%" stopColor="rgba(249, 115, 22, 0.6)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="rgba(249, 115, 22, 0.2)" stopOpacity="0.2" />
                  </radialGradient>

                  {/* Gradiente naranja vibrante para el contorno exterior de las letras */}
                  <linearGradient id="orange-letter-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffb366" />
                    <stop offset="45%" stopColor="#ff851b" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>

                  {/* Brillo sutil para realzar la visibilidad del trazo naranja contra el fondo */}
                  <filter id="letter-stroke-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="rgba(255, 130, 25, 0.75)" />
                  </filter>

                  {/* 
                    Máscara estricta para el contorno exterior:
                    - Blanco en el fondo: mantiene visible el trazo.
                    - Negro en el interior exacto de los glifos: enmascara y recorta al 100%
                      cualquier trazo que intente invadir el interior de las letras.
                    De esta manera, el trazo naranja queda EXCLUSIVAMENTE POR FUERA de las letras
                    y NUNCA por dentro, dejando el espacio interno libre y 100% transparente para el video.
                  */}
                  <mask id="outer-letter-stroke-mask">
                    <rect width="320" height="76" fill="#ffffff" />
                    <text
                      x="160"
                      y="39.5"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#000000"
                      stroke="#000000"
                      strokeWidth="0.2"
                      fontSize="37"
                      fontWeight="950"
                      letterSpacing="0.8"
                      fontFamily="'Clash Display', 'Satoshi', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                    >
                      Ver Flujo
                    </text>
                  </mask>
                </defs>

                {/* Borde exterior sutil de la cápsula */}
                <rect
                  x="0.75"
                  y="0.75"
                  width="318.5"
                  height="74.5"
                  rx="37.25"
                  fill="transparent"
                  stroke={isHovered && mousePos ? 'url(#cursor-edge-glow)' : 'rgba(255, 145, 40, 0.28)'}
                  strokeWidth={isHovered ? 2.2 : 1.4}
                  className="transition-[stroke-width,stroke] duration-150"
                />

                {/* 
                  Contorno naranja de las letras 'Ver Flujo' estrictamente por fuera:
                  - mask="url(#outer-letter-stroke-mask)" elimina la mitad interna del trazo.
                  - strokeWidth="3.8" genera ~1.9px de borde exterior limpio y de alto contraste.
                  - fill="none" asegura que el hueco interior de las letras quede 100% transparente
                    para apreciar con total nitidez el video y los rayos de luz de fondo.
                */}
                <text
                  x="160"
                  y="39.5"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="none"
                  stroke="url(#orange-letter-gradient)"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  mask="url(#outer-letter-stroke-mask)"
                  filter="url(#letter-stroke-glow)"
                  fontSize="37"
                  fontWeight="950"
                  letterSpacing="0.8"
                  fontFamily="'Clash Display', 'Satoshi', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                  className="transition-all duration-300 group-hover:brightness-125"
                >
                  Ver Flujo
                </text>
              </svg>
            </a>

            {/* 
              Texto debajo del botón ubicado en el lado derecho:
              - Texto transparente con tracking amplio
              - Tres puntos medios con diseños ligeramente diferentes
              - Centrado debajo del botón para una composición compacta y lujosa
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.35 }}
              className="mt-4 flex items-center justify-center tracking-[0.22em] sm:tracking-[0.26em] font-satoshi text-[11px] sm:text-xs font-medium lowercase select-none text-center"
            >
              {/* Punto medio 1: Micro-diamante ámbar facetado */}
              <span 
                className="inline-block text-[9px] text-amber-400/90 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)] mr-2.5 transform rotate-45" 
                aria-hidden="true"
              >
                ◆
              </span>

              {/* Frase 1 con texto transparente / gradiente translúcido */}
              <span className="bg-gradient-to-r from-white/35 via-white/65 to-white/45 bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                escalando ventas
              </span>

              {/* Punto medio 2: Lente concéntrico con núcleo de luz */}
              <span 
                className="inline-flex items-center justify-center w-2 h-2 rounded-full border border-amber-400/80 bg-amber-500/25 shadow-[0_0_8px_rgba(245,158,11,0.7)] mx-2.5 sm:mx-3 align-middle" 
                aria-hidden="true"
              >
                <span className="w-0.5 h-0.5 rounded-full bg-white/90" />
              </span>

              {/* Frase 2 con texto transparente / gradiente translúcido */}
              <span className="bg-gradient-to-r from-white/45 via-white/65 to-white/35 bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                incrementando aov
              </span>

              {/* Punto medio 3: Estrella dorada de cuatro puntas */}
              <span 
                className="inline-block text-[10px] text-amber-300/85 drop-shadow-[0_0_7px_rgba(252,211,77,0.85)] ml-2.5" 
                aria-hidden="true"
              >
                ✦
              </span>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
