import React, { useEffect, useState } from 'react';

/**
 * Custom CursorGlow component.
 * Tracks global mouse position and draws a glowing backdrop gradient.
 */
export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePos = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePos);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePos);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 30,
        transition: 'opacity 0.5s ease',
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 255, 0.08), rgba(168, 85, 247, 0.04), transparent 75%)`,
      }}
    />
  );
}
