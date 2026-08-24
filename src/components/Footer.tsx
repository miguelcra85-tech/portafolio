// @ts-nocheck
import { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hana-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { url?: string; class?: string; className?: string; 'hint-alpha'?: boolean | string };
    }
  }
}

export function Footer() {
  return (
    <footer className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-8 bg-transparent max-w-[1440px] mx-auto px-6 md:px-16">
      
      {/* 2-Column Layout to leave space on the right */}
      <div className="w-full flex flex-col md:flex-row items-center">
        
        {/* Left Column: Cropped 3D Viewer */}
        <div className="w-full md:w-1/2 flex justify-start md:justify-start justify-center">
          {/* Crop Box: Hides everything outside its bounds */}
          <div className="relative w-full max-w-[400px] h-[350px] md:h-[450px] overflow-hidden rounded-2xl flex items-center justify-center">
            
            {/* 
              We scale the viewer larger than the container (width/height > 100%) 
              and center it to effectively crop out the black borders.
              We also re-apply mix-blend-screen to guarantee the black becomes transparent.
            */}
            <hana-viewer 
              url="https://prod.spline.design/vjPs71MnQ1q84Tig-gxs/scene.hanacode"
              hint-alpha=""
              className="absolute top-1/2 mix-blend-screen"
              style={{ 
                background: 'transparent', 
                width: '180%', 
                height: '180%', 
                display: 'block',
                left: '50%',
                transform: 'translate(-35%, -50%)' /* Ajustado a la izquierda para centrar visualmente */
              }}
            ></hana-viewer>
          </div>
        </div>

        {/* Right Column: Left intentionally blank for space */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex flex-col items-start justify-center pl-0 md:pl-12">
          <h2 className="text-3xl md:text-5xl font-geist font-light text-white tracking-tight mb-2">
            SIGUIENTE <br/>
            <span className="font-extrabold text-gradient-mix">NIVEL</span>
          </h2>
          <p className="font-geist text-[#8e9192] text-lg max-w-sm">
            Diseñando estrategias que conectan, inspiran y convierten.
          </p>
        </div>

      </div>

      <div className="w-full pt-8 text-center border-t border-white/10 mt-16">
        <p className="text-xs font-geist font-medium text-[#8e9192] uppercase tracking-widest">
          © {new Date().getFullYear()} Migue Strategy
        </p>
      </div>
    </footer>
  );
}
