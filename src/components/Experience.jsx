import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { HiBriefcase, HiCheckCircle } from 'react-icons/hi';
import { experience } from '../data/portfolioData';
import './Experience.css';

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 0.3], ['30px', '-30px']);

  // SVG line draw progress tied to scroll
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);

  return (
    <section id="experience" className="experience section-container" ref={sectionRef}>
      <motion.div className="experience__bg" style={{ y: yParallax }} />

      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-title__accent">03.</span> Experience
        </motion.h2>

        <div className="experience__timeline">
          {/* Self-drawing SVG vertical line */}
          <svg className="experience__svg-line" viewBox="0 0 4 600" preserveAspectRatio="none">
            <motion.line
              x1="2" y1="0" x2="2" y2="600"
              stroke="url(#timelineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: lineProgress }}
            />
            <defs>
              <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#00ffc8" />
              </linearGradient>
            </defs>
          </svg>

          {experience.map((job, index) => (
            <motion.article
              key={job.company}
              className="experience__item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Animated pulse dot */}
              <motion.div
                className="experience__dot"
                animate={isInView ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />

              {/* Glassmorphic card */}
              <motion.div
                className="experience__card glass"
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.2)' }}
              >
                {/* Color accent bar */}
                <div className={`experience__card-bar experience__card-bar--${index % 2 === 0 ? 'cyan' : 'purple'}`} />

                <div className="experience__header">
                  <motion.div
                    className="experience__icon"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <HiBriefcase size={22} />
                  </motion.div>
                  <div>
                    <h3 className="experience__role">{job.role}</h3>
                    <p className="experience__company">{job.company}</p>
                    <p className="experience__meta">{job.location} · {job.period}</p>
                  </div>
                </div>

                <ul className="experience__highlights">
                  {job.highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.18 + i * 0.06 + 0.2 }}
                    >
                      <span className="experience__bullet" />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {job.achievements && (
                  <div className="experience__achievements">
                    <p className="experience__achievements-title">
                      <motion.span
                        whileHover={{ rotate: 10 }}
                        style={{ display: 'inline-block' }}
                      >
                        <HiCheckCircle />
                      </motion.span>
                      Key Achievements
                    </p>
                    <ul>
                      {job.achievements.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.18 + i * 0.08 + 0.4 }}
                        >
                          <span className="experience__bullet experience__bullet--accent" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
