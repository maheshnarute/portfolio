import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { HiAcademicCap, HiLightningBolt } from 'react-icons/hi';
import { summary, education, softSkills } from '../data/portfolioData';
import './About.css';

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const step = duration / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience', icon: '🚀' },
  { value: 2, suffix: '', label: 'Companies', icon: '🏢' },
  { value: 10, suffix: '+', label: 'Projects Built', icon: '⚡' },
  { value: 7, suffix: '+', label: 'Tech Stacks', icon: '💡' },
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 0.3], ['30px', '-30px']);
  const yDoodle   = useTransform(scrollYProgress, [0, 1], ['-10px', '30px']);

  return (
    <section id="about" className="about section-container" ref={sectionRef}>
      <motion.div className="about__bg" style={{ y: yParallax }} />

      {/* Doodle wave decoration */}
      <motion.svg className="about__doodle" style={{ y: yDoodle }} viewBox="0 0 200 80" fill="none">
        <motion.path
          d="M10 40 Q50 10 100 40 Q150 70 190 40"
          stroke="rgba(0,212,255,0.2)"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="200"
          strokeLinecap="round"
          animate={isInView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        />
        <motion.circle cx="10" cy="40" r="4" fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5"
          initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.5 }} />
        <motion.circle cx="190" cy="40" r="4" fill="none" stroke="rgba(0,255,200,0.4)" strokeWidth="1.5"
          initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 0.4, delay: 2.0 }} />
      </motion.svg>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">
            <span className="section-title__accent">01.</span> About Me
          </h2>

          {/* Animated stats row */}
          <div className="about__stats">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="about__stat"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <span className="about__stat-icon">{s.icon}</span>
                <span className="about__stat-value">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </span>
                <span className="about__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="about__grid">
            {/* Text + soft skills */}
            <motion.div
              className="about__content"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="about__text">{summary}</p>
              <p className="about__text about__text--muted" style={{ marginTop: '1rem' }}>
                Passionate about creating efficient, maintainable solutions. I enjoy mentoring junior
                developers and collaborating in Agile teams. When not coding — gym, cricket, or football.
              </p>

              {/* Soft skills chips */}
              <div className="about__soft-title">
                <HiLightningBolt style={{ color: 'var(--accent-mint)' }} />
                Soft Skills
              </div>
              <div className="about__soft-chips">
                {softSkills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="about__soft-chip"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.06 + 0.5, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Claymorphic Education Card */}
            <motion.div
              className="about__card claymorphic"
              initial={{ opacity: 0, x: 40, rotateY: 10 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -8,
                rotateX: 3,
                rotateY: -3,
                boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
              style={{ transformPerspective: 800 }}
            >
              <div className="about__card-bar" />
              <div className="about__card-holo" />

              <motion.div
                className="about__card-icon-wrap"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <HiAcademicCap size={28} />
              </motion.div>

              <h3 className="about__card-title">Education</h3>
              <p className="about__card-degree">{education.degree}</p>
              <p className="about__card-institution">{education.institution}</p>
              <p className="about__card-university">{education.university}</p>
              <p className="about__card-year">
                Graduated {education.year}
                {' · '}
                <span className="about__card-pct">{education.percentage}</span>
              </p>

              {/* Star rating visual */}
              <div className="about__card-stars">
                {[1,2,3,4,5].map((s) => (
                  <motion.span
                    key={s}
                    className={`about__star ${s <= 4 ? 'active' : 'half'}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: s * 0.08 + 0.8, type: 'spring' }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
