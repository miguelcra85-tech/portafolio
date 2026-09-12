import { Mail, ArrowUpRight, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-8 bg-transparent max-w-[1440px] mx-auto px-6 md:px-16">
      {/* 2-Column Layout */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Column: Clean & Optimized High-Impact CTA Card (Replaces obsolete Spline script) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="relative w-full max-w-[440px] p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
            {/* Ambient Background Glow */}
            <div 
              className="absolute -top-24 -left-24 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-brand-orange/30" 
              aria-hidden="true" 
            />
            <div 
              className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-electric/15 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-brand-electric/25" 
              aria-hidden="true" 
            />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span className="text-[11px] font-geist font-semibold text-white/80 tracking-widest uppercase">
                  Publicidad & Crecimiento
                </span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-geist font-semibold text-white tracking-tight leading-snug mb-2">
                  Escala grandes facturaciones con inversiones mínimas para contenido de mecanismos valiosos.
                </h3>
                <p className="text-sm font-geist text-[#a5a7a8] leading-relaxed">
                  Estrategias de publicidad y contenido diseñadas para maximizar el impacto y retorno comercial.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="mailto:miguelcra85@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-orange hover:bg-[#ff7b1a] text-white font-geist font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:shadow-[0_0_30px_rgba(255,106,0,0.7)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Botón Ver Casos con contorno degradado verde y azul */}
                <a
                  href="https://miguelcra85-tech.github.io/Google-ai-studio-Migue-Novedades/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group/cases hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 shadow-[0_0_18px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#10B981] via-[#00E5FF] to-[#3B82F6] rounded-full transition-all duration-300 group-hover/cases:brightness-125" />
                  <span className="relative px-5 py-2.5 rounded-full bg-[#16171a] group-hover/cases:bg-[#16171a]/85 transition-colors flex items-center gap-2 text-white font-geist font-semibold text-xs tracking-wider uppercase">
                    <span>Ver Casos</span>
                    <ArrowUpRight className="w-4 h-4 text-[#00E5FF] group-hover/cases:translate-x-0.5 group-hover/cases:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Statement */}
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right justify-center">
          <h2 className="text-4xl md:text-6xl font-geist font-light text-white tracking-tight mb-3">
            SIGUIENTE <br/>
            <span className="font-extrabold text-gradient-mix">NIVEL</span>
          </h2>
          <p className="font-geist text-[#8e9192] text-lg md:text-xl max-w-md leading-relaxed">
            Diseñando estrategias que conectan, inspiran y convierten.
          </p>
        </div>

      </div>

      <div className="w-full pt-8 text-center border-t border-white/10 mt-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-geist font-medium text-[#8e9192] uppercase tracking-widest">
          © {new Date().getFullYear()} Migue Strategy • Todos los derechos reservados
        </p>
        <p className="text-xs font-geist text-[#686b6d]">
          Optimizado para rendimiento, velocidad y SEO
        </p>
      </div>
    </footer>
  );
}
