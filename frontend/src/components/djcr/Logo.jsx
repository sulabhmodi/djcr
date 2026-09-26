const LogoMark = ({ size = 44 }) => (
    <svg
        viewBox="0 0 600 600"
        width={size}
        height={size}
        aria-hidden="true"
        data-testid="djcr-logo-mark"
    >
        <circle cx="300" cy="300" r="285" fill="#FFF9ED" stroke="#C99A30" strokeWidth="14" />
        <circle cx="300" cy="300" r="262" fill="none" stroke="#6F1D1B" strokeWidth="6" opacity="0.5" />
        <g fill="#E87524" opacity="0.9">
            {[15, 60, 105, 150, 195, 240, 285, 330].map((a) => (
                <path
                    key={a}
                    d="M300 288 C 287 234 289 176 300 128 C 311 176 313 234 300 288 Z"
                    transform={`rotate(${a} 300 300)`}
                />
            ))}
        </g>
        <circle cx="300" cy="300" r="140" fill="#FFF9ED" opacity="0.85" />
        <g stroke="#6F1D1B" strokeWidth="30" strokeLinecap="round" fill="none">
            <path d="M 232 352 C 232 402 300 408 312 366 C 321 334 303 318 278 320" />
            <path d="M 224 296 L 352 296" />
            <path d="M 320 296 C 320 262 318 240 324 216 C 329 196 344 188 356 196 C 366 203 364 218 352 222" />
        </g>
        <circle cx="352" cy="162" r="16" fill="#E87524" />
    </svg>
);

export default function Logo({ dark = false }) {
    return (
        <a
            href="/#temple"
            data-testid="logo-link"
            className="flex items-center gap-3 group"
            aria-label="Digambar Jain Center of Raleigh"
        >
            <LogoMark />
            <span className="flex flex-col leading-tight">
                <span className="text-[9px] uppercase tracking-[0.34em] text-[#C99A30]">DJCR</span>
                <span
                    className={`font-display text-[15px] sm:text-lg font-semibold ${
                        dark ? "text-[#FFF9ED]" : "text-[#6F1D1B]"
                    }`}
                >
                    Digambar Jain Center of Raleigh
                </span>
            </span>
        </a>
    );
}
