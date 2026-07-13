import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import './Footer.css';

const footerLinks = [
  { href: personalInfo.linkedin, Icon: FaLinkedinIn, label: 'LinkedIn', color: '#0a66c2' },
  { href: personalInfo.github, Icon: FaGithub, label: 'GitHub', color: '#a855f7' },
  { href: personalInfo.hackerrank, emoji: '👾', label: 'HackerRank', color: '#00ea64' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__bg" />

      <motion.div
        className="footer__container container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Self-drawing doodle heart */}
        <div className="footer__doodle-wrap">
          <svg className="footer__doodle" viewBox="0 0 60 60" fill="none">
            <motion.path
              d="M30 45 C10 30, 5 15, 15 10 C20 8, 27 12, 30 18 C33 12, 40 8, 45 10 C55 15, 50 30, 30 45 Z"
              stroke="url(#heartGrad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="footer__content">
          <p className="footer__name">{personalInfo.name}</p>
          <p className="footer__tagline">{personalInfo.title}</p>
          <p className="footer__tagline" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{personalInfo.location}</p>
        </div>

        {/* Social links */}
        <div className="footer__social">
          {footerLinks.map(({ href, Icon, emoji, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={label}
              style={{ '--link-color': color }}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              {Icon ? <Icon size={18} /> : <span>{emoji}</span>}
            </motion.a>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {personalInfo.name}. Crafted with{' '}
            <span className="footer__heart">♥</span> and lots of code.
          </p>
          <p className="footer__stack">React · Django · PostgreSQL · AWS</p>
        </div>
      </motion.div>
    </footer>
  );
}
