import Link from 'next/link';

interface HeroSectionProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    badge?: string;
}

export default function HeroSection({
    title,
    subtitle,
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
    badge
}: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-b-[100%] blur-3xl opacity-60 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 text-center">
                {badge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        {badge}
                    </div>
                )}

                <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {title}
                </h1>

                <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    {subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <Link
                        href={ctaLink}
                        className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-hover hover:shadow-primary/30 hover:-translate-y-1 transition-all w-full sm:w-auto"
                    >
                        {ctaText}
                    </Link>
                    {secondaryCtaText && secondaryCtaLink && (
                        <Link
                            href={secondaryCtaLink}
                            className="px-8 py-4 bg-white text-text-main border border-text-muted/20 font-bold rounded-xl hover:bg-bg-page hover:border-text-muted/40 transition-all w-full sm:w-auto"
                        >
                            {secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
