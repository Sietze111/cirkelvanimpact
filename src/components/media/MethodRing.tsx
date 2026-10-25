import { method } from 'content/method'

const cx = 280
const cy = 280
const nodeRadius = 178
const labelRadius = 228

function polar(radius: number, index: number) {
  const angle = ((-90 + index * 60) * Math.PI) / 180
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
    cos: Math.cos(angle)
  }
}

export default function MethodRing() {
  return (
    <svg
      viewBox="0 0 560 560"
      role="img"
      aria-label="De Cirkel van Impact: zes stappen rondom beslissen als as"
      className="h-auto w-full"
    >
      <title>De Cirkel van Impact</title>
      <desc>
        Zes stappen rondom de as Beslissen: positioneren, vertalen, organiseren,
        realiseren, monitoren en ontwikkelen.
      </desc>

      <circle cx={cx} cy={cy} r="214" fill="#F8F2E8" opacity="0.55" />
      <circle
        cx={cx}
        cy={cy}
        r="214"
        fill="none"
        stroke="#DCC9AE"
        strokeWidth="1"
      />
      <circle
        cx={cx}
        cy={cy}
        r="124"
        fill="none"
        stroke="#DCC9AE"
        strokeDasharray="4 8"
        strokeWidth="1"
      />

      <line
        x1={cx}
        y1="78"
        x2={cx}
        y2="482"
        stroke="#C94524"
        strokeDasharray="3 9"
        strokeWidth="1"
        opacity="0.45"
      />

      {method.ring.steps.map((step, index) => {
        const node = polar(nodeRadius, index)
        const label = polar(labelRadius, index)
        const anchor =
          label.cos > 0.35 ? 'start' : label.cos < -0.35 ? 'end' : 'middle'
        const labelX =
          anchor === 'start'
            ? label.x + 6
            : anchor === 'end'
              ? label.x - 6
              : label.x

        return (
          <g key={step.name}>
            <circle
              cx={node.x}
              cy={node.y}
              r="27"
              fill="#FDFBF7"
              stroke="#C94524"
              strokeWidth="1.5"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="600"
              fill="#1C2421"
              fontFamily="Inter Variable, system-ui, sans-serif"
            >
              {index + 1}
            </text>
            <text
              x={labelX}
              y={label.y + 4}
              textAnchor={anchor}
              fontSize="14"
              fontWeight="600"
              fill="#1C2421"
              fontFamily="Inter Variable, system-ui, sans-serif"
            >
              {step.name}
            </text>
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r="66" fill="#0F3B3B" />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill="#FDFBF7"
        fontFamily="Fraunces Variable, Georgia, serif"
      >
        Beslissen
      </text>
      <text
        x={cx}
        y={cy + 17}
        textAnchor="middle"
        fontSize="11"
        fill="#FDFBF7"
        opacity="0.75"
        fontFamily="Inter Variable, system-ui, sans-serif"
      >
        de as
      </text>
    </svg>
  )
}
