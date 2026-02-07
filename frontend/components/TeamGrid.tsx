'use client';

import ProfileCard from './ProfileCard';
import { TeamMember } from '@/lib/mockData';

interface TeamGridProps {
    members: TeamMember[];
    cto?: TeamMember;
    founder?: TeamMember;
    coFounder?: TeamMember;
}

export default function TeamGrid({ members, cto, founder, coFounder }: TeamGridProps) {
    const featuredIds = [cto?.id, founder?.id, coFounder?.id].filter(Boolean);
    const regularMembers = members.filter(m => !featuredIds.includes(m.id));

    return (
        <div className="space-y-20">
            {/* Leadership Section - CTO & Founder */}
            {(cto || founder) && (
                <section className="relative">
                    {/* Decorative background accent */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 rounded-3xl"></div>
                    <div className="relative bg-white rounded-3xl p-12 shadow-lg border border-primary/20">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-sm font-medium text-primary">Leadership</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {cto && founder ? 'Our Leadership Team' : (cto ? 'CTO (Chief Technical Officer)' : 'Founder')}
                            </h1>
                            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                                {cto && founder 
                                    ? 'Meet the visionaries behind ChronoAI\'s intelligent scheduling platform and AI-powered scheduling revolution.'
                                    : cto 
                                    ? 'Meet our technology visionary and technical leader driving ChronoAI\'s innovation, architecture excellence, and strategic technical direction.'
                                    : 'Meet the visionary behind ChronoAI\'s intelligent scheduling platform'
                                }
                            </p>
                        </div>
                        <div className="space-y-8">
                            {cto && <ProfileCard member={cto} variant="featured" />}
                            {founder && <ProfileCard member={founder} variant="featured" />}
                        </div>
                    </div>
                </section>
            )}

            {/* Co-Founder Section */}
            {coFounder && (
                <section className="pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-text-main mb-4">Co-Founder</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">
                            Meet the technical leader ensuring ChronoAI's quality and innovation
                        </p>
                    </div>
                    <ProfileCard member={coFounder} variant="featured" />
                </section>
            )}



            {/* Team Grid Section */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-text-main mb-4">
                        {(cto || founder || coFounder) ? 'The Team' : 'Meet Our Team'}
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        A multidisciplinary group of experts working together to build the future of event scheduling
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularMembers.map((member) => (
                        <ProfileCard key={member.id} member={member} />
                    ))}
                </div>
            </section>
        </div>
    );
}