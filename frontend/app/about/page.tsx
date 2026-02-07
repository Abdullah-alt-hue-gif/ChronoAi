import HeroSection from '@/components/HeroSection';

export default function AboutPage() {
    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                badge="Our Mission"
                title="Orchestrating the World's Events with Intelligence"
                subtitle="At ChronoAI, we believe that scheduling shouldn't be a source of stress. We're building the infrastructure for the next generation of event organizers."
                ctaText="Start Building"
                ctaLink="/wizard"
                secondaryCtaText="Contact Sales"
                secondaryCtaLink="/pricing"
            />

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-text-main mb-6">Why ChronoAI?</h2>
                        <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                            Traditional scheduling tools are just digital versions of paper calendars. They don't understand the complex relationships between people, places, and time. ChronoAI changes that by bringing a high-performance constraint solver directly to your browser.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="p-8 rounded-2xl bg-white border border-text-muted/10 text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Precision First</h3>
                            <p className="text-text-muted">We don't do "good enough". Our algorithms guarantee conflict-free results based on hard constraints you define.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-text-muted/10 text-center">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Explainable AI</h3>
                            <p className="text-text-muted">We don't just give you a result; we tell you why every decision was made and how to improve your constraints.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-text-muted/10 text-center">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Universal Engine</h3>
                            <p className="text-text-muted">From hackathons to conferences, tournaments to workshops - one intelligent system adapts to any event type.</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h3 className="text-3xl font-bold text-text-main mb-6">Built for the Modern Organizer</h3>
                            <p className="text-lg text-text-muted mb-6">
                                Whether you're running a 2,000-person tech conference or a local basketball tournament, our AI identifies conflicts before they happen and suggests the optimal path forward.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span className="text-text-main">Real-time conflict detection and resolution</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span className="text-text-main">Multi-event type support with custom constraints</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span className="text-text-main">Detailed explanations for every scheduling decision</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                            <div className="text-center mb-6">
                                <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
                                <p className="text-text-muted">Scheduling Accuracy</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-secondary mb-2">10M+</div>
                                <p className="text-text-muted">Constraints Processed Daily</p>
                            </div>
                            <div className="text-center mt-6">
                                <p className="text-sm text-text-muted italic">
                                    Powered by advanced constraint satisfaction algorithms
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border border-text-muted/10">
                        <h3 className="text-2xl font-bold text-text-main mb-6 text-center">Our Journey</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-2">2024</div>
                                <p className="text-text-muted">Founded with a mission to eliminate scheduling chaos</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-2">50K+</div>
                                <p className="text-text-muted">Events successfully scheduled</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-2">150+</div>
                                <p className="text-text-muted">Countries using ChronoAI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}