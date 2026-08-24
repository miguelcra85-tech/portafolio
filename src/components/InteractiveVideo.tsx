import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';

export function InteractiveVideo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close via Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation: 15 degrees based on mouse position
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

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
    
    // Auto-play the video with audio
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.play().catch(console.error);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    
    // Pause and reset video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      {/* Fullscreen Background Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Video Container (Placeholder in document flow) */}
      <div className={`relative w-[280px] h-[160px] mx-auto ${isExpanded ? 'z-50' : 'z-10'}`} style={{ perspective: '1000px' }}>
        <motion.div
          layout
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={!isExpanded ? handleOpen : undefined}
          transition={{
            layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            rotateX: { duration: 0.3, ease: "easeOut" },
            rotateY: { duration: 0.3, ease: "easeOut" },
            x: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            y: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
          }}
          animate={{
            rotateX: isExpanded ? 0 : tilt.x,
            rotateY: isExpanded ? 0 : tilt.y,
            z: isHovered && !isExpanded ? 30 : 0,
            x: isExpanded ? "-50%" : 0,
            y: isExpanded ? "-50%" : 0
          }}
          style={{ transformStyle: "preserve-3d" }}
          className={`group rounded-2xl ${
            !isExpanded 
              ? 'absolute top-0 left-0 w-full h-full cursor-pointer z-10' 
              : 'fixed top-[50%] left-[50%] w-[90vw] md:w-[75vw] h-[75vh] cursor-default z-50'
          }`}
        >
          {/* Intense Warm Glow Effect (Pushed behind in 3D) */}
          <motion.div
            animate={{
              opacity: isExpanded ? 0.4 : (isHovered ? 0.9 : 0.5),
              scale: isExpanded ? 1.05 : (isHovered ? 1.15 : 1)
            }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-[#ff9d3d] rounded-2xl ${
              isExpanded ? 'blur-[60px]' : 'blur-[40px]'
            }`}
            style={{ transform: 'translateZ(-10px)' }}
          />

          {/* Video Element Wrapper */}
          <div 
            className="relative w-full h-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ transform: 'translateZ(1px)' }}
          >
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/hw31kdln/video/upload/v1787452366/Presentaci%C3%B3n_animaci%C3%B3n_eededd.mp4"
              className="w-full h-full object-cover"
              preload="metadata"
              onEnded={handleClose}
              controls={isExpanded}
              playsInline
            />

            {/* Play Button Overlay (Idle Thumbnail) */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none"
                >
                  <button
                    aria-label="Reproducir video"
                    className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg pointer-events-none transition-transform duration-300 group-hover:scale-110"
                  >
                    <Play className="w-6 h-6 ml-1 drop-shadow-md" fill="currentColor" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close Button (Expanded State) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors cursor-pointer shadow-lg"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}
