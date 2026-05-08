import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
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

const CORE_SKILLS = [
  'React & Vite',
  'JavaScript (ES6+)',
  'Node.js & Express',
  'AI Prompt Engineering',
  'AI Assisted Development',
  'Cybersecurity Fundamentals',
  'Firebase (Auth & Firestore)',
  'IT Support & Troubleshooting',
  'Graphic Design & Brand Visuals',
]

export default function Home() {
  const location = useLocation()
  const currentAge = getCurrentAge()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [senderName, setSenderName] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [contactFeedback, setContactFeedback] = useState('')

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

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    setContactFeedback('')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setContactFeedback('Email service is not configured yet. Add your EmailJS keys in .env.')
      return
    }

    const templateParams = {
      from_name: senderName.trim() || 'Portfolio Visitor',
      from_email: senderEmail.trim(),
      subject: emailSubject.trim() || 'Portfolio Inquiry',
      message: emailMessage.trim(),
      to_email: 'rodriguezjustined@gmail.com',
    }

    setIsSendingEmail(true)
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setContactFeedback('Message sent successfully. Thank you!')
        setSenderName('')
        setSenderEmail('')
        setEmailSubject('')
        setEmailMessage('')
        setTimeout(() => {
          setIsContactOpen(false)
          setContactFeedback('')
        }, 1200)
      })
      .catch(() => {
        setContactFeedback('Failed to send. Please try again in a moment.')
      })
      .finally(() => {
        setIsSendingEmail(false)
      })
  }

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
                    <button
                      className="home__btn home__btn--ghost"
                      type="button"
                      onClick={() => setIsContactOpen(true)}
                    >
                      Let&apos;s talk
                    </button>
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
        <div className="home__about-panel">
          <p className="home__about-eyebrow">Profile</p>
          <div className="home__about-grid">
            <div className="home__about-inner">
              <h2 id="about-heading" className="home__about-title">
                About
              </h2>
              <p className="home__about-text">
                I&apos;m Justine Rodriguez, a {currentAge}-year-old builder who combines full-stack
                web development, IT support, and graphic design into one cohesive workflow. I build
                responsive websites and web applications with a strong focus on usability, clean code,
                and reliable performance. Beyond development, I handle technical troubleshooting and
                user support with a calm, solution-oriented mindset to keep systems and people moving
                forward. I also create visual assets that strengthen branding and improve how digital
                products communicate with users. My goal is to deliver work that is functional,
                polished, and meaningful from both the technical and creative side.
              </p>
            </div>

            <aside className="home__skills" aria-labelledby="skills-heading">
              <h3 id="skills-heading" className="home__skills-title">
                Skills
              </h3>
              <p className="home__skills-lead">
                Core competencies and technologies I use to deliver reliable, effective results.
              </p>
              <ul className="home__skills-list">
                {CORE_SKILLS.map((skill) => (
                  <li key={skill} className="home__skills-chip">
                    {skill}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
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

      {isContactOpen ? (
        <div
          className="home__contact-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={() => setIsContactOpen(false)}
        >
          <div className="home__contact-panel" onClick={(event) => event.stopPropagation()}>
            <div className="home__contact-head">
              <h2 id="contact-modal-title" className="home__contact-title">
                Email me
              </h2>
              <button
                type="button"
                className="home__contact-close"
                onClick={() => setIsContactOpen(false)}
                aria-label="Close contact form"
              >
                ×
              </button>
            </div>
            <p className="home__contact-meta">Sending to: rodriguezjustined@gmail.com</p>

            <form className="home__contact-form" onSubmit={handleEmailSubmit}>
              <label className="home__contact-label" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                className="home__contact-input"
                type="text"
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
                placeholder="Your name"
              />

              <label className="home__contact-label" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                className="home__contact-input"
                type="text"
                value={emailSubject}
                onChange={(event) => setEmailSubject(event.target.value)}
                placeholder="Project inquiry"
              />

              <label className="home__contact-label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                className="home__contact-input"
                type="email"
                value={senderEmail}
                onChange={(event) => setSenderEmail(event.target.value)}
                placeholder="yourname@email.com"
                required
              />

              <label className="home__contact-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="home__contact-input home__contact-input--textarea"
                value={emailMessage}
                onChange={(event) => setEmailMessage(event.target.value)}
                placeholder="Hi Justine, I'd like to discuss..."
                required
              />

              {contactFeedback ? <p className="home__contact-feedback">{contactFeedback}</p> : null}

              <div className="home__contact-actions">
                <button
                  type="button"
                  className="home__btn home__btn--ghost"
                  onClick={() => setIsContactOpen(false)}
                  disabled={isSendingEmail}
                >
                  Cancel
                </button>
                <button type="submit" className="home__btn home__btn--primary" disabled={isSendingEmail}>
                  {isSendingEmail ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
