import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../data';

export function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    if (!carouselRef.current || isScrolling) return;
    const scrollPosition = carouselRef.current.scrollLeft;
    
    const items = carouselRef.current.children;
    if (items.length > 0) {
      const itemWidth = (items[0] as HTMLElement).offsetWidth + 32;
      const index = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(Math.min(Math.max(index, 0), projects.length - 1));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    setCurrentIndex(index);
    setIsScrolling(true);
    
    if (carouselRef.current) {
      const items = carouselRef.current.children;
      if (items.length > 0) {
        const itemWidth = (items[0] as HTMLElement).offsetWidth + 32;
        carouselRef.current.scrollTo({
          left: index * itemWidth,
          behavior: 'smooth'
        });
      }
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const scrollByAmount = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div id="proyectos" className="w-full mt-24">
      <div className="flex flex-col mb-12 gap-4">
        <h2 className="text-4xl font-geist text-white tracking-tight">PROYECTOS SELECCIONADOS</h2>
        <p className="text-lg text-[#c6c6c7] max-w-xl">
          Una colección de casos de éxito donde la estrategia y la innovación se unen para generar impacto real.
        </p>
      </div>

      <div className="relative group/carousel-nav">
        <button 
          onClick={() => scrollByAmount(-400)}
          className="absolute left-[-64px] top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-brand-orange/30 items-center justify-center bg-black hover:bg-brand-orange/20 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,106,0,0.6)] hover:border-brand-orange transition-all duration-300 hidden md:flex cursor-pointer"
        >
          <ArrowLeft className="text-brand-orange w-6 h-6 drop-shadow-[0_0_8px_rgba(255,106,0,0.5)]" />
        </button>

        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 scrollbar-hide scroll-smooth"
        >
          {projects.map((project, idx) => (
            <div key={idx} className="snap-center flex-none w-[85%] md:w-[30%] max-w-[800px]">
              <div className="rounded-2xl overflow-hidden flex flex-col h-full group relative aspect-[4/5] bg-transparent">
                <div className="relative h-full w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay removed to let the light pass and only show the image */}
                </div>
                
                <div className="absolute bottom-0 w-full p-8 flex flex-col justify-end gap-6 z-20">
                  <div>
                    <div className="text-xs font-geist font-semibold text-brand-orange tracking-widest uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-geist font-medium text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {project.title}
                    </h3>
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-xs font-geist font-semibold tracking-widest text-brand-orange hover:text-white hover:scale-105 transition-all w-fit group/btn relative z-30 uppercase"
                  >
                    Ver Proyecto
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform drop-shadow-[0_0_10px_rgba(255,106,0,0.8)]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scrollByAmount(400)}
          className="absolute right-[-64px] top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-brand-orange/30 items-center justify-center bg-black hover:bg-brand-orange/20 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,106,0,0.6)] hover:border-brand-orange transition-all duration-300 hidden md:flex cursor-pointer"
        >
          <ArrowRight className="text-brand-orange w-6 h-6 drop-shadow-[0_0_8px_rgba(255,106,0,0.5)]" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 mt-12 w-full">
        <div className="flex items-center gap-6 w-full md:w-[40%] w-[75%] mx-auto">
          <span className="font-geist font-bold text-brand-orange text-lg min-w-[60px] text-center">
            0{currentIndex + 1} / 0{projects.length}
          </span>
          <div className="w-full">
            <input 
              type="range" 
              min="0" 
              max={projects.length - 1} 
              step="1" 
              value={currentIndex}
              onChange={handleSliderChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
