import './WavingGlow.css'

export default function WavingGlow({ wordmark = 'Jasuki' }) {
  return (
    <section className="wave" aria-labelledby="wave-heading">
      <div className="wave__stage">
        <div className="wave__blobs" aria-hidden="true">
          <div className="wave__blob wave__blob--1" />
          <div className="wave__blob wave__blob--2" />
          <div className="wave__blob wave__blob--3" />
          <div className="wave__blob wave__blob--4" />
          <div className="wave__blob wave__blob--5" />
        </div>
        <div className="wave__grain" aria-hidden="true" />
        <div className="wave__vignette" aria-hidden="true" />
        <h2 id="wave-heading" className="wave__word">
          {wordmark}
        </h2>
      </div>
    </section>
  )
}
