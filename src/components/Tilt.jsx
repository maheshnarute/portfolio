import React, { useRef, useState } from 'react';

/**
 * Custom 3D Tilt component in React.
 * Applies perspective-based tilt transforms on mouse hover.
 */
export default function Tilt({ children, className = '' }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    // Mouse position relative to the center of the card
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = x / box.width;
    const normalizedY = y / box.height;
    
    // Maximum degrees of rotation
    const maxTilt = 12;
    
    setTilt({
      x: normalizedY * maxTilt,  // Tilt forward/backward based on vertical mouse offset
      y: -normalizedX * maxTilt, // Tilt left/right based on horizontal mouse offset
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const cardStyle = {
    transform: isHovered
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
    transformStyle: 'preserve-3d',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={className}
    >
      {children}
    </div>
  );
}
