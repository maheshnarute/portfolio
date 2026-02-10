import { useScroll, useTransform } from 'framer-motion';

/**
 * Returns opacity and y values for fade-in/fade-out effect on scroll.
 * Content fades in and slides up as section enters, fades out and slides down as it leaves.
 * @param {React.RefObject} ref - Section element ref
 * @returns {{ opacity: MotionValue, y: MotionValue }}
 */
export function useFadeInOut(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  /* 
   * Simplification: Only control opacity fade-in on entrance.
   * Removed exit animations to prevent content disappearing at scroll limits.
   */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2],
    ['50px', '0px']
  );

  return { opacity, y };
}
