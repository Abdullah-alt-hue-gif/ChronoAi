import HeroSection from '@/components/HeroSection';
import { PRICING_TIERS } from '@/lib/mockData';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                title="Simple, Transparent Pricing"
                subtitle="Choose the plan that fits your event scale. No hidden fees."
                ctaText="Compare Plans"
                ctaLink="#plans"
                badge="30-Day Money Back Guarantee"
            />

            <section id="plans" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {PRICING_TIERS.map((tier, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl p-8 shadow-sm border hover:shadow-xl transition-all duration-300 flex flex-col
                                ${tier.popular ? 'border-primary ring-4 ring-primary/10 scale-105 z-10' : 'border-text-muted/10'}
                                `}
                            >
                                {tier.popular && (
                                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-text-main mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-text-main">{tier.price}</span>
                                        {tier.price !== 'Custom' && <span className="text-text-muted">/month</span>}
                                    </div>
                                    <p className="text-text-muted mt-4 text-sm">{tier.description}</p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-text-main">
                                            <span className="text-secondary font-bold">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/signup"
                                    className={`w-full py-3 rounded-xl font-bold transition-all text-center
                                        ${tier.popular
                                            ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20'
                                            : 'bg-bg-page text-text-main hover:bg-slate-200'
                                        }
                                    `}
                                >
                                    {tier.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white border-t border-text-muted/10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-text-main mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6 text-left">
                        {[
                            { q: "Can I upgrade later?", a: "Yes, you can upgrade or downgrade your plan at any time." },
                            { q: "Do you offer non-profit discounts?", a: "Absolutely! Contact our sales team with proof of status for 50% off." },
                            { q: "What happens if I exceed my session limit?", a: "We'll notify you. You have a grace period to upgrade before restrictions apply." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-bg-page p-6 rounded-xl">
                                <h3 className="font-bold text-text-main mb-2">{faq.q}</h3>
                                <p className="text-text-muted">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
