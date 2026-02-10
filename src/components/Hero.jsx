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

  const scaleImg = useTransform(scrollYProgress, [0, 0.3], [1.1, 1]);
  const yImg = useTransform(scrollYProgress, [0, 0.3], ['0%', '-15%']);
  const yText = useTransform(scrollYProgress, [0, 0.3], ['0px', '-40px']);

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yFg = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  const words = personalInfo.tagline.split(' ');

  const scrollToSection = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <motion.div className="hero__bg hero__bg--1" style={{ y: yBg }} />
      <motion.div className="hero__bg hero__bg--2" style={{ y: yBg }} />
      <motion.div className="hero__bg hero__bg--3" style={{ y: yFg }} />
      <div className="hero__gradient" />

      <motion.div className="hero__content" style={{ opacity }}>
        <motion.div
          className="hero__profile-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
          <p className="hero__greeting">Hi, I'm</p>

          <h1 className="hero__name">
            {personalInfo.name}
            <motion.span
              className="hero__cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </h1>

          <div className="hero__tagline">
            {words.map((word, i) => (
              <span key={i} className="hero__tagline-word">
                {word}{' '}
              </span>
            ))}
          </div>

          <div className="hero__meta">
            <HiLocationMarker /> {personalInfo.location}
          </div>

          <div className="hero__cta">
            <a
              href="#contact"
              className="hero__btn hero__btn--primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--secondary"
            >
              <FaLinkedinIn /> LinkedIn
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--secondary"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>

      <button className="hero__scroll" onClick={scrollToSection}>
        <HiArrowDown size={24} />
      </button>
    </section>
  );
}
