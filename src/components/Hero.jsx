import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown, HiLocationMarker, HiExternalLink } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import {
  SiPython, SiDjango, SiReact, SiPostgresql, SiDocker, SiRedis,
} from 'react-icons/si';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';

/* ── Floating tech badges around profile ── */
const TECH_BADGES = [
  { Icon: SiReact, label: 'React', color: '#61dafb', top: '5%', left: '75%', delay: 0 },
  { Icon: SiPython, label: 'Python', color: '#3776ab', top: '20%', left: '80%', delay: 0.3 },
  { Icon: SiDjango, label: 'Django', color: '#0c4b33', top: '75%', left: '78%', delay: 0.6 },
  { Icon: SiDocker, label: 'Docker', color: '#2496ed', top: '80%', left: '18%', delay: 0.9 },
  { Icon: SiPostgresql, label: 'PostgreSQL', color: '#336791', top: '20%', left: '12%', delay: 1.2 },
  { Icon: SiRedis, label: 'Redis', color: '#dc382d', top: '5%', left: '20%', delay: 1.5 },
];

/* ── Character-split animated name ── */
function AnimatedName({ name }) {
  return (
    <span className="hero__name-chars" aria-label={name}>
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          className="hero__char"
          initial={{ opacity: 0, y: '60%', rotateX: -40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: '0%', rotateX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Kinetic word-by-word tagline ── */
function KineticTagline({ text }) {
  const words = text.split(' ');
  return (
    <div className="hero__tagline" aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="hero__tagline-clip">
          <motion.span
            className="hero__tagline-word"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 + i * 0.075, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ── Typewriter role ── */
function TypewriterRole({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { setDone(true); clearInterval(timer); }
    }, 65);
    return () => clearInterval(timer);
  }, [text]);
  return (
    <motion.div className="hero__role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      {displayed}
      {!done && <span className="hero__role-cursor">|</span>}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yFg = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);
  const scaleImg = useTransform(scrollYProgress, [0, 0.3], [1.05, 1]);
  const yImg = useTransform(scrollYProgress, [0, 0.3], ['0%', '-10%']);
  const yText = useTransform(scrollYProgress, [0, 0.3], ['0px', '-30px']);

  const scrollToAbout = () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Animated mesh gradient */}
      <div className="hero__mesh" />

      {/* Ambient orbs */}
      <motion.div className="hero__orb hero__orb--1" style={{ y: yBg }} />
      <motion.div className="hero__orb hero__orb--2" style={{ y: yBg }} />
      <motion.div className="hero__orb hero__orb--3" style={{ y: yFg }} />

      {/* Aurora strip */}
      <div className="hero__aurora" />

      <motion.div className="hero__content" style={{ opacity }}>
        {/* Profile + floating badges */}
        <div className="hero__profile-zone">
          {/* Floating tech badges */}
          {/* {TECH_BADGES.map(({ Icon, label, color, top, left, delay }) => (
            <motion.div
              key={label}
              className="hero__tech-badge"
              style={{ top, left, '--badge-color': color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 + delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -8, 4, 0] }}
                transition={{ duration: 3 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: delay }}
              >
                <Icon size={16} style={{ color }} />
                <span>{label}</span>
              </motion.div>
            </motion.div>
          ))} */}

          {/* Profile image */}
          <motion.div
            className="hero__profile-wrap"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ scale: scaleImg, y: yImg }}
          >
            <div className="hero__blob" />
            <div className="hero__profile-glow" />
            <div className="hero__profile-border" />
            {/* Holographic shimmer ring */}
            <div className="hero__profile-holo" />
            <img src={personalInfo.profileImage} alt={personalInfo.name} className="hero__profile-img" />

            <svg className="hero__profile-svg" viewBox="0 0 200 20" fill="none">
              <motion.ellipse
                cx="100" cy="10" rx="90" ry="6"
                stroke="url(#heroEllipseGrad)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.2, delay: 1.0 }}
              />
              <defs>
                <linearGradient id="heroEllipseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#00ffc8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Text content */}
        <motion.div className="hero__text" style={{ y: yText }}>
          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hi, I'm
          </motion.p>

          {/* Glitch name on hover */}
          <h1 className="hero__name hero__name--glitch" data-text={personalInfo.name}>
            <AnimatedName name={personalInfo.name} />
          </h1>

          <TypewriterRole text={personalInfo.title} />
          <KineticTagline text={personalInfo.tagline} />

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            <HiLocationMarker className="hero__meta-icon" />
            <span>{personalInfo.location}</span>
          </motion.div>

          {/* CTA row 1 */}
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="#contact"
              className="hero__btn hero__btn--primary"
              whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(0,212,255,0.45)' }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Get in Touch
            </motion.a>

            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.06, borderColor: 'var(--accent-cyan)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaLinkedinIn /> LinkedIn
            </motion.a>

            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.06, borderColor: 'var(--accent-purple)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FaGithub /> GitHub
            </motion.a>
          </motion.div>

          {/* CTA row 2 — HackerRank + Portfolio */}
          <motion.div
            className="hero__cta hero__cta--row2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href={personalInfo.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--hackerrank"
              whileHover={{ scale: 1.06, boxShadow: '0 0 28px rgba(0,234,100,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <HiExternalLink size={16} /> HackerRank
            </motion.a>

            <motion.a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--portfolio"
              whileHover={{ scale: 1.06, boxShadow: '0 0 28px rgba(168,85,247,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <HiExternalLink size={16} /> Live Portfolio
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll"
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        whileHover={{ scale: 1.1, borderColor: 'var(--accent-cyan)' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
