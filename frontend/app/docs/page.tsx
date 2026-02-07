'use client';
import { useState } from 'react';

export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', title: 'Introduction' },
        { id: 'quickstart', title: 'Quick Start' },
        { id: 'events', title: 'Creating Events' },
        { id: 'constraints', title: 'Managing Constraints' },
        { id: 'teams', title: 'Team Management' },
    ];

    return (
        <div className="bg-white min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-text-muted/10 h-screen sticky top-0 p-6 hidden md:block bg-bg-page overflow-y-auto">
                <h2 className="font-bold text-text-main text-lg mb-6">Documentation</h2>
                <nav className="space-y-1">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id
                                ? 'bg-primary/10 text-primary font-bold'
                                : 'text-text-muted hover:bg-white hover:text-text-main'
                                }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 md:p-12 max-w-4xl">
                <div className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Guide</div>
                <h1 className="text-4xl font-bold text-text-main mb-6">
                    {sections.find(s => s.id === activeSection)?.title}
                </h1>

                <div className="prose prose-slate max-w-none text-text-muted leading-relaxed">
                    {activeSection === 'intro' && (
                        <>
                            <p className="text-lg mb-6">
                                Welcome to the ChronoAI documentation. This guide will help you understand how to leverage our AI-powered scheduling engine to organize your events efficiently.
                            </p>
                            <h3 className="text-xl font-bold text-text-main mt-8 mb-4">Core Philosophy</h3>
                            <p>ChronoAI is built on the principle of constraint-based optimization. Instead of manually dragging blocks on a calendar, you define what needs to happen and who needs to be there. Our engine does the rest.</p>
                        </>
                    )}

                    {activeSection === 'quickstart' && (
                        <>
                            <p className="text-lg mb-6">Get your first schedule generated in under 5 minutes.</p>
                            <ol className="list-decimal pl-5 space-y-4 mb-6">
                                <li><strong>Sign up:</strong> Create your free account.</li>
                                <li><strong>Select Template:</strong> Choose between Tournament, Conference, or Hackathon.</li>
                                <li><strong>Add Entities:</strong> Define your rooms, speakers, or teams.</li>
                                <li><strong>Input Sessions:</strong> Use our shorthand syntax (e.g., "Title | Speaker | 60 | 1") to quickly add tracks.</li>
                                <li><strong>Generate:</strong> Click "Generate Schedule" and watch the AI work.</li>
                            </ol>
                        </>
                    )}

                    {activeSection === 'events' && (
                        <>
                            <p className="text-lg mb-6">Every event starts with metadata and timeframes.</p>
                            <h3 className="text-xl font-bold text-text-main mt-8 mb-4">Event Types</h3>
                            <div className="grid grid-cols-2 gap-4 my-6">
                                <div className="p-4 bg-white border border-text-muted/10 rounded-xl">
                                    <h4 className="font-bold text-text-main">🏆 Tournaments</h4>
                                    <p className="text-sm">Optimized for head-to-head matches and venue rotation.</p>
                                </div>
                                <div className="p-4 bg-white border border-text-muted/10 rounded-xl">
                                    <h4 className="font-bold text-text-main">🎤 Conferences</h4>
                                    <p className="text-sm">Handles multi-track speakers and room capacities.</p>
                                </div>
                            </div>
                        </>
                    )}

                    {activeSection === 'constraints' && (
                        <>
                            <h3 className="text-xl font-bold text-text-main mt-8 mb-4">Hard vs. Soft Constraints</h3>
                            <p><strong>Hard Constraints:</strong> Must be met. The engine will fail if these cannot be satisfied (e.g., two people cannot be in the same room at the same time).</p>
                            <p className="mt-4"><strong>Soft Constraints:</strong> Preferences. The engine will try to satisfy these but will compromise if necessary (e.g., Speaker A prefers a morning session).</p>
                        </>
                    )}

                    {activeSection === 'teams' && (
                        <>
                            <p>Collaborative features coming soon. Currently, you can manage individual entities and their specific metadata in the Dashboard.</p>
                        </>
                    )}

                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
                        <h4 className="font-bold text-text-main mb-2">💡 Need Help?</h4>
                        <p className="text-sm text-text-muted">Reach out to our support team for custom enterprise integrations or advanced constraint modeling.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
