export default function PlayIcon({ size = 18 }) {
  return (
    <svg
      className="play-ic"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 8.6l4 2.9-4 2.9V8.6z" fill="currentColor" />
      <path d="M8 20.5h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
