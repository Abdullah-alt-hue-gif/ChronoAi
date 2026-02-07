import HeroSection from '@/components/HeroSection';

export default function CareersPage() {
    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                badge="Join Our Team"
                title="Build the Future of Time Management"
                subtitle="Help us revolutionize how the world organizes events. Remote-first, competitive pay, and amazing team culture."
                ctaText="View Openings"
                ctaLink="#openings"
            />

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-text-main mb-6">Why Work at ChronoAI?</h2>
                        <p className="text-xl text-text-muted max-w-3xl mx-auto">
                            We're a small team with big ambitions. We believe in the power of intelligent systems to solve real-world problems that matter.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🏠</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Remote-First</h3>
                            <p className="text-text-muted">Work from anywhere in the world. We trust our team to do great work regardless of location.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Growth & Learning</h3>
                            <p className="text-text-muted">We invest in your development with learning budgets, conferences, and challenging problems to solve.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">💪</div>
                            <h3 className="text-xl font-bold text-text-main mb-4">Make an Impact</h3>
                            <p className="text-text-muted">See your work directly affect thousands of event organizers worldwide.</p>
                        </div>
                    </div>

                    <div id="openings">
                        <h2 className="text-3xl font-bold text-text-main mb-8 text-center">Open Positions</h2>
                        
                        <div className="grid gap-6">
                            {[
                                {
                                    title: "Senior Full Stack Engineer",
                                    dept: "Engineering",
                                    loc: "Remote",
                                    type: "Full-time",
                                    experience: "5+ years",
                                    description: "Lead development of our scheduling engine and frontend applications."
                                },
                                {
                                    title: "AI/ML Research Engineer",
                                    dept: "Data Science", 
                                    loc: "Remote",
                                    type: "Full-time",
                                    experience: "3+ years",
                                    description: "Research and implement cutting-edge constraint satisfaction algorithms."
                                },
                                {
                                    title: "Product Designer",
                                    dept: "Design",
                                    loc: "Remote", 
                                    type: "Full-time",
                                    experience: "4+ years",
                                    description: "Design beautiful, intuitive interfaces for complex scheduling workflows."
                                },
                                {
                                    title: "Developer Advocate",
                                    dept: "Marketing",
                                    loc: "New York, NY / Remote",
                                    type: "Full-time", 
                                    experience: "3+ years",
                                    description: "Help developers integrate ChronoAI into their applications."
                                },
                                {
                                    title: "Customer Success Manager",
                                    dept: "Customer Success",
                                    loc: "San Francisco, CA / Remote",
                                    type: "Full-time",
                                    experience: "2+ years", 
                                    description: "Ensure our customers get maximum value from our platform."
                                }
                            ].map((job, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-text-muted/10 hover:shadow-lg transition-all duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-main mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-3 text-sm text-text-muted mb-3">
                                                <span className="px-2 py-1 bg-bg-page rounded-md">{job.dept}</span>
                                                <span className="px-2 py-1 bg-bg-page rounded-md">{job.loc}</span>
                                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">{job.type}</span>
                                                <span className="px-2 py-1 bg-bg-page rounded-md">{job.experience}</span>
                                            </div>
                                            <p className="text-text-muted mb-4">{job.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors">
                                            Apply Now
                                        </button>
                                        <button className="px-6 py-3 bg-white border border-text-muted/20 rounded-lg font-medium hover:bg-bg-page transition-colors">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-text-main mb-4">Don't see the perfect fit?</h3>
                            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
                                We're always looking for talented people. If you're passionate about solving complex scheduling problems, we'd love to hear from you.
                            </p>
                            <button className="px-6 py-3 bg-white text-primary border border-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                                Send Open Application
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <h3 className="text-xl font-bold text-text-main mb-6">Our Values</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div>
                                <div className="text-2xl mb-2">🎯</div>
                                <h4 className="font-bold text-text-main mb-2">Precision</h4>
                                <p className="text-sm text-text-muted">We strive for accuracy in everything we do.</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-2">🔍</div>
                                <h4 className="font-bold text-text-main mb-2">Transparency</h4>
                                <p className="text-sm text-text-muted">Open communication and explainable decisions.</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-2">💡</div>
                                <h4 className="font-bold text-text-main mb-2">Innovation</h4>
                                <p className="text-sm text-text-muted">Constantly pushing boundaries of what's possible.</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-2">🤝</div>
                                <h4 className="font-bold text-text-main mb-2">Collaboration</h4>
                                <p className="text-sm text-text-muted">Together we solve problems no one person can tackle alone.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}