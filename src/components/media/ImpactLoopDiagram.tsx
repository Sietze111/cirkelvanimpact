import { method } from 'content/method'

export default function ImpactLoopDiagram() {
  return (
    <svg
      viewBox="0 0 460 460"
      role="img"
      aria-label="De impactloop: één echte opgave, stap voor stap"
      className="h-auto w-full"
    >
      <title>De impactloop</title>
      <desc>
        Een loop rond één echte opgave met de vragen wat zien we, wat betekent
        dat en welke keuze vraagt dit.
      </desc>

      <circle cx="230" cy="230" r="184" fill="#F8F2E8" />
      <circle
        cx="230"
        cy="230"
        r="146"
        fill="none"
        stroke="#C94524"
        strokeWidth="2"
        strokeDasharray="10 12"
        opacity="0.55"
      />

      <circle cx="230" cy="230" r="88" fill="#0F3B3B" />
      <text
        x="230"
        y="224"
        textAnchor="middle"
        fontSize="18"
        fontWeight="600"
        fill="#FDFBF7"
        fontFamily="Fraunces Variable, Georgia, serif"
      >
        Eén echte
      </text>
      <text
        x="230"
        y="248"
        textAnchor="middle"
        fontSize="18"
        fontWeight="600"
        fill="#FDFBF7"
        fontFamily="Fraunces Variable, Georgia, serif"
      >
        opgave
      </text>

      <g
        fontFamily="Inter Variable, system-ui, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        <rect
          x="130"
          y="38"
          width="200"
          height="34"
          rx="17"
          fill="#FDFBF7"
          stroke="#DCC9AE"
        />
        <text x="230" y="60" textAnchor="middle" fill="#1C2421">
          {method.loop.labels[0]}
        </text>

        <rect
          x="252"
          y="316"
          width="200"
          height="34"
          rx="17"
          fill="#FDFBF7"
          stroke="#DCC9AE"
        />
        <text x="352" y="338" textAnchor="middle" fill="#1C2421">
          {method.loop.labels[1]}
        </text>

        <rect
          x="8"
          y="316"
          width="200"
          height="34"
          rx="17"
          fill="#FDFBF7"
          stroke="#DCC9AE"
        />
        <text x="108" y="338" textAnchor="middle" fill="#1C2421">
          {method.loop.labels[2]}
        </text>
      </g>

      <g fill="#C94524">
        <path d="M372 196l18 22-26 8z" />
        <path d="M88 196l-18 22 26 8z" />
      </g>
    </svg>
  )
}
