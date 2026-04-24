type Props = { size?: number };

export function Logo({ size = 72 }: Props) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 120 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rewire logo"
    >
      <defs>
        <linearGradient
          id="rw-grad"
          x1="0"
          y1="0"
          x2="120"
          y2="66"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7858FF" />
          <stop offset="1" stopColor="#00D9A3" />
        </linearGradient>
      </defs>
      <path
        d="M33 33c0-12 7-22 18-22s18 10 18 22-7 22-18 22S33 45 33 33zm54 0c0-12 7-22 18-22 6.6 0 12 4.9 12 11s-5.4 11-12 11c-11 0-18 10-18 22"
        stroke="url(#rw-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 33c0-6 5.4-11 12-11 11 0 18 10 18 22"
        stroke="url(#rw-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}