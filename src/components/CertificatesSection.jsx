import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CERTIFICATES } from '../data/certificates.js'
import './CertificatesSection.css'

export default function CertificatesSection() {
  const [activeCertificate, setActiveCertificate] = useState(null)
  const canUsePortal = typeof document !== 'undefined'

  useEffect(() => {
    if (!activeCertificate) return
    const handleEscape = (event) => {
      if (event.key === 'Escape') setActiveCertificate(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeCertificate])

  const openCertificate = (item) => {
    if (!item.href) return
    setActiveCertificate(item)
  }

  return (
    <div className="certificates-section">
      <div className="certificates-section__head">
        <p className="certificates-section__eyebrow">Credentials</p>
        <h2 id="certificates-heading" className="certificates-section__title">
          <span className="certificates-section__title-accent">Certificates</span> & training
        </h2>
        <p className="certificates-section__lead">
          Courses, exams, and badges worth highlighting—replace with your real certificates and
          verification links.
        </p>
      </div>
      <ul className="certificates-grid">
        {CERTIFICATES.map((item) => (
          <li key={`${item.title}-${item.issuer}`} className="certificates-card">
            <h3 className="certificates-card__title">{item.title}</h3>
            <p className="certificates-card__meta">
              <span className="certificates-card__issuer">{item.issuer}</span>
              <span className="certificates-card__date" aria-label={`Issued ${item.date}`}>
                {item.date}
              </span>
            </p>
            {item.href ? (
              <button
                className="certificates-card__link"
                type="button"
                onClick={() => openCertificate(item)}
              >
                View credential
              </button>
            ) : (
              <span className="certificates-card__soon">Link coming soon</span>
            )}
          </li>
        ))}
      </ul>

      {activeCertificate && canUsePortal
        ? createPortal(
            <div
              className="certificates-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-modal-title"
              onClick={() => setActiveCertificate(null)}
            >
              <div
                className="certificates-modal__panel"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="certificates-modal__head">
                  <h3 id="certificate-modal-title" className="certificates-modal__title">
                    {activeCertificate.title}
                  </h3>
                  <button
                    type="button"
                    className="certificates-modal__close"
                    onClick={() => setActiveCertificate(null)}
                    aria-label="Close certificate preview"
                  >
                    ×
                  </button>
                </div>
                <iframe
                  className="certificates-modal__frame"
                  src={activeCertificate.href}
                  title={`${activeCertificate.title} certificate`}
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
