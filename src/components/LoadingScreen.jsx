import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | exit

  useEffect(() => {
    let start = null;
    const duration = 2000;

    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 800);
        }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="loading"
          key="loading"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Ambient orbs */}
          <div className="loading__orb loading__orb--1" />
          <div className="loading__orb loading__orb--2" />

          {/* Animated Logo */}
          <motion.div
            className="loading__logo"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <motion.path
                d="M10 70 L10 10 L40 50 L70 10 L70 70"
                stroke="url(#logoGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#00ffc8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Name */}
          <motion.p
            className="loading__name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Mahesh Narute
          </motion.p>

          {/* Progress bar */}
          <div className="loading__bar-track">
            <motion.div
              className="loading__bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Counter */}
          <motion.span
            className="loading__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
