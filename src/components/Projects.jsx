import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { HiCode } from 'react-icons/hi';
import { projects } from '../data/portfolioData';
import './Projects.css';

const gradientMap = {
  'from-cyan to-mint': ['#00d4ff', '#00ffc8'],
  'from-purple to-pink': ['#a855f7', '#ec4899'],
  'from-mint to-cyan': ['#00ffc8', '#00d4ff'],
};

function ProjectCard({ project, index, isInView }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [c1, c2] = gradientMap[project.gradient] || ['#00d4ff', '#00ffc8'];

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      ref={cardRef}
      className="projects__card"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      whileHover={{ z: 20 }}
    >
      {/* Morphing gradient glow */}
      <div
        className="projects__card-glow"
        style={{ background: `radial-gradient(circle at 50% 0%, ${c1}18, ${c2}10, transparent 70%)` }}
      />

      {/* Animated top bar */}
      <div
        className="projects__card-top"
        style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }}
      />

      <div className="projects__card-inner">
        <div className="projects__card-header">
          {/* Animated icon with self-drawing SVG ring */}
          <div className="projects__icon-wrap" style={{ '--c1': c1, '--c2': c2 }}>
            <svg className="projects__icon-ring" viewBox="0 0 60 60">
              <motion.circle
                cx="30" cy="30" r="26"
                stroke={`url(#iconGrad${index})`}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="163"
                initial={{ strokeDashoffset: 163 }}
                animate={isInView ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 1.2, delay: index * 0.14 + 0.4 }}
              />
              <defs>
                <linearGradient id={`iconGrad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={c1} />
                  <stop offset="100%" stopColor={c2} />
                </linearGradient>
              </defs>
            </svg>
            <HiCode size={22} style={{ color: c1 }} />
          </div>

          <div>
            <h3 className="projects__card-title">{project.title}</h3>
            <p className="projects__card-role">{project.role}</p>
          </div>
        </div>

        <p className="projects__card-desc">{project.description}</p>

        <ul className="projects__tech">
          {project.tech.map((tech, i) => (
            <motion.li
              key={tech}
              className="projects__tech-tag"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.14 + i * 0.05 + 0.3, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{ '--tag-c': c1 }}
            >
              {tech}
            </motion.li>
          ))}
        </ul>

        <div className="projects__card-footer">
          <span className="projects__status">
            {project.link ? '🟢 Live' : '🔵 In Progress'}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 0.4], ['50px', '-50px']);

  return (
    <section id="projects" className="projects section-container" ref={sectionRef}>
      <motion.div className="projects__bg" style={{ y: yParallax }} />
      <motion.div className="projects__bg--2" style={{ y: yParallax }} />

      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-title__accent">04.</span> Projects
        </motion.h2>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
