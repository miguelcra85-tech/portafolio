import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ADS_ENVIRONMENT_URL } from '../data';

export function TopConversionHero() {
  const fullTitle = 'Arquitectura de Datos & Medición';
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Posición relativa del cursor dentro del botón para el resplandor de orilla interactivo
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Animación fluida de tipo máquina de escribir (typewriter)
  useEffect(() => {
    let index = 0;
    const speed = 36;
    const interval = setInterval(() => {
      index++;
      if (index <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, index));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  const subtitleWords = 'Escala tus ventas con un flujo de rastreo profesional en Google y Meta.'.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.65,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
  };

  // Rastreo del cursor para iluminar la orilla del botón exactamente por el lado que entra o se mueve el cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(300, ((e.clientX - rect.left) / rect.width) * 300));
    const y = Math.max(0, Math.min(72, ((e.clientY - rect.top) / rect.height) * 72));
    setMousePos({ x, y });
  };

  return (
    <section className="relative w-full min-h-screen h-[100dvh] z-20 flex flex-col justify-center px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto select-none">
      {/* 
        Layout Fluido de Dos Columnas:
        - Lado Izquierdo (col-span-7): Título H1 + Subtítulo + Breve explicación en letra chica.
        - Lado Derecho (col-span-5): Botón "VER FLUJO" con resplandor de orilla interactivo (spotlight de borde).
      */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-16 sm:pt-12 md:pt-0">
        
        {/* 1. LADO IZQUIERDO: Estructura de títulos y explicación concisa */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-4 sm:gap-6 max-w-2xl">
          
          {/* Título principal H1 con máquina de escribir y cursor sutil */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light md:font-normal font-sans tracking-tight text-white leading-[1.12] flex items-center flex-wrap drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            <span>{displayedTitle}</span>
            {isTyping && (
              <span 
                className="inline-block w-[3px] h-[0.85em] bg-orange-400 ml-2 animate-pulse rounded-full align-middle" 
                aria-hidden="true" 
              />
            )}
          </h1>

          {/* Subtítulo principal */}
          <motion.p
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl font-normal text-white/90 tracking-normal flex flex-wrap leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-xl"
          >
            {subtitleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Breve explicación en letras más chicas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="border-l-2 border-orange-500/50 pl-3.5 mt-1 max-w-lg"
          >
            <p className="text-xs sm:text-sm text-[#b8baba] font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Ecosistema de medición avanzada y eventos sincronizados en tiempo real. Alimenta los algoritmos de Meta y Google con datos precisos para reducir el costo por adquisición y maximizar el retorno publicitario.
            </p>
          </motion.div>

        </div>

        {/* 
          2. LADO DERECHO: Botón "VER FLUJO"
          - Movido ligeramente hacia abajo y a la izquierda para alinearse con los rayos de luz
          - Mayor presencia de cristal esmerilado (frosted glass) con cuerpo definido y desenfoque profundo
          - Letras "VER FLUJO" (38px, peso 900) 100% caladas/transparentes mostrando el fondo nítido
          - Halo interactivo de borde que sigue la entrada del cursor
        */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center w-full mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="relative flex flex-col items-center lg:items-end translate-y-6 sm:translate-y-8 -translate-x-3 sm:-translate-x-8 lg:-translate-x-14"
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
              className="group relative inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
              aria-label="Ver flujo de rastreo en Google y Meta"
            >
              {/* Resplandor periférico localizado que sigue al cursor en la orilla del botón */}
              {isHovered && mousePos && (
                <div
                  className="absolute w-28 h-28 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-lg opacity-90 transition-opacity duration-150"
                  style={{
                    left: `${(mousePos.x / 300) * 100}%`,
                    top: `${(mousePos.y / 72) * 100}%`,
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 145, 40, 0.55) 45%, rgba(249, 115, 22, 0.2) 75%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
              )}

              <svg
                viewBox="0 0 300 72"
                className="w-[260px] sm:w-[290px] md:w-[310px] h-[64px] sm:h-[70px] md:h-[74px] overflow-visible cursor-pointer drop-shadow-[0_12px_32px_rgba(0,0,0,0.8)]"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
              >
                <defs>
                  {/* Calado 100% transparente para las letras VER FLUJO (fondo blanco = visible, letras negras = caladas/huecas) */}
                  <mask id="cutout-ver-flujo-mask">
                    <rect width="300" height="72" rx="36" fill="#ffffff" />
                    <text
                      x="150"
                      y="38.5"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#000000"
                      fontSize="38"
                      fontWeight="900"
                      letterSpacing="0.035em"
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    >
                      VER FLUJO
                    </text>
                  </mask>

                  {/* Gradiente de cuerpo esmerilado con brillo superior de cristal y cuerpo cálido de alta presencia */}
                  <linearGradient id="capsule-frosted-body" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.42)" />
                    <stop offset="22%" stopColor="rgba(255, 150, 45, 0.38)" />
                    <stop offset="78%" stopColor="rgba(235, 95, 15, 0.32)" />
                    <stop offset="100%" stopColor="rgba(255, 140, 35, 0.38)" />
                  </linearGradient>

                  {/* Gradiente dinámico de orilla que ilumina el punto exacto por donde entra el cursor */}
                  <radialGradient
                    id="cursor-edge-glow"
                    cx={mousePos ? mousePos.x : 150}
                    cy={mousePos ? mousePos.y : 36}
                    r="85"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#ffb060" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="rgba(249, 115, 22, 0.75)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="rgba(249, 115, 22, 0.35)" stopOpacity="0.4" />
                  </radialGradient>
                </defs>

                {/* Cápsula de cristal esmerilado avanzado con mayor solidez y desenfoque profundo */}
                <rect
                  x="1.5"
                  y="1.5"
                  width="297"
                  height="69"
                  rx="34.5"
                  fill="url(#capsule-frosted-body)"
                  stroke={isHovered && mousePos ? 'url(#cursor-edge-glow)' : 'rgba(255, 155, 55, 0.65)'}
                  strokeWidth={isHovered ? 2.4 : 1.8}
                  mask="url(#cutout-ver-flujo-mask)"
                  className="transition-[stroke-width,stroke] duration-150"
                  style={{
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                  }}
                />
              </svg>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
