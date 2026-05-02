import { Link } from 'react-router-dom'
import './SiteHeader.css'

export default function SiteHeader() {
  return (
    <header className="home__header">
      <div className="home__header-inner">
        <Link className="home__brand" to="/">
          <span className="home__brand-dot" aria-hidden="true" />
          Portfolio
        </Link>
        <nav className="home__nav" aria-label="Primary">
          <Link to="/#about">About</Link>
          <Link to="/#journey">Journey</Link>
          <Link to="/#projects">Projects</Link>
          <Link to="/#certificates">Certificates</Link>
          <Link to="/#social">Social</Link>
        </nav>
      </div>
    </header>
  )
}
