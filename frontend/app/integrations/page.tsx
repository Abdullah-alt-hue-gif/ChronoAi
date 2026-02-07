'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';

export default function IntegrationsPage() {
    const integrations = [
        {
            name: "Google Calendar",
            description: "Sync your schedules directly with Google Calendar for seamless personal time management.",
            status: "connected",
            icon: "📅",
            category: "Calendar"
        },
        {
            name: "Outlook Calendar", 
            description: "Connect with Microsoft Outlook for enterprise calendar integration.",
            status: "connected",
            icon: "📆",
            category: "Calendar"
        },
        {
            name: "Slack",
            description: "Get real-time notifications and share schedules directly in your Slack channels.",
            status: "available",
            icon: "💬",
            category: "Communication"
        },
        {
            name: "Microsoft Teams",
            description: "Integrate scheduling with Teams meetings and collaboration spaces.",
            status: "available", 
            icon: "👥",
            category: "Communication"
        },
        {
            name: "Zoom",
            description: "Automatically generate Zoom meeting links for virtual sessions.",
            status: "available",
            icon: "🎥",
            category: "Video"
        },
        {
            name: "Stripe",
            description: "Process payments and manage registrations for paid events.",
            status: "connected",
            icon: "💳",
            category: "Payment"
        },
        {
            name: "Salesforce",
            description: "Connect event data with your CRM for comprehensive customer insights.",
            status: "available",
            icon: "☁️",
            category: "CRM"
        },
        {
            name: "HubSpot",
            description: "Sync attendee information with HubSpot for marketing automation.",
            status: "available",
            icon: "🔗",
            category: "CRM"
        },
        {
            name: "Mailchimp",
            description: "Send automated event announcements and follow-up emails.",
            status: "available",
            icon: "📧",
            category: "Email"
        }
    ];

    const categories = ["All", "Calendar", "Communication", "Video", "Payment", "CRM", "Email"];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredIntegrations = selectedCategory === "All" 
        ? integrations 
        : integrations.filter(integration => integration.category === selectedCategory);

    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                title="Connect Your Workflow"
                subtitle="ChronoAI plays perfectly with the tools you already use. Sync, automate, and streamline your event management."
                ctaText="View API Documentation"
                ctaLink="/docs"
                badge="9+ Native Integrations"
            />

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Category Filter */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white rounded-xl p-1 shadow-sm border border-text-muted/10 inline-flex">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedCategory === category
                                            ? 'bg-primary text-white'
                                            : 'text-text-muted hover:text-text-main'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Integration Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {filteredIntegrations.map((integration, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-text-muted/10 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-bg-page rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                            {integration.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main text-lg">{integration.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-text-muted bg-bg-page px-2 py-1 rounded">
                                                    {integration.category}
                                                </span>
                                                <span className={`text-xs font-medium px-2 py-1 rounded ${
                                                    integration.status === 'connected' 
                                                        ? 'bg-success/10 text-success' 
                                                        : 'bg-amber/10 text-amber'
                                                }`}>
                                                    {integration.status === 'connected' ? 'Connected' : 'Available'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-text-muted mb-4 leading-relaxed">
                                    {integration.description}
                                </p>
                                
                                <button className={`w-full px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                    integration.status === 'connected'
                                        ? 'bg-success/10 text-success border border-success/20 hover:bg-success/20'
                                        : 'bg-primary text-white hover:bg-primary-hover'
                                }`}>
                                    {integration.status === 'connected' ? 'Configure' : 'Connect'}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* API Section */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-text-main mb-4">Build Your Own Integration</h2>
                            <p className="text-lg text-text-muted max-w-2xl mx-auto">
                                Use our REST API and webhooks to connect ChronoAI with any custom workflow or proprietary system.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-2">RESTful API</div>
                                <p className="text-sm text-text-muted">Full CRUD operations for events, schedules, and entities</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-2">Webhooks</div>
                                <p className="text-sm text-text-muted">Real-time notifications for schedule changes</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-2">OAuth 2.0</div>
                                <p className="text-sm text-text-muted">Secure authentication for third-party apps</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors">
                                View API Documentation
                            </button>
                            <button className="px-6 py-3 bg-white text-primary border border-primary rounded-lg font-bold hover:bg-primary/5 transition-colors">
                                Get API Keys
                            </button>
                        </div>
                    </div>

                    {/* Request Section */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold text-text-main mb-4">Don't see your favorite tool?</h3>
                        <p className="text-text-muted mb-8 max-w-2xl mx-auto">
                            We're constantly adding new integrations based on customer feedback. Let us know what tool you'd like to see next.
                        </p>
                        <button className="px-6 py-3 bg-white border border-text-muted/20 rounded-xl hover:bg-bg-page font-semibold transition-colors">
                            Request Integration
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}