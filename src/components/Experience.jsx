import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useFadeInOut } from '../hooks/useFadeInOut';
import { HiBriefcase, HiCheckCircle } from 'react-icons/hi';
import { experience } from '../data/portfolioData';
import './Experience.css';

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const { opacity: sectionOpacity, y: sectionY } = useFadeInOut(sectionRef);
  const yParallax = useTransform(scrollYProgress, [0, 0.3], ['20px', '-20px']);

  return (
    <section id="experience" className="experience section-container" ref={sectionRef}>
      <motion.div className="experience__bg" style={{ y: yParallax }} />
      <motion.div className="experience__bg--2" style={{ y: yParallax }} />

      <div className="container">
        <motion.div className="experience__container" style={{ opacity: sectionOpacity, y: sectionY }}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-title__accent">03.</span> Experience
          </motion.h2>

          <div className="experience__timeline">
            {experience.map((job, index) => (
              <motion.article
                key={job.company}
                className="experience__item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="experience__line" />
                <div className="experience__dot" />
                <div className="experience__card">
                  <div className="experience__header">
                    <div className="experience__icon">
                      <HiBriefcase size={24} />
                    </div>
                    <div>
                      <h3 className="experience__role">{job.role}</h3>
                      <p className="experience__company">{job.company}</p>
                      <p className="experience__meta">
                        {job.location} · {job.period}
                      </p>
                    </div>
                  </div>
                  <ul className="experience__highlights">
                    {job.highlights.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.15 + i * 0.05 }}
                      >
                        <span className="experience__bullet" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  {job.achievements && (
                    <div className="experience__achievements">
                      <p className="experience__achievements-title">
                        <HiCheckCircle /> Key Achievements
                      </p>
                      <ul>
                        {job.achievements.map((item, i) => (
                          <li key={i}>
                            <span className="experience__bullet experience__bullet--accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
