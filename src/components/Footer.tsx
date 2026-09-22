import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full relative z-10 flex flex-col items-center justify-center pt-20 pb-12 bg-transparent max-w-[1440px] mx-auto px-6 md:px-16">
      {/* 
        Sin líneas divisoras ni bordes de orilla:
        Transición completamente fluida y sin cortes visuales
      */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-geist font-light text-white tracking-tight mb-2">
            SIGUIENTE <br/>
            <span className="font-extrabold text-gradient-mix">NIVEL</span>
          </h2>
          <p className="font-geist text-[#8e9192] text-base md:text-lg max-w-md leading-relaxed">
            Diseñando estrategias que conectan, inspiran y convierten.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:miguelcra85@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-geist font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105"
          >
            <span>Contáctame</span>
            <ArrowUpRight className="w-4 h-4 text-brand-orange" />
          </a>
        </div>
      </div>

      <div className="w-full pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
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
