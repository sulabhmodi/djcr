const ITEMS = [
    "अहिंसा · Ahimsa — Non-Violence",
    "अनेकान्तवाद · Anekantavada — Many-Sided Truth",
    "अपरिग्रह · Aparigraha — Non-Attachment",
    "Jin Mandir",
    "Swadhyay",
    "Pathshala",
    "Community",
    "Raleigh · Cary · Morrisville · Durham · Chapel Hill · RTP",
];

export default function Marquee() {
    return (
        <div
            data-testid="editorial-marquee"
            className="relative overflow-hidden bg-[#6F1D1B] border-y border-[#C99A30]/30 py-4"
            aria-hidden="true"
        >
            <div className="animate-marquee flex w-max whitespace-nowrap">
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex items-center">
                        {ITEMS.map((item, i) => (
                            <span key={`${copy}-${i}`} className="flex items-center">
                                <span className="font-display italic text-lg text-[#FFF9ED]/85 px-6">
                                    {item}
                                </span>
                                <span className="text-[#C99A30] text-xs">✦</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
