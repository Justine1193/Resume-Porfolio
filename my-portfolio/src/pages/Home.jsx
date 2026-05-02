import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroShaderBackground from '../components/HeroShaderBackground.jsx'
import JourneyMap from '../components/JourneyMap.jsx'
import ProjectsSection from '../components/ProjectsSection.jsx'
import CertificatesSection from '../components/CertificatesSection.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { BRAND_WORDMARK } from '../constants/brand.js'
import heroPortrait from '../assets/AI.png'
import './Home.css'

function getCurrentAge() {
  const birthday = new Date('2003-06-08')
  const today = new Date()
  let age = today.getFullYear() - birthday.getFullYear()
  const monthDiff = today.getMonth() - birthday.getMonth()
  const dayDiff = today.getDate() - birthday.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1
  return age
}

export default function Home() {
  const location = useLocation()
  const currentAge = getCurrentAge()

  useEffect(() => {
    const id = location.hash?.replace(/^#/, '')
    if (!id) return
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = prefersReduced ? 'auto' : 'smooth'
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return (
    <div className="home">
      <div className="home__hero-shell" id="hero">
        <HeroShaderBackground />
        <div className="home__hero-layer">
          <SiteHeader />

          <main className="home__main">
            <section className="home__hero" aria-labelledby="hero-title">
              <div className="home__hero-layout">
                <div className="home__copy">
                  <p className="home__kicker">Creative technologist</p>
                  <h1
                    id="hero-title"
                    className="home__title home__title--roles"
                    aria-label="Full-Stack Web Developer, IT Support, Graphic Designer"
                  >
                    <span className="home__title-gradient">Full-Stack Web Developer</span>
                    <span className="home__title-pipe" aria-hidden="true">
                      {' '}
                      |{' '}
                    </span>
                    IT Support
                    <span className="home__title-pipe" aria-hidden="true">
                      {' '}
                      |{' '}
                    </span>
                    Graphic Designer
                  </h1>
                  <p className="home__lead">
                    From apps and websites to helpdesk support and brand-ready graphics—I work clearly,
                    stay organized, and ship what you need.
                  </p>
                  <div className="home__actions">
                    <a className="home__btn home__btn--primary" href="#projects">
                      View selected work
                    </a>
                    <a className="home__btn home__btn--ghost" href="#social">
                      Let&apos;s talk
                    </a>
                  </div>
                </div>
                <div className="home__hero-photo-wrap">
                  <div className="home__hero-photo-glow" aria-hidden="true" />
                  <div className="home__hero-photo-glass" aria-hidden="true" />
                  <img
                    className="home__hero-photo"
                    src={heroPortrait}
                    alt={`${BRAND_WORDMARK} — portrait`}
                    width={640}
                    height={640}
                    decoding="async"
                  />
                  <div className="home__hero-photo-ring" aria-hidden="true" />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <section className="home__about" id="about" aria-labelledby="about-heading">
        <div className="home__about-inner">
          <h2 id="about-heading" className="home__about-title">
            About
          </h2>
          <p className="home__about-text">
            I&apos;m Justine Rodriguez, a {currentAge}-year-old builder who blends full-stack web
            development, IT support, and graphic design into one workflow. I enjoy turning ideas
            into clean digital experiences, solving technical issues with a calm mindset, and
            creating visuals that are both creative and purposeful.
          </p>
        </div>
      </section>

      <section className="home__journey" id="journey" aria-labelledby="journey-heading">
        <JourneyMap />
      </section>

      <section className="home__projects" id="projects" aria-labelledby="projects-heading">
        <ProjectsSection />
      </section>

      <section
        className="home__certificates"
        id="certificates"
        aria-labelledby="certificates-heading"
      >
        <CertificatesSection />
      </section>

      <div className="home__footer-bleed">
        <SiteFooter wordmark={BRAND_WORDMARK} />
      </div>
    </div>
  )
}
