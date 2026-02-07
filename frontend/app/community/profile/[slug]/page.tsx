'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProfileImage from '@/components/ProfileImage';
import { TEAM_MEMBERS, TeamMember } from '@/lib/mockData';

export default function ProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [member, setMember] = useState<TeamMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Find member by slug
        const slug = params.slug as string;
        const foundMember = TEAM_MEMBERS.find(m => m.id === slug);
        
        if (foundMember) {
            setMember(foundMember);
        }
        
        setIsLoading(false);
    }, [params.slug]);

    if (isLoading) {
        return (
            <div className="bg-bg-page min-h-screen">
                <div className="pt-24 pb-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                            <div className="h-12 bg-gray-200 rounded w-96 mb-8"></div>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="bg-bg-page min-h-screen">
                <div className="pt-24 pb-16">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="bg-white rounded-2xl p-12 border border-text-muted/10">
                            <div className="text-6xl mb-6">🔍</div>
                            <h1 className="text-3xl font-bold text-text-main mb-4">Profile Not Found</h1>
                            <p className="text-text-muted mb-8">
                                The team member profile you're looking for doesn't exist or has been moved.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/community"
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                                >
                                    View All Team Members
                                </Link>
                                <button
                                    onClick={() => router.back()}
                                    className="px-8 py-4 bg-white text-text-main border border-text-muted/20 font-bold rounded-xl hover:bg-bg-page transition-colors"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bg-page min-h-screen">
            {/* Breadcrumb Navigation */}
            <div className="pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-sm text-text-muted">
                        <Link href="/community" className="hover:text-primary transition-colors">
                            Community
                        </Link>
                        <span>/</span>
                        <span className="text-text-main">{member.name}</span>
                    </nav>
                </div>
            </div>

            {/* Profile Header */}
            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white rounded-2xl p-8 border border-text-muted/10 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <ProfileImage 
                                src={member.avatar} 
                                alt={member.name} 
                                name={member.name} 
                                size="large"
                                className="flex-shrink-0 shadow-lg border-4 border-white"
                            />
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-text-main mb-2">{member.name}</h1>
                                <p className="text-xl text-primary font-medium mb-6">{member.role}</p>
                                <p className="text-text-muted leading-relaxed mb-8">{member.summary}</p>
                                
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                            </svg>
                                            LinkedIn
                                        </a>
                                    )}
                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-text-muted/20 text-text-main rounded-lg hover:bg-bg-page transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Bio */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 border border-text-muted/10">
                        <h2 className="text-2xl font-bold text-text-main mb-6">About</h2>
                        <div className="prose prose-lg max-w-none">
                            {member.bio.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-text-muted leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ChronoAI Responsibilities */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 border border-text-muted/10">
                        <h2 className="text-2xl font-bold text-text-main mb-6">ChronoAI Responsibilities</h2>
                        <ul className="space-y-3">
                            {member.responsibilities.map((responsibility, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span className="text-text-main">{responsibility}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 border border-text-muted/10">
                        <h2 className="text-2xl font-bold text-text-main mb-6">Skills & Expertise</h2>
                        <div className="flex flex-wrap gap-3">
                            {member.skills.map((skill, index) => (
                                <span key={index} className="px-4 py-2 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg text-sm font-medium text-text-main border border-primary/10">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Community */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                        <h2 className="text-2xl font-bold text-text-main mb-4">Meet the Rest of the Team</h2>
                        <p className="text-text-muted mb-6">
                            ChronoAI is built by a talented team of professionals working together to revolutionize event scheduling.
                        </p>
                        <Link
                            href="/community"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Community
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}