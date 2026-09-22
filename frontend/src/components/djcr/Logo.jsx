const LogoMark = ({ size = 44 }) => (
    <svg
        viewBox="0 0 96 96"
        width={size}
        height={size}
        aria-hidden="true"
        data-testid="djcr-logo-mark"
    >
        <circle cx="48" cy="48" r="45" fill="none" stroke="#C99A30" strokeWidth="1.5" />
        <circle cx="48" cy="48" r="41" fill="none" stroke="#6F1D1B" strokeWidth="0.75" opacity="0.45" />
        <circle cx="48" cy="14.5" r="2.4" fill="#E87524" />
        <path d="M48 17.5 L48 20" stroke="#C99A30" strokeWidth="1.2" />
        <path
            d="M48 20 C45.5 27.5 42 36.5 38.5 46 C35 55.5 31.8 63.5 29.8 70.5 L66.2 70.5 C64.2 63.5 61 55.5 57.5 46 C54 36.5 50.5 27.5 48 20 Z"
            fill="#6F1D1B"
        />
        <path d="M43.6 30 Q48 32.4 52.4 30" fill="none" stroke="#C99A30" strokeWidth="0.9" />
        <path d="M41.2 38 Q48 40.8 54.8 38" fill="none" stroke="#C99A30" strokeWidth="0.9" />
        <path d="M38.7 46 Q48 49.2 57.3 46" fill="none" stroke="#C99A30" strokeWidth="0.9" />
        <path d="M36 54 Q48 57.6 60 54" fill="none" stroke="#C99A30" strokeWidth="0.9" />
        <path d="M33.2 62 Q48 66 62.8 62" fill="none" stroke="#C99A30" strokeWidth="0.9" />
        <path d="M24.5 70.5 a4 4 0 0 1 8 0 Z" fill="#6F1D1B" />
        <path d="M63.5 70.5 a4 4 0 0 1 8 0 Z" fill="#6F1D1B" />
        <rect x="25" y="70.5" width="46" height="3" rx="1" fill="#6F1D1B" />
        <rect x="21.5" y="74.5" width="53" height="2.6" rx="1" fill="#6F1D1B" />
        <g transform="translate(17 79) rotate(-38)">
            <path d="M0 0 C 2.6 -3, 6.4 -3.4, 9.4 -1.1 C 6.8 1.6, 2.6 1.8, 0 0 Z" fill="#C99A30" />
            <path d="M0.7 -0.4 L8.4 -1" stroke="#6F1D1B" strokeWidth="0.55" />
        </g>
        <g transform="translate(79 79) scale(-1 1) rotate(-38)">
            <path d="M0 0 C 2.6 -3, 6.4 -3.4, 9.4 -1.1 C 6.8 1.6, 2.6 1.8, 0 0 Z" fill="#C99A30" />
            <path d="M0.7 -0.4 L8.4 -1" stroke="#6F1D1B" strokeWidth="0.55" />
        </g>
    </svg>
);

export default function Logo({ dark = false }) {
    return (
        <a
            href="#temple"
            data-testid="logo-link"
            className="flex items-center gap-3 group"
            aria-label="Digambar Jain Center of Raleigh"
        >
            <LogoMark />
            <span className="flex flex-col leading-none">
                <span
                    className={`font-display text-xl font-semibold tracking-wide ${
                        dark ? "text-[#FFF9ED]" : "text-[#6F1D1B]"
                    }`}
                >
                    DJCR
                </span>
                <span
                    className={`text-[10px] uppercase tracking-[0.18em] mt-1 ${
                        dark ? "text-[#C99A30]" : "text-[#292929]/60"
                    }`}
                >
                    Digambar Jain Center of Raleigh
                </span>
            </span>
        </a>
    );
}
