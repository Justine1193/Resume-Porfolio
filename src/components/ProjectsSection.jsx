import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects.js'
import '../pages/Projects.css'

export default function ProjectsSection() {
  return (
    <div className="projects-page">
      <div className="projects-page__head">
        <p className="projects-page__eyebrow">Selected work</p>
        <h2 id="projects-heading" className="projects-page__title">
          <span className="projects-page__title-accent">Projects</span> & builds
        </h2>
        <p className="projects-page__lead">
          A collection of projects that reflect my growth in web development, from academic
          requirements to hands-on personal builds.
        </p>
      </div>
      <ul className="projects-grid">
        {PROJECTS.map((project) => (
          <li key={project.title} className="projects-card">
            <h3 className="projects-card__title">{project.title}</h3>
            <p className="projects-card__text">{project.description}</p>
            <ul className="projects-card__tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {project.href?.startsWith('/') ? (
              <Link className="projects-card__link" to={project.href}>
                View project
              </Link>
            ) : project.href ? (
              <a
                className="projects-card__link"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View project
              </a>
            ) : (
              <span className="projects-card__soon">Link coming soon</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
