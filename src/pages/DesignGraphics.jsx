import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { BRAND_WORDMARK } from '../constants/brand.js'
import { GRAPHICS_DESIGNS } from '../data/graphicsDesigns.js'
import './Home.css'
import './DesignGraphics.css'

export default function DesignGraphics() {
  const ITEMS_PER_PAGE = 12
  const [activeDesign, setActiveDesign] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const canUsePortal = typeof document !== 'undefined'
  const totalPages = Math.max(1, Math.ceil(GRAPHICS_DESIGNS.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleDesigns = GRAPHICS_DESIGNS.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    if (!activeDesign) return
    const handleEscape = (event) => {
      if (event.key === 'Escape') setActiveDesign(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeDesign])

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  return (
    <div className="home design-graphics-layout">
      <div className="design-graphics-layout__top">
        <SiteHeader />
        <main className="design-graphics-page" id="designs">
          <div className="design-graphics-page__head">
            <p className="design-graphics-page__eyebrow">Creative work</p>
            <h1 className="design-graphics-page__title">
              <span className="design-graphics-page__title-accent">Design</span> & graphics
            </h1>
            <p className="design-graphics-page__lead">
              A collection of my graphic design projects and visual works.
            </p>
            <Link className="design-graphics-page__back" to="/">
              ← Back to home
            </Link>
          </div>

          {GRAPHICS_DESIGNS.length ? (
            <>
              <ul className="designs-grid">
                {visibleDesigns.map((item) => (
                  <li key={item.title} className="designs-card">
                    <button
                      type="button"
                      className="designs-card__media"
                      onClick={() => setActiveDesign(item)}
                      aria-label={`Open ${item.title} fullscreen`}
                    >
                      <img className="designs-card__image" src={item.src} alt={item.title} loading="lazy" />
                    </button>
                    <h2 className="designs-card__title">{item.title}</h2>
                  </li>
                ))}
              </ul>

              {totalPages > 1 ? (
                <nav className="designs-pagination" aria-label="Design gallery pages">
                  <button
                    type="button"
                    className="designs-pagination__btn"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="designs-pagination__status">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    className="designs-pagination__btn"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </nav>
              ) : null}
            </>
          ) : (
            <div className="designs-empty">
              No design files found yet. Add JPG, PNG, or WEBP files in
              <code>src/assets/designs</code>.
            </div>
          )}
        </main>
      </div>

      <div className="home__footer-bleed">
        <SiteFooter wordmark={BRAND_WORDMARK} />
      </div>

      {activeDesign && canUsePortal
        ? createPortal(
            <div
              className="designs-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="designs-modal-title"
              onClick={() => setActiveDesign(null)}
            >
              <div className="designs-modal__panel" onClick={(event) => event.stopPropagation()}>
                <div className="designs-modal__head">
                  <h3 id="designs-modal-title" className="designs-modal__title">
                    {activeDesign.title}
                  </h3>
                  <button
                    type="button"
                    className="designs-modal__close"
                    onClick={() => setActiveDesign(null)}
                    aria-label="Close fullscreen image"
                  >
                    ×
                  </button>
                </div>
                <img className="designs-modal__image" src={activeDesign.src} alt={activeDesign.title} />
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
