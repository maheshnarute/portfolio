import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiCheckBadge } from 'react-icons/hi2';
import { HiExternalLink } from 'react-icons/hi';
import { certifications, languages, hobbies } from '../data/portfolioData';
import './Certifications.css';

export default function Certifications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="certifications" className="certs section-container" ref={sectionRef}>
      <div className="certs__bg" />

      <div className="container">
        {/* ─── Certifications ─── */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-title__accent">05.</span> Certifications
        </motion.h2>

        <div className="certs__grid">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="certs__card"
              initial={{ opacity: 0, y: 40, scale: 0.93 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Holographic shimmer */}
              <div className="certs__card-holo" />

              {/* Animated border */}
              <div className="certs__card-border" style={{ '--cert-color': cert.accentColor }} />

              {/* Shine sweep */}
              <div className="certs__card-shine" />

              <div className="certs__card-top">
                <span className="certs__card-icon">{cert.icon}</span>
                <div className="certs__card-badge">
                  <HiCheckBadge size={20} />
                  Verified
                </div>
              </div>

              <h3 className="certs__card-title">{cert.title}</h3>
              <p className="certs__card-issuer" style={{ color: cert.accentColor }}>
                {cert.issuer}
              </p>

              <div className="certs__card-link">
                <HiExternalLink size={14} />
                View Certificate
              </div>
            </motion.a>
          ))}
        </div>

        {/* ─── Languages ─── */}
        <motion.div
          className="langs"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="langs__title">Languages</h3>
          <div className="langs__list">
            {languages.map((lang, i) => (
              <div key={lang.name} className="langs__item">
                <div className="langs__item-header">
                  <span className="langs__name">{lang.name}</span>
                  <span className="langs__level">{lang.level}</span>
                </div>
                <div className="langs__bar-track">
                  <motion.div
                    className="langs__bar-fill"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${lang.proficiency}%` } : {}}
                    transition={{ duration: 1, delay: i * 0.15 + 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Hobbies ─── */}
        <motion.div
          className="hobbies"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="hobbies__title">Hobbies & Interests</h3>
          <div className="hobbies__chips">
            {hobbies.map((h, i) => (
              <motion.span
                key={h}
                className="hobbies__chip"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.8, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                {h}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
