import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  SiReact, SiPython, SiPostgresql, SiDocker, SiGithub,
} from 'react-icons/si';
import { HiLightningBolt, HiShieldCheck } from 'react-icons/hi';
import { skills } from '../data/portfolioData';
import './Skills.css';

const skillCategories = [
  { title: 'Frontend', skills: skills.frontend, icon: SiReact, color: '#61dafb' },
  { title: 'Backend & APIs', skills: skills.backend, icon: SiPython, color: '#3776ab' },
  { title: 'Database & Cache', skills: skills.database, icon: SiPostgresql, color: '#336791' },
  { title: 'Auth & Security', skills: skills.auth, icon: HiShieldCheck, color: '#00ea64' },
  { title: 'DevOps & Cloud', skills: skills.devops, icon: SiDocker, color: '#2496ed' },
  { title: 'Tools & Testing', skills: skills.tools, icon: SiGithub, color: '#a855f7' },
  { title: 'Concepts & OS', skills: skills.concepts, icon: HiLightningBolt, color: '#f59e0b' },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 0.4], ['40px', '-40px']);

  return (
    <section id="skills" className="skills section-container" ref={sectionRef}>
      <motion.div className="skills__bg" style={{ y: yParallax }} />
      <motion.div className="skills__bg--2" style={{ y: yParallax }} />

      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-title__accent">02.</span> Skills
        </motion.h2>

        <div className="skills__grid">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              className="skills__card"
              initial={{ opacity: 0, y: 50, rotateX: 12, rotateY: -8 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -10,
                rotateX: -4,
                rotateY: 4,
                boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px ${category.color}30`,
              }}
              style={{ transformPerspective: 700 }}
            >
              {/* Holographic card shimmer */}
              <div className="skills__card-holo" />

              {/* Top color bar */}
              <div
                className="skills__card-bar"
                style={{ background: `linear-gradient(90deg, ${category.color}, ${category.color}40, transparent)` }}
              />

              <div className="skills__card-header">
                <motion.span
                  className="skills__icon"
                  style={{ color: category.color, backgroundColor: `${category.color}15`, borderColor: `${category.color}20` }}
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <category.icon size={22} />
                </motion.span>
                <h3 className="skills__card-title">{category.title}</h3>
              </div>

              <ul className="skills__tags">
                {category.skills.map((skill, j) => (
                  <motion.li
                    key={skill}
                    className="skills__tag"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.08 + j * 0.035 + 0.2, type: 'spring', stiffness: 350 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    style={{ '--tag-color': category.color }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
