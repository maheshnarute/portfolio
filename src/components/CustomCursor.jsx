import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  // Only show custom cursor on devices with precise pointer (mouse/trackpad)
  const isFinePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const animFrame = useRef(null);

  useEffect(() => {
    if (!isFinePointer) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }
      if (ringRef.current) {
        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);
        ringRef.current.style.transform = `translate(${ringPos.current.x - 22}px, ${ringPos.current.y - 22}px)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor="pointer"], input, textarea');
      setIsHovering(!!el);
    };
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animFrame.current);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor__dot ${isHovering ? 'cursor__dot--hover' : ''} ${isClicking ? 'cursor__dot--click' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor__ring ${isHovering ? 'cursor__ring--hover' : ''} ${isClicking ? 'cursor__ring--click' : ''}`}
      />
    </>
  );
}
