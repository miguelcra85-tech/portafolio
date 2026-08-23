import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { 
        src?: string; 
        alt?: string; 
        'auto-rotate'?: boolean | string; 
        'camera-controls'?: boolean | string; 
        'touch-action'?: string;
        'shadow-intensity'?: string;
        ar?: boolean | string;
        autoplay?: boolean | string;
        'animation-name'?: string;
        class?: string;
      };
    }
  }
}

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] gap-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md relative z-10"
      >
        <span className="font-geist font-semibold text-[#c6c6c7] tracking-widest text-xs">
          MARKETING • ESTRATEGIA • INNOVACIÓN
        </span>
      </motion.div>

      <div className="flex flex-col items-center max-w-5xl leading-none relative z-10 pointer-events-none mt-12 md:mt-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-light font-geist text-white mb-2"
        >
          LA
        </motion.h1>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-geist text-gradient-mix tracking-tighter mb-4"
          style={{ lineHeight: 0.9 }}
        >
          CREATIVIDAD
        </motion.h1>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-editorial italic text-white/90 mb-4"
        >
          Y EL ESTILO EMERGEN DE
        </motion.h1>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold font-geist text-gradient-mix tracking-tight"
        >
          TU MARCA
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        className="absolute bottom-[-10vh] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="font-geist font-semibold text-[#c6c6c7] tracking-widest text-xs uppercase">
          Explorar Proyectos
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="text-brand-orange w-8 h-8" />
        </motion.div>
      </motion.div>
    </div>
  );
}
