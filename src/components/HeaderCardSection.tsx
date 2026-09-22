import { motion } from 'motion/react';
import { Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { InteractiveVideo } from './InteractiveVideo';
import { HEADER_VIDEO_URL } from '../data';

export function HeaderCardSection() {
  return (
    <section className="w-full relative z-20">
      {/* 
        Disposición:
        - Lado Izquierdo: Contenedor de Video 3D interactivo
        - Lado Derecho: Contenido totalmente flotante, transparente, sin bordes ni recuadros visibles
      */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 w-full">
        
        {/* LADO IZQUIERDO: Contenedor de video interactivo (3D tilt, interactivo y expandible) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center"
        >
          <div className="w-full max-w-[520px] flex flex-col items-center lg:items-start gap-3">
            <InteractiveVideo 
              src={HEADER_VIDEO_URL}
              glowColor="#00E5FF"
              width="w-full max-w-[500px]"
              height="h-[250px] sm:h-[280px] lg:h-[300px]"
              badge="Video Destacado"
              label="Reproducir Video"
              className="w-full"
            />
            <span className="text-[11px] font-geist text-[#8e9192] tracking-wider uppercase pl-2">
              Haz clic sobre el video para reproducir en pantalla completa
            </span>
          </div>
        </motion.div>

        {/* LADO DERECHO: Letras totalmente flotantes con transparencia total (sin orillas, sin bordes) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          {/* Contenedor sin bordes, fondos ni contornos para que las letras floten en el espacio */}
          <div className="relative w-full max-w-[580px] p-2 sm:p-4 flex flex-col gap-6">
            
            {/* 'Publicidad & Crecimiento': Sin recuadro ni orillas visibles, icono y texto flotantes */}
            <div className="inline-flex items-center gap-2.5 w-fit">
              <Sparkles className="w-4 h-4 text-brand-orange drop-shadow-[0_0_8px_rgba(255,106,0,0.6)]" />
              <span className="text-xs font-geist font-semibold text-brand-orange tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Publicidad & Crecimiento
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-geist font-semibold text-white tracking-tight leading-snug mb-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                Escala grandes facturaciones con inversiones mínimas para contenido de mecanismos valiosos.
              </h2>
              <p className="text-sm sm:text-base font-geist text-[#b8baba] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Estrategias de publicidad y contenido diseñadas para maximizar el impacto y retorno comercial.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:miguelcra85@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-orange hover:bg-[#ff7b1a] text-white font-geist font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:shadow-[0_0_30px_rgba(255,106,0,0.7)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar Mensaje</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* 
                Botón "Ver Casos" con:
                - Contorno degradado verde y azul
                - Efecto de destello/brillo cinemático cada 7 segundos
              */}
              <div className="relative inline-flex items-center justify-center">
                {/* Halo de resplandor que pulsa cada 7 segundos */}
                <motion.span
                  animate={{
                    opacity: [0.2, 0.9, 0.2, 0.2],
                    scale: [1, 1.06, 1, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.15, 0.3, 1],
                  }}
                  className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-[#10B981] via-[#00E5FF] to-[#3B82F6] blur-md pointer-events-none"
                  aria-hidden="true"
                />

                <a
                  href="https://miguelcra85-tech.github.io/Google-ai-studio-Migue-Novedades/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group/cases hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 shadow-[0_0_18px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] cursor-pointer"
                >
                  {/* Borde degradado verde (#10B981), cyan (#00E5FF) y azul (#3B82F6) */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#10B981] via-[#00E5FF] to-[#3B82F6] rounded-full transition-all duration-300 group-hover/cases:brightness-125" />
                  
                  {/* Fondo interior semi-transparente para conservar la legibilidad */}
                  <span className="relative px-6 py-3 rounded-full bg-[#16171a]/90 group-hover/cases:bg-[#16171a]/75 transition-colors flex items-center gap-2 text-white font-geist font-semibold text-xs tracking-wider uppercase overflow-hidden">
                    <span>Ver Casos</span>
                    <ArrowUpRight className="w-4 h-4 text-[#00E5FF] group-hover/cases:translate-x-0.5 group-hover/cases:-translate-y-0.5 transition-transform" />

                    {/* Haz de brillo/destello que recorre el botón cada 7 segundos */}
                    <motion.span
                      animate={{
                        x: ['-200%', '250%', '250%'],
                        opacity: [0, 0.85, 0],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.2, 1],
                      }}
                      className="absolute inset-y-0 -skew-x-20 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
