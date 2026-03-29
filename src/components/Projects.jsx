import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useFadeInOut } from '../hooks/useFadeInOut';
import { HiCode } from 'react-icons/hi';
import { projects } from '../data/portfolioData';
import './Projects.css';

const gradientMap = {
  'from-cyan to-mint': ['#00d4ff', '#00ffc8'],
  'from-purple to-pink': ['#a855f7', '#ec4899'],
  'from-mint to-cyan': ['#00ffc8', '#00d4ff'],
};

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const { opacity: sectionOpacity, y: sectionY } = useFadeInOut(sectionRef);
  const yParallax = useTransform(scrollYProgress, [0, 0.4], ['40px', '-40px']);

  return (
    <section id="projects" className="projects section-container" ref={sectionRef}>
      <motion.div className="projects__bg" style={{ y: yParallax }} />
      <motion.div className="projects__bg--2" style={{ y: yParallax }} />

      <div className="container">
        <motion.div className="projects__container" style={{ opacity: sectionOpacity, y: sectionY }}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-title__accent">04.</span> Projects
          </motion.h2>

          <div className="projects__grid">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="projects__card"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="projects__card-inner">
                  <div
                    className="projects__card-glow"
                    style={{
                      background: `linear-gradient(135deg, ${gradientMap[project.gradient][0]}20, ${gradientMap[project.gradient][1]}10)`,
                    }}
                  />
                  <div className="projects__card-header">
                    <span className="projects__card-icon">
                      <HiCode size={30} />
                    </span>
                    <h3 className="projects__card-title">{project.title}</h3>
                    <p className="projects__card-role">{project.role}</p>
                  </div>
                  <p className="projects__card-desc">{project.description}</p>
                  <ul className="projects__tech">
                    {project.tech.map((tech, i) => (
                      <motion.li
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.05, color: 'var(--accent-cyan)' }}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                  {/* <div className="projects__card-overlay">
                    <motion.a
                      href={project.link || '#'}
                      className="projects__card-link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        pointerEvents: project.link ? 'auto' : 'none',
                        opacity: project.link ? 1 : 0.6,
                      }}
                      onClick={(e) => !project.link && e.preventDefault()}
                    >
                      <HiExternalLink size={22} />
                      {project.link ? 'View Project' : 'Coming Soon'}
                    </motion.a>
                  </div> */}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
