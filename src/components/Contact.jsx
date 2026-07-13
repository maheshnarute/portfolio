import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiExternalLink } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import './Contact.css';

/* Mobile-safe ripple button (handles both click and touch) */
function RippleButton({ onClick, children, className }) {
  const [ripples, setRipples] = useState([]);

  const spawnRipple = (x, y) => {
    const id = Date.now();
    setRipples((r) => [...r, { x, y, id }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick?.();
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX || rect.width / 2) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY || rect.height / 2) - rect.top;
    spawnRipple(x, y);
  };

  return (
    <button className={`ripple-btn ${className}`} onClick={handleClick} type="button">
      {children}
      {ripples.map((rp) => (
        <span key={rp.id} className="ripple" style={{ left: rp.x, top: rp.y }} />
      ))}
    </button>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactItems = [
    { icon: HiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, onClick: copyEmail },
    { icon: HiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: HiLocationMarker, label: 'Location', value: personalInfo.location, href: null },
  ];

  const socialLinks = [
    { href: personalInfo.linkedin, Icon: FaLinkedinIn, label: 'LinkedIn', color: '#0a66c2' },
    { href: personalInfo.github, Icon: FaGithub, label: 'GitHub', color: '#a855f7' },
    { href: personalInfo.hackerrank, label: 'HackerRank', emoji: '👾', color: '#00ea64' },
    { href: personalInfo.portfolio, label: 'Portfolio', emoji: '🌐', color: '#00d4ff' },
  ];

  return (
    <section id="contact" className="contact section-container" ref={sectionRef}>
      <div className="contact__bg" />

      <div className="container">
        <motion.div
          className="contact__container"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">
            <span className="section-title__accent">06.</span> Get In Touch
          </h2>

          <motion.p
            className="contact__intro"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Open to new opportunities and collaborations. Let's build something great together.
          </motion.p>

          {/* Contact cards */}
          <div className="contact__grid">
            {contactItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="contact__card neumorphic"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.12 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <motion.div
                  className="contact__icon"
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <item.icon size={26} />
                </motion.div>

                <h3 className="contact__label">{item.label}</h3>

                {item.onClick ? (
                  <RippleButton className="contact__value contact__btn" onClick={item.onClick}>
                    {item.value}
                    {copied && item.label === 'Email' && (
                      <motion.span
                        className="contact__copied"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        ✓ Copied!
                      </motion.span>
                    )}
                  </RippleButton>
                ) : item.href ? (
                  <a href={item.href} className="contact__value contact__link">
                    {item.value}
                  </a>
                ) : (
                  <span className="contact__value">{item.value}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social + external links */}
          <motion.div
            className="contact__social"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {socialLinks.map(({ href, Icon, emoji, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -4, boxShadow: `0 8px 24px ${color}40` }}
                whileTap={{ scale: 0.95 }}
                style={{ '--hover-color': color }}
              >
                {Icon ? <Icon size={20} /> : <span className="contact__social-emoji">{emoji}</span>}
                <span>{label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
