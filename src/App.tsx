/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { TopConversionHero } from './components/TopConversionHero';
import { HeaderCardSection } from './components/HeaderCardSection';
import { Hero } from './components/Hero';
import { InteractiveVideo } from './components/InteractiveVideo';
import { FloatingFish } from './components/FloatingFish';
import { LOGO_URL, VIDEO_URL, PRESENTATION_VIDEO_URL } from './data';

// Code-Splitting para componentes secundarios por debajo del pliegue (Reducción de TBT y LCP)
const Carousel = lazy(() => import('./components/Carousel').then(m => ({ default: m.Carousel })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  return (
    <>
      <FloatingFish />
      <div className="bg-[#121314] text-[#e3e2e2] min-h-screen overflow-x-hidden relative selection:bg-brand-orange selection:text-white flex flex-col font-geist">
        {/* Background Parallax Video (Escala 0.95 con entonado cálido y alto contraste) */}
        <div className="fixed inset-0 z-0 w-full h-full bg-black flex items-center justify-center pointer-events-none overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="w-full h-full object-cover object-center opacity-100 brightness-100 contrast-125 saturate-135 origin-center scale-[0.95] transition-transform duration-700"
            style={{ transform: 'scale(0.95)' }}
          >
            <source src={VIDEO_URL} type="video/webm" />
            <source src={VIDEO_URL} type="video/mp4" />
          </video>

          {/* Capa de entonado cálido naranja para darle fuerza y viveza al video */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-black/40 via-orange-950/20 to-orange-500/15 mix-blend-screen pointer-events-none" 
            aria-hidden="true" 
          />
          {/* Capa de profundidad y viñeta para mayor opacidad y riqueza de negros */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(18,19,20,0.65)_100%)] pointer-events-none" 
            aria-hidden="true" 
          />
        </div>

      {/* Main Content */}
      <main className="relative flex-grow flex flex-col w-full">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-6 md:left-16 z-30"
        >
          <img 
            src={LOGO_URL} 
            alt="Migue Strategy Logo" 
            width="160"
            height="48"
            fetchPriority="high"
            className="h-12 w-auto object-contain drop-shadow-md" 
          />
        </motion.div>

        {/* Bloque Superior de Alto Impacto: Hero de 100vh exacto al entrar */}
        <TopConversionHero />

        {/* Secciones Secundarias por debajo del primer pliegue */}
        <div className="relative flex flex-col pt-16 md:pt-20 pb-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full gap-16 md:gap-24">
          {/* Encabezado: Tarjeta de presentación (izq) y Contenedor de Video (der) */}
          <HeaderCardSection />

          <Hero />
          
          {/* Interactive Video Presentation (Contenedor pequeño que se hace grande al hacer clic) */}
          <section className="relative flex flex-col items-center justify-center w-full my-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <InteractiveVideo 
                src={PRESENTATION_VIDEO_URL}
                glowColor="#ff6a00"
                width="w-[280px] sm:w-[320px] md:w-[350px]"
                height="h-[165px] sm:h-[185px] md:h-[200px]"
                badge="Presentación"
                label="Reproducir Presentación"
              />
              <span className="text-[11px] font-geist text-[#8e9192] tracking-wider uppercase text-center max-w-[320px]">
                Haz clic para ampliar a pantalla completa con sonido
              </span>
            </motion.div>
          </section>

          {/* Sección de Proyectos con Lazy Loading para acelerar la carga crítica inicial */}
          <Suspense fallback={<div className="w-full min-h-[360px]" aria-hidden="true" />}>
            <Carousel />
          </Suspense>
        </div>
      </main>

      {/* Footer diferido */}
      <Suspense fallback={<div className="w-full min-h-[140px]" aria-hidden="true" />}>
        <Footer />
      </Suspense>
      </div>
    </>
  );
}
