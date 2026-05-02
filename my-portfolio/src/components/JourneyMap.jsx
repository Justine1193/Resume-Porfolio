import './JourneyMap.css'

/** Edit titles and copy for your story */
export const JOURNEY_STEPS = [
  {
    title: 'Raised on a PC',
    text: 'I grew up glued to a computer—games, tinkering, and “how does this even work?” That curiosity is what pulled me toward IT when college came around.',
  },
  {
    title: 'IT in college',
    text: 'I took IT courses to back up the hobby with real fundamentals: systems, how networks behave, and the habits to learn properly—not just guess.',
  },
  {
    title: 'Building core skills',
    text: 'I started building a broader skill set in web development, networking, computer troubleshooting, and graphic design—learning how each area connects in real projects.',
  },
  {
    title: 'Made it mine',
    text: 'I turned that mix of play and class into skills I actually own—building, fixing, and designing instead of only watching from the sidelines.',
  },
  {
    title: 'Still leveling up',
    text: 'I’m still stacking new skills and sharpening what I know—using AI thoughtfully for research, drafts, and quick experiments—while staying hands-on with the fundamentals so I can keep pace with the web, not chase it from behind.',
  },
]

export default function JourneyMap() {
  return (
    <div className="jm">
      <div className="jm__head">
        <p className="jm__eyebrow">Path so far</p>
        <h2 id="journey-heading" className="jm__title">
          My <span className="jm__title-accent">journey</span>
        </h2>
        <p className="jm__intro">
          From a kid on a keyboard to IT in school to the skills I use today—here&apos;s the
          short version of how I got here.
        </p>
      </div>
      <ol className="jm__track" aria-labelledby="journey-heading">
        {JOURNEY_STEPS.map((step, index) => (
          <li key={step.title} className="jm__step">
            <div className="jm__step-mark">
              <span className="jm__step-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="jm__step-dot" aria-hidden="true" />
            </div>
            <div className="jm__step-body">
              <h3 className="jm__step-title">{step.title}</h3>
              <p className="jm__step-text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
