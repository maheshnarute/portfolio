import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useFadeInOut } from '../hooks/useFadeInOut';
import {
  SiReact,
  SiPython,
  SiPostgresql,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { skills } from '../data/portfolioData';
import './Skills.css';

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
  const { opacity, y } = useFadeInOut(sectionRef);
  const yParallax = useTransform(scrollYProgress, [0, 0.4], ['30px', '-30px']);

  return (
    <section id="skills" className="skills section-container" ref={sectionRef}>
      <motion.div className="skills__bg" style={{ y: yParallax }} />

      <div className="container">
        <motion.div className="skills__container" style={{ opacity, y }}>
          <h2 className="section-title">
            <span className="section-title__accent">02.</span> Skills
          </h2>

          <div className="skills__grid">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.title}
                className="skills__card"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="skills__card-header">
                  {category.icon && <category.icon size={28} />}
                  <h3>{category.title}</h3>
                </div>

                <ul>
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
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
