import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import { summary, education } from '../data/portfolioData';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 0.3], ['20px', '-20px']);

  return (
    <section id="about" className="about section-container" ref={sectionRef}>
      <motion.div className="about__bg" style={{ y: yParallax }} />

      <div className="container">
        <motion.div
          className="about__container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-title__accent">01.</span> About Me
          </motion.h2>

          <div className="about__grid">
            <motion.div
              className="about__content"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="about__text">{summary}</p>
              <p className="about__text about__text--muted">
                I'm passionate about creating efficient, maintainable solutions and enjoy mentoring
                junior developers. When not coding, you'll find me at the gym or playing cricket and
                football.
              </p>
            </motion.div>

            <motion.div
              className="about__card"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
            >
              <h3 className="about__card-title">Education</h3>
              <p className="about__card-degree">{education.degree}</p>
              <p className="about__card-institution">{education.institution}</p>
              <p className="about__card-university">{education.university}</p>
              <p className="about__card-year">
                {education.year} · {education.percentage}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
