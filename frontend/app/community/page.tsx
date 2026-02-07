import HeroSection from '@/components/HeroSection';
import TeamGrid from '@/components/TeamGrid';
import { TEAM_MEMBERS } from '@/lib/mockData';

export default function CommunityPage() {
    // Find leadership team members
    const cto = TEAM_MEMBERS.find(member => member.id === 'abdullah');
    const founder = TEAM_MEMBERS.find(member => member.id === 'sehrish');
    const coFounder = TEAM_MEMBERS.find(member => member.id === 'kinza');

    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                badge="Our Community"
                title="Meet the Minds Behind ChronoAI"
                subtitle="We're a multidisciplinary team of engineers, designers, researchers, and quality specialists working together to revolutionize event scheduling through intelligent automation."
                ctaText="Join Our Mission"
                ctaLink="/careers"
                secondaryCtaText="Contact Us"
                secondaryCtaLink="/contact"
            />

            {/* Mission & Values Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-text-main mb-6">Our Mission & Values</h2>
                        <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                            At ChronoAI, we believe that scheduling shouldn't be a source of stress. 
                            Our mission is to eliminate scheduling chaos through intelligent automation, 
                            allowing organizers to focus on what matters most: creating amazing experiences.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="p-8 rounded-2xl bg-white border border-text-muted/10 text-center">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Collaboration</h3>
                            <p className="text-text-muted">We work together across disciplines to solve complex scheduling challenges.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-text-muted/10 text-center">
                            <div className="text-4xl mb-4">🧠</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Innovation</h3>
                            <p className="text-text-muted">We push the boundaries of what's possible with AI and constraint satisfaction.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-text-muted/10 text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Excellence</h3>
                            <p className="text-text-muted">We're committed to delivering reliable, accurate, and user-friendly solutions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <TeamGrid members={TEAM_MEMBERS} cto={cto} founder={founder} coFounder={coFounder} />
                </div>
            </section>

            {/* Join Community Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20">
                        <h2 className="text-3xl font-bold text-text-main mb-6">Join Our Community</h2>
                        <p className="text-xl text-text-muted mb-8 leading-relaxed">
                            Whether you're interested in using ChronoAI, contributing to our development, 
                            or joining our team, we'd love to hear from you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="/careers"
                                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-hover hover:shadow-primary/30 hover:-translate-y-1 transition-all w-full sm:w-auto"
                            >
                                View Open Positions
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-4 bg-white text-text-main border border-text-muted/20 font-bold rounded-xl hover:bg-bg-page hover:border-text-muted/40 transition-all w-full sm:w-auto"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}