'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import Link from 'next/link';

const blogPosts = [
    {
        slug: "future-of-scheduling",
        title: "The Future of AI in Event Scheduling",
        summary: "How machine learning is revolutionizing the way we organize chaos into order, and what it means for event organizers everywhere.",
        author: "Sarah Chen",
        date: "Dec 15, 2025",
        readTime: "5 min read",
        category: "AI & Machine Learning",
        featured: true
    },
    {
        slug: "perfect-hackathon",
        title: "Organizing the Perfect Hackathon",
        summary: "A step-by-step guide to managing time pressures, mentor sessions, and participant experience for maximum success.",
        author: "Marcus Johnson",
        date: "Dec 10, 2025", 
        readTime: "8 min read",
        category: "Event Planning",
        featured: false
    },
    {
        slug: "constraint-satisfaction",
        title: "Introduction to Constraint Satisfaction Problems",
        summary: "Understanding the computer science principles that power ChronoAI's scheduling engine and why they matter for your events.",
        author: "Dr. Emily Rodriguez",
        date: "Dec 5, 2025",
        readTime: "12 min read", 
        category: "Technical Deep Dive",
        featured: false
    },
    {
        slug: "avoiding-burnout",
        title: "Avoiding Event Organizer Burnout",
        summary: "Practical strategies for maintaining your sanity while managing complex events and dealing with last-minute changes.",
        author: "Alex Thompson",
        date: "Nov 28, 2025",
        readTime: "6 min read",
        category: "Productivity",
        featured: false
    },
    {
        slug: "tournament-scheduling",
        title: "The Mathematics of Tournament Scheduling", 
        summary: "Exploring the algorithms behind fair tournament brackets and how AI ensures balanced competition.",
        author: "David Kim",
        date: "Nov 20, 2025",
        readTime: "10 min read",
        category: "Technical Deep Dive",
        featured: false
    }
];

const categories = ["All", "AI & Machine Learning", "Event Planning", "Technical Deep Dive", "Productivity"];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           post.summary.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    return (
        <div className="bg-bg-page min-h-screen">
            <HeroSection
                title="ChronoAI Blog"
                subtitle="Insights, updates, and scheduling tips from our team. Learn the art and science of perfect event coordination."
                ctaText="Subscribe to Newsletter"
                ctaLink="#subscribe"
                badge="New Articles Weekly"
            />

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Search and Filter */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-text-muted/20 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="lg:w-80">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-text-muted/20 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Featured Article */}
                    {featuredPost && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
                                <span className="text-primary">⭐</span> Featured Article
                            </h2>
                            <article className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-md font-semibold">
                                        {featuredPost.category}
                                    </span>
                                    <span>{featuredPost.date}</span>
                                    <span>{featuredPost.readTime}</span>
                                </div>
                                <Link href={`/blog/${featuredPost.slug}`} className="group">
                                    <h3 className="text-3xl font-bold text-text-main mb-4 group-hover:text-primary transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                </Link>
                                <p className="text-lg text-text-muted mb-6 leading-relaxed">
                                    {featuredPost.summary}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center font-bold text-secondary">
                                            {featuredPost.author.charAt(0)}
                                        </div>
                                        <span className="font-medium text-text-main">{featuredPost.author}</span>
                                    </div>
                                    <Link href={`/blog/${featuredPost.slug}`} className="text-primary font-bold hover:underline">
                                        Read Full Article →
                                    </Link>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* Regular Articles Grid */}
                    <h2 className="text-2xl font-bold text-text-main mb-6">
                        {selectedCategory === "All" && !searchTerm ? "Recent Articles" : `Found ${regularPosts.length} Articles`}
                    </h2>
                    
                    {regularPosts.length > 0 ? (
                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            {regularPosts.map((post, index) => (
                                <article key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-text-muted/10 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 text-sm text-text-muted mb-4">
                                        <span className="bg-bg-page text-text-muted px-2 py-1 rounded-md font-semibold text-xs">
                                            {post.category}
                                        </span>
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="group block mb-4">
                                        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors leading-tight">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <p className="text-text-muted mb-6 leading-relaxed">
                                        {post.summary}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-text-muted/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center font-bold text-secondary text-xs">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-text-main">{post.author}</span>
                                        </div>
                                        <Link href={`/blog/${post.slug}`} className="text-primary font-bold text-sm hover:underline">
                                            Read More →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-bold text-text-main mb-2">No articles found</h3>
                            <p className="text-text-muted mb-6">
                                Try adjusting your search or browsing different categories.
                            </p>
                            <button 
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSearchTerm("");
                                }}
                                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Newsletter Subscription */}
                    <div id="subscribe" className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                            <p className="mb-6 opacity-90">
                                Get the latest insights on event scheduling, AI advances, and productivity tips delivered to your inbox.
                            </p>
                            <div className="flex max-w-md mx-auto gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email..."
                                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                                />
                                <button className="px-6 py-3 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-sm mt-4 opacity-75">
                                Join 10,000+ event organizers. No spam, unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}