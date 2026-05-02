import './HeroShaderBackground.css'

/**
 * WebGL gradient via iframe (gradientshader-nine.vercel.app). Requires network at runtime.
 */
export default function HeroShaderBackground() {
  return (
    <div className="hero-shader" aria-hidden="true">
      <iframe
        className="hero-shader__iframe"
        src="https://gradientshader-nine.vercel.app/"
        title="Animated gradient background"
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-popups-to-escape-sandbox"
      />
      <div className="hero-shader__blur-stack">
        <span className="hero-shader__band hero-shader__band--1" />
        <span className="hero-shader__band hero-shader__band--2" />
        <span className="hero-shader__band hero-shader__band--3" />
        <span className="hero-shader__band hero-shader__band--4" />
        <span className="hero-shader__band hero-shader__band--5" />
        <span className="hero-shader__band hero-shader__band--6" />
        <span className="hero-shader__band hero-shader__band--7" />
        <span className="hero-shader__band hero-shader__band--8" />
      </div>
      <div className="hero-shader__scrim" />
    </div>
  )
}
