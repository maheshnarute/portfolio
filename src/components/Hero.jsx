import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  /* Parallax: Image scales down, Text reveals up */
  /* Parallax: Image scales down, Text reveals up */
  // Photo starts larger (1.2) and settles to 1.
  const scaleImg = useTransform(scrollYProgress, [0, 0.3], [1.1, 1]);
  const yImg = useTransform(scrollYProgress, [0, 0.3], ['0%', '-15%']);

  // Text content remains visible and enters on load
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]); // Subtle fade out on scroll away
  const yText = useTransform(scrollYProgress, [0, 0.3], ['0px', '-40px']); // Parallax lift on scroll away

  /* Background parallax */
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yFg = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  const words = personalInfo.tagline.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 + i * 0.05 },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollToSection = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Parallax background layers */}
      <motion.div className="hero__bg hero__bg--1" style={{ y: yBg }} />
      <motion.div className="hero__bg hero__bg--2" style={{ y: yBg }} />
      <motion.div className="hero__bg hero__bg--3" style={{ y: yFg }} />
      <div className="hero__gradient" />



      <motion.div className="hero__content" style={{ opacity }}>
        <motion.div
          className="hero__profile-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: scaleImg, y: yImg }}
        >
          <div className="hero__profile-glow" />
          <div className="hero__profile-border" />
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="hero__profile-img"
          />
        </motion.div>

        <motion.div style={{ y: yText }}>
          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{personalInfo.name}</span>
            <motion.span
              className="hero__cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.h1>

          <motion.div
            className="hero__tagline"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span key={i} variants={child} className="hero__tagline-word">
                {word}{' '}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="hero__meta-item">
              <HiLocationMarker /> {personalInfo.location}
            </span>
          </motion.div>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <motion.a
              href="#contact"
              className="hero__btn hero__btn--primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.05, color: 'var(--accent-cyan)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={20} />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.05, color: 'var(--accent-cyan)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <FaGithub size={20} />
              <span>GitHub</span>
            </motion.a>
          </motion.div>

        </motion.div>




      </motion.div>

      <motion.button
        className="hero__scroll"
        onClick={scrollToSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        whileHover={{ y: 4 }}
        aria-label="Scroll down"
      >
        <HiArrowDown size={24} />
      </motion.button>
    </section>
  );
}
