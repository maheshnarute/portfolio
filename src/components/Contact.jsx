import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedinIn } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactItems = [
    {
      icon: HiMail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      onClick: copyEmail,
    },
    {
      icon: HiPhone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: personalInfo.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="contact section-container">
      <div className="container">
        <motion.div
          className="contact__container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
          >
            <span className="section-title__accent">05.</span> Get In Touch
          </motion.h2>

          <motion.p
            className="contact__intro"
          >
            I'm open to new opportunities and collaborations. Let's build something great together.
          </motion.p>

          <div className="contact__grid">
            {contactItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="contact__card"
                whileHover={{ y: -5, borderColor: 'rgba(0, 212, 255, 0.3)' }}
              >
                <motion.span
                  className="contact__icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <item.icon size={28} />
                </motion.span>
                <h3 className="contact__label">{item.label}</h3>
                {item.onClick ? (
                  <button className="contact__value contact__btn" onClick={item.onClick}>
                    {item.value}
                    {copied && item.label === 'Email' && (
                      <motion.span
                        className="contact__copied"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Copied!
                      </motion.span>
                    )}
                  </button>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="contact__value contact__link"
                    {...(item.href.startsWith('http') && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="contact__value">{item.value}</span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="contact__social"
          >
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
