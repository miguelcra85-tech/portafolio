import { useEffect, useRef } from 'react';

export function FloatingFish() {
  const fishRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 60000; // 60 seconds for a full loop

    const animate = (time: number) => {
      if (!fishRef.current) return;

      // Calculate time variable 't' from 0 to 2PI.
      // Offset by -PI/2 so it starts completely off-screen on the left.
      const t = (((time - startTime) % duration) / duration * Math.PI * 2) - (Math.PI / 2);

      // Base center of the screen
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      
      // Amplitudes: spans 120% of width (swims slightly off screen at edges) and 80% of height
      const rx = window.innerWidth * 0.6;
      const ry = window.innerHeight * 0.4;

      // Lissajous curve (Figure 8 / smooth S-curves)
      const x = cx + rx * Math.sin(t);
      const y = cy + ry * Math.sin(2 * t) / 2;

      // Subtle Z-axis depth and scale floating (non-interactive)
      const z = Math.sin(t * 8) * 60; // oscillate depth
      const scale = 1 + Math.sin(t * 8) * 0.05; // slight organic scale breathing

      // Apply transform using translate3d for GPU hardware acceleration
      // No manual CSS rotation applied; relying purely on <model-viewer> native behavior.
      fishRef.current.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-30 pointer-events-none" style={{ willChange: 'transform' }}>
      <div 
        ref={fishRef}
        className="absolute top-0 left-0"
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        {/* 
          El pez se centra con offset de -50% de sus dimensiones.
          Se amplía el contenedor y se configura bounds="loose" junto con camera-orbit al 130%
          para que la cola del pez tenga suficiente espacio durante la animación "Swim" y no se corte.
        */}
        <div className="absolute left-[-175px] top-[-175px] w-[350px] h-[350px] md:left-[-250px] md:top-[-250px] md:w-[500px] md:h-[500px] pointer-events-auto cursor-grab active:cursor-grabbing">
          <model-viewer 
            src="https://res.cloudinary.com/hw31kdln/image/upload/v1786818163/fish_2_nlhvcv.glb" 
            alt="Modelo 3D Pez"
            auto-rotate 
            camera-controls 
            touch-action="pan-y"
            shadow-intensity="1"
            bounds="loose"
            camera-orbit="auto auto 130%"
            min-camera-orbit="auto auto 60%"
            max-camera-orbit="auto auto 250%"
            interaction-prompt="none"
            ar
            autoplay
            animation-name="Swim"
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          ></model-viewer>
        </div>
      </div>
    </div>
  );
}
