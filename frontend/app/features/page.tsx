import HeroSection from '@/components/HeroSection';
import FeatureGrid from '@/components/FeatureGrid';
import { PRODUCT_FEATURES } from '@/lib/mockData';

export default function FeaturesPage() {
    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                title="Features that Empower Organizers"
                subtitle="From drag-and-drop scheduling to AI-driven conflict resolution, explore the tools that make ChronoAI unique."
                ctaText="Start Free Trial"
                ctaLink="/wizard"
            />

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-text-main mb-4">Core Capabilities</h2>
                        <p className="text-text-muted">Built for speed, accuracy, and scale.</p>
                    </div>
                    <FeatureGrid features={PRODUCT_FEATURES} columns={3} />
                </div>
            </section>

            <section className="py-20 px-6 bg-white border-y border-text-muted/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-text-main mb-6">Constraint Engine</h2>
                            <p className="text-text-muted leading-relaxed mb-6">
                                Our proprietary CP-SAT solver handles complex logic that human brains struggle with. Define hard constraints (must-haves) and soft constraints (preferences), and let the AI find the optimal balance.
                            </p>
                            <ul className="space-y-3">
                                {['Room Capacity Limits', 'Speaker Availability', 'Travel Time Buffers', 'Equipment Requirements'].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-text-main font-medium">
                                        <span className="text-primary">⚡</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-bg-page rounded-2xl p-8 border border-text-muted/10">
                            {/* Abstract Visual */}
                            <div className="space-y-3 font-mono text-sm text-text-muted">
                                <div className="flex justify-between"><span>Scanning constraints...</span><span className="text-success">OK</span></div>
                                <div className="flex justify-between"><span>Optimizing flow...</span><span className="text-success">OK</span></div>
                                <div className="flex justify-between"><span>Resolving conflicts...</span><span className="text-warning">2 Resolved</span></div>
                                <div className="h-2 w-full bg-slate-200 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-primary w-[98%]"></div>
                                </div>
                                <div className="text-center text-text-main font-bold mt-2">Score: 98/100</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
