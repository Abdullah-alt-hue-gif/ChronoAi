import HeroSection from '@/components/HeroSection';
import FeatureGrid from '@/components/FeatureGrid';
import { PRODUCT_FEATURES } from '@/lib/mockData';

export default function ProductPage() {
    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                badge="New Version 2.0"
                title="The World's Smartest Event Scheduler"
                subtitle="ChronoAI combines advanced constraint solving with an intuitive interface to handle everything from small workshops to massive multi-track conferences."
                ctaText="Start Building Free"
                ctaLink="/wizard"
                secondaryCtaText="See Pricing"
                secondaryCtaLink="/pricing"
            />

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-4">Everything You Need to Orchestrate Events</h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            Stop wrestling with spreadsheets. Let our AI handle the complexity while you focus on the experience.
                        </p>
                    </div>

                    <FeatureGrid features={PRODUCT_FEATURES} />
                </div>
            </section>

            <section className="py-20 px-6 bg-white border-y border-text-muted/10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-6">Built for Every Use Case</h2>
                        <div className="space-y-6">
                            {[
                                { title: "🏆 Tournaments", desc: "Manage brackets, venues, and team constraints effortlessly." },
                                { title: "🎤 Conferences", desc: "Schedule speakers, tracks, and room capacities without conflicts." },
                                { title: "🧑‍💻 Hackathons", desc: "Coordinate phases from opening ceremony to judging panels." },
                                { title: "📚 Workshops", desc: "Organize training sessions, instructors, and equipment needs." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold mt-1">✓</div>
                                    <div>
                                        <h3 className="font-bold text-text-main text-lg">{item.title}</h3>
                                        <p className="text-text-muted">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-60"></div>
                        <div className="relative bg-bg-page p-8 rounded-2xl shadow-xl border border-text-muted/10">
                            {/* Mock UI for Visual Interest */}
                            <div className="space-y-4">
                                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                                <div className="h-4 bg-slate-100 rounded w-full"></div>
                                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    <div className="h-24 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                                    <div className="h-24 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                                    <div className="h-24 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
