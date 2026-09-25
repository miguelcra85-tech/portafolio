import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Volume2 } from 'lucide-react';

export interface InteractiveVideoProps {
  /**
   * URL del video. Soporta MP4, WebM o enlaces CDN directos.
   */
  src?: string;
  glowColor?: string;
  width?: string;
  height?: string;
  className?: string;
  label?: string;
  badge?: string;
}

export function InteractiveVideo({
  src = "https://res.cloudinary.com/hw31kdln/video/upload/v1790005612/Presentaci%C3%B3n_Animaci%C3%B3n_s3ukg4.mp4",
  glowColor = "#ff9d3d",
  width = "w-[280px] md:w-[320px]",
  height = "h-[170px] md:h-[190px]",
  className = "",
  label = "Reproducir video",
  badge,
}: InteractiveVideoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Close via Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isExpanded]);

  // Auto-play modal video with sound when expanded
  useEffect(() => {
    if (isExpanded && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.muted = false;
      const playPromise = modalVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay with sound was prevented, retrying muted:", error);
          if (modalVideoRef.current) {
            modalVideoRef.current.muted = true;
            modalVideoRef.current.play().catch(console.error);
          }
        });
      }
    }
  }, [isExpanded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation: 12 degrees based on mouse position
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleOpen = () => {
    setIsExpanded(true);
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClose = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* Inline Interactive Card with 3D Tilt */}
      <div 
        className={`relative ${width} ${height} mx-auto ${className}`} 
        style={{ perspective: '1000px' }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpen}
          transition={{
            rotateX: { duration: 0.25, ease: "easeOut" },
            rotateY: { duration: 0.25, ease: "easeOut" },
            scale: { duration: 0.25 }
          }}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: isHovered ? 1.02 : 1,
            z: isHovered ? 20 : 0
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="group relative w-full h-full cursor-pointer rounded-2xl select-none"
        >
          {/* Intense Glow Effect (Pushed behind in 3D) */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.85 : 0.45,
              scale: isHovered ? 1.08 : 1
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl blur-[35px]"
            style={{ 
              backgroundColor: glowColor,
              transform: 'translateZ(-10px)' 
            }}
          />

          {/* Video Element Card Wrapper */}
          <div 
            className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0d0e10] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            style={{ transform: 'translateZ(1px)' }}
          >
            {badge && (
              <div className="absolute top-3 left-3 z-30 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-geist font-semibold text-white/90 uppercase tracking-widest pointer-events-none shadow-md">
                {badge}
              </div>
            )}

            {/* Inline Preview Video */}
            <video
              ref={previewVideoRef}
              src={src}
              className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-300"
              preload="metadata"
              playsInline
              muted
            />

            {/* Play Button Overlay (Idle Thumbnail) */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/35 group-hover:bg-black/15 transition-colors pointer-events-none gap-2.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 drop-shadow-md text-white" fill="currentColor" />
              </div>
              <span className="text-[11px] sm:text-xs font-geist font-semibold text-white tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                {label}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 
        Full-Screen Centered Video Modal (Portaled directly to document.body)
        Esto garantiza que se reproduzca en el CENTRO EXACTO de la landing page,
        sin verse afectado por ningún transform, perspective o columna de la página.
      */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop oscuro con blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                onClick={handleClose}
                aria-label="Cerrar reproductor"
              />

              {/* Contenedor del video centrado en pantalla que se hace grande desde pequeño */}
              <motion.div
                initial={{ opacity: 0, scale: 0.45 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.45 }}
                transition={{ type: "spring", damping: 25, stiffness: 280 }}
                className="relative z-10 w-full max-w-5xl max-h-[85vh] aspect-video flex flex-col rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Resplandor ambiental centrado */}
                <div 
                  className="absolute -inset-1 rounded-2xl blur-[60px] opacity-40 pointer-events-none"
                  style={{ backgroundColor: glowColor }}
                  aria-hidden="true"
                />

                {/* Barra superior transparente con botón de cerrar transparente (solo la 'X' blanca semitransparente) */}
                <div className="absolute top-0 inset-x-0 z-30 p-3 sm:p-5 flex items-center justify-between pointer-events-none bg-transparent">
                  {badge ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-xs font-geist font-semibold text-white/90 tracking-widest uppercase shadow-md">
                      <Volume2 className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{badge}</span>
                    </div>
                  ) : <div />}

                  <button
                    onClick={handleClose}
                    className="pointer-events-auto p-2 bg-transparent hover:bg-transparent border-0 text-white/60 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95 focus:outline-none ml-auto"
                    aria-label="Cerrar video"
                  >
                    <X className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] stroke-[2.2]" />
                  </button>
                </div>

                {/* Reproductor de Video con controles y sonido activo */}
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={modalVideoRef}
                    src={src}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    onEnded={handleClose}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

