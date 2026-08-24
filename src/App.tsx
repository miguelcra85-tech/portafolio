/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion } from 'motion/react';
import { Hero } from './components/Hero';
import { Carousel } from './components/Carousel';
import { InteractiveVideo } from './components/InteractiveVideo';
import { FloatingFish } from './components/FloatingFish';
import { Footer } from './components/Footer';
import { LOGO_URL, VIDEO_URL } from './data';

export default function App() {
  return (
    <>
      <FloatingFish />
      <div className="bg-[#121314] text-[#e3e2e2] min-h-screen overflow-x-hidden relative selection:bg-brand-orange selection:text-white flex flex-col font-geist">
        {/* Background Video */}
      <div className="fixed inset-0 z-0 w-full h-full bg-black flex items-center justify-center pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-[85vh] object-cover object-center opacity-100 brightness-110 contrast-110 shadow-[0_0_80px_rgba(255,255,255,0.1)]"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Main Content */}
      <main className="relative flex-grow flex flex-col pt-40 pb-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full gap-24">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-6 md:left-16 z-30"
        >
          <img src={LOGO_URL} alt="Migue Strategy Logo" className="h-12 w-auto object-contain drop-shadow-md" />
        </motion.div>

        <Hero />
        
        {/* Interactive Video Presentation */}
        <section className="relative flex justify-center w-full">
          <InteractiveVideo />
        </section>

        <Carousel />
      </main>

      <Footer />
      </div>
    </>
  );
}
