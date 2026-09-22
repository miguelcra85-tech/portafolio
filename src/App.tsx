/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
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
        {/* Background Parallax Video (Optimizado para carga crítica inmediata sin bloqueos) */}
        <div className="fixed inset-0 z-0 w-full h-full bg-black flex items-center justify-center pointer-events-none overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="w-full h-full object-cover object-center opacity-100 brightness-110 contrast-110"
          >
            <source src={VIDEO_URL} type="video/webm" />
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>

      {/* Main Content */}
      <main className="relative flex-grow flex flex-col pt-36 md:pt-40 pb-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full gap-20 md:gap-28">
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

        {/* Encabezado: Tarjeta de presentación (izq) y Contenedor de Video (der) */}
        <HeaderCardSection />

        <Hero />
        
        {/* Interactive Video Presentation (Video con sonido al reproducir, preload="metadata") */}
        <section className="relative flex justify-center w-full">
          <InteractiveVideo src={PRESENTATION_VIDEO_URL} />
        </section>

        {/* Sección de Proyectos con Lazy Loading para acelerar la carga crítica inicial */}
        <Suspense fallback={<div className="w-full min-h-[360px]" aria-hidden="true" />}>
          <Carousel />
        </Suspense>
      </main>

      {/* Footer diferido */}
      <Suspense fallback={<div className="w-full min-h-[140px]" aria-hidden="true" />}>
        <Footer />
      </Suspense>
      </div>
    </>
  );
}
