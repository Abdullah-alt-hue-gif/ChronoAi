'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-bg-page">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-32">
        {/* Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v1.0 Now Live
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-text-main mb-6">
            Schedule events <span className="text-primary">intelligently</span>.
          </h1>
          <p className="text-xl sm:text-2xl text-text-muted font-light mb-10 max-w-3xl mx-auto leading-relaxed">
            Eliminate conflicts and chaos. Whether it's a tournament, conference, or hackathon —
            ChronoAI organizes it all with <span className="text-text-main font-medium">constraint-based AI</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/wizard"
              className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl shadow-medium hover:bg-primary-hover hover:shadow-hover hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Create New Event
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-white text-text-main border border-text-muted/20 text-lg font-semibold rounded-xl shadow-sm hover:bg-bg-page hover:border-text-muted/40 transition-all duration-300 w-full sm:w-auto"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white border-y border-text-muted/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">Why choose ChronoAI?</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              We don't just place blocks on a calendar. Our engine reasons about your specific event constraints.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎯"
              title="Constraint Solving"
              description="Define hard rules (must happen) and soft preferences (should happen). AI respects them all."
            />
            <FeatureCard
              icon="⚡"
              title="Universal Engine"
              description="One system for Sports, Tech, Education, and Corporate events. Adaptable schemas."
            />
            <FeatureCard
              icon="🔍"
              title="Full Explainability"
              description="No black box. Click any scheduled item to see exactly why it was placed there."
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-24 bg-bg-page">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-main text-center mb-16">Workflow Simplified</h2>

          <div className="relative grid md:grid-cols-4 gap-8">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -z-10"></div>

            <StepCard number={1} title="Select Type" description="Choose from pre-built templates or custom." />
            <StepCard number={2} title="Add Constraints" description="Set your rules, resources, and priorities." />
            <StepCard number={3} title="AI Generation" description="Our engine computes millions of possibilities." />
            <StepCard number={4} title="Review & Export" description="Check conflicts, adjust, and go live." />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="group bg-bg-page p-8 rounded-2xl border border-text-muted/10 hover:bg-white hover:border-primary/20 hover:shadow-medium transition-all duration-300">
      <div className="w-12 h-12 bg-white rounded-xl shadow-soft flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-text-main mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft border border-text-muted/5 relative hover:-translate-y-1 transition-transform duration-300">
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/20 mx-auto md:mx-0">
        {number}
      </div>
      <h3 className="text-lg font-bold text-text-main mb-2 text-center md:text-left">{title}</h3>
      <p className="text-sm text-text-muted text-center md:text-left">{description}</p>
    </div>
  );
}
