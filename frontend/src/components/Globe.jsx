import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export const Globe = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: canvasRef.current.clientWidth * 2,  // Use clientWidth for responsiveness
      height: canvasRef.current.clientHeight * 2, // Use clientHeight for responsiveness
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.1, 1],
      glowColor: [0, 0, 0],
      markers: [
        { location: [28.6235, 76.9180], size: 0.03 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    // Cleanup on component unmount
    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ 
        width: '100%',    // Make the width responsive
        height: 'auto',   // Maintain aspect ratio
        maxWidth: '400px', // Set max width for larger screens
        aspectRatio: 1,
        filter: 'drop-shadow(0 0 10px rgba(0, 128, 255, 0.3))'
      }}
      className={className}
    />
  );
};
