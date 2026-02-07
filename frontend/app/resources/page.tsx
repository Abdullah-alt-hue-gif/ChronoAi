import HeroSection from '@/components/HeroSection';
import FeatureGrid from '@/components/FeatureGrid';

const RESOURCES = [
    {
        title: "Documentation",
        description: "Comprehensive guides for setting up and using ChronoAI.",
        icon: "📚",
    },
    {
        title: "API Reference",
        description: "Technical details for integrating ChronoAI into your apps.",
        icon: "🔧",
    },
    {
        title: "Video Tutorials",
        description: "Step-by-step video walkthroughs of key features.",
        icon: "📹",
    },
    {
        title: "Community Forum",
        description: "Connect with other organizers and share tips.",
        icon: "💬",
    },
];

export default function ResourcesPage() {
    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                title="Resource Hub"
                subtitle="Everything you need to become a master scheduler."
                ctaText="Go to Docs"
                ctaLink="/docs"
            />

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <FeatureGrid features={RESOURCES} columns={2} />
                </div>
            </section>

            <section className="py-12 bg-white border-t border-text-muted/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-text-main mb-6">Latest from the Knowledge Base</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {['Getting Started 101', 'Handling Constraints', 'Exporting to PDF'].map((item, i) => (
                            <div key={i} className="p-4 rounded-lg hover:bg-bg-page transition-colors cursor-pointer border border-transparent hover:border-text-muted/10">
                                <h3 className="font-semibold text-primary mb-1">Guide</h3>
                                <p className="text-text-main font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
