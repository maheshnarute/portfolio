import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <motion.div
        className="footer__container container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="footer__content">
          <p className="footer__name">{personalInfo.name}</p>
          <p className="footer__tagline">{personalInfo.title}</p>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {personalInfo.name}. Crafted with care.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
