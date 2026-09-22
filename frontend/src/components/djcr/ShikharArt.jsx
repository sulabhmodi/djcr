export default function ShikharArt({ className = "" }) {
    return (
        <svg
            viewBox="0 0 800 520"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={className}
            aria-hidden="true"
            data-testid="shikhar-line-art"
        >
            <circle cx="400" cy="26" r="6" />
            <path d="M400 32 L400 44" />
            <path d="M384 62 Q400 52 416 62 Q400 72 384 62 Z" />
            <path d="M400 44 C388 100 368 170 350 240 C334 302 320 356 312 414 L488 414 C480 356 466 302 450 240 C432 170 412 100 400 44" />
            <path d="M372 130 Q400 140 428 130" />
            <path d="M358 190 Q400 202 442 190" />
            <path d="M344 250 Q400 264 456 250" />
            <path d="M332 310 Q400 326 468 310" />
            <path d="M322 366 Q400 384 478 366" />
            <circle cx="200" cy="242" r="4" />
            <path d="M200 250 C192 285 180 320 172 356 C166 384 162 400 160 414 L240 414 C238 400 234 384 228 356 C220 320 208 285 200 250" />
            <path d="M184 330 Q200 338 216 330" />
            <circle cx="600" cy="242" r="4" />
            <path d="M600 250 C592 285 580 320 572 356 C566 384 562 400 560 414 L640 414 C638 400 634 384 628 356 C620 320 608 285 600 250" />
            <path d="M584 330 Q600 338 616 330" />
            <path d="M92 414 v-20 a18 18 0 0 1 36 0 v20" />
            <path d="M672 414 v-20 a18 18 0 0 1 36 0 v20" />
            <path d="M270 414 H530 V436 H270 Z" />
            <path d="M250 436 H550 V452 H250 Z" />
            <path d="M232 452 H568 V468 H232 Z" />
            <path d="M60 468 H740" strokeDasharray="1 8" />
        </svg>
    );
}
