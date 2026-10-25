export default function HourglassDiagram() {
  return (
    <svg
      viewBox="0 0 420 360"
      role="img"
      aria-label="De zandloper: eerst waarnemen, dan duiden, dan kiezen"
      className="h-auto w-full"
    >
      <title>De zandloper</title>
      <desc>
        Eerst zien, dan duiden, dan kiezen. De zandloper helpt om waarneming,
        betekenis en keuze uit elkaar te houden.
      </desc>

      <rect x="30" y="20" width="360" height="320" rx="28" fill="#F8F2E8" />

      <path
        d="M120 74h180l-82 92v28l82 92H120l82-92v-28z"
        fill="#FDFBF7"
        stroke="#DCC9AE"
      />
      <path d="M142 88h136l-68 74z" fill="#E4572E" opacity="0.88" />
      <path d="M210 206l68 74H142z" fill="#17504F" opacity="0.88" />

      <text
        x="210"
        y="56"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#C94524"
        fontFamily="Inter Variable, system-ui, sans-serif"
      >
        WAT ZIEN WE?
      </text>
      <text
        x="210"
        y="183"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#66706A"
        fontFamily="Inter Variable, system-ui, sans-serif"
      >
        WAT BETEKENT DAT?
      </text>
      <text
        x="210"
        y="316"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#17504F"
        fontFamily="Inter Variable, system-ui, sans-serif"
      >
        WELKE KEUZE VRAAGT DIT?
      </text>
    </svg>
  )
}
