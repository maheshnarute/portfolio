import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useFadeInOut } from '../hooks/useFadeInOut';
import {
  SiReact,
  SiRedux,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { skills } from '../data/portfolioData';
import './Skills.css';

const iconMap = {
  'React.js': SiReact,
  Redux: SiRedux,
  Python: SiPython,
  Django: SiDjango,
  'Django REST Framework': SiDjango,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  'JavaScript (ES6+)': SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  Git: SiGit,
  GitHub: SiGithub,
};

const skillCategories = [
  { title: 'Frontend', skills: skills.frontend, icon: SiReact },
  { title: 'Backend', skills: skills.backend, icon: SiPython },
  { title: 'Database', skills: skills.database, icon: SiPostgresql },
  { title: 'Tools & APIs', skills: skills.tools, icon: SiGit },
  { title: 'DevOps', skills: skills.devops, icon: SiGithub },
  { title: 'Concepts', skills: skills.concepts, icon: null },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const { opacity: sectionOpacity, y: sectionY } = useFadeInOut(sectionRef);
  const yParallax = useTransform(scrollYProgress, [0, 0.4], ['30px', '-30px']);

  return (
    <section id="skills" className="skills section-container" ref={sectionRef}>
      <motion.div className="skills__bg" style={{ y: yParallax }} />

      <div className="container">
        <motion.div className="skills__container" style={{ opacity: sectionOpacity, y: sectionY }}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-title__accent">02.</span> Skills
          </motion.h2>

          <div className="skills__grid">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                className="skills__card"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(0, 212, 255, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div className="skills__card-header">
                  {category.icon && (
                    <motion.span
                      className="skills__card-icon"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <category.icon size={28} />
                    </motion.span>
                  )}
                  <h3 className="skills__card-title">{category.title}</h3>
                </div>
                <ul className="skills__list">
                  {category.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      className="skills__item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: catIndex * 0.1 + i * 0.03 }}
                      whileHover={{ x: 4, color: 'var(--accent-cyan)' }}
                    >
                      <span className="skills__bullet" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
