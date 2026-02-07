'use client';

import Link from 'next/link';
import ProfileImage from './ProfileImage';
import { TeamMember } from '@/lib/mockData';

interface ProfileCardProps {
    member: TeamMember;
    variant?: 'grid' | 'featured' | 'cto';
}

export default function ProfileCard({ member, variant = 'grid' }: ProfileCardProps) {
    if (variant === 'featured') {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-text-muted/10 hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <ProfileImage 
                        src={member.avatar} 
                        alt={member.name} 
                        name={member.name} 
                        size="large"
                        className="flex-shrink-0 shadow-sm"
                    />
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-text-main mb-2">{member.name}</h3>
                        <p className="text-primary font-medium mb-4">{member.role}</p>
                        <p className="text-text-muted mb-6 leading-relaxed">{member.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {member.skills.slice(0, 3).map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-bg-page rounded-full text-xs font-medium text-text-muted border border-text-muted/10">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={`/community/profile/${member.id}`}
                                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                            >
                                View Profile
                            </Link>
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-white border border-text-muted/20 text-text-main font-semibold rounded-lg hover:bg-bg-page transition-colors"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-text-muted/10 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 text-center group">
            <div className="flex justify-center mb-6">
                <ProfileImage 
                    src={member.avatar} 
                    alt={member.name} 
                    name={member.name} 
                    size="medium"
                    className="shadow-sm"
                />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">{member.name}</h3>
            <p className="text-primary font-medium mb-4 text-sm">{member.role}</p>
            <p className="text-text-muted mb-6 leading-relaxed text-sm line-clamp-3">{member.summary}</p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                {member.skills.slice(0, 2).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-bg-page rounded-full text-xs font-medium text-text-muted border border-text-muted/10">
                        {skill}
                    </span>
                ))}
            </div>
            <Link
                href={`/community/profile/${member.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors group-hover:shadow-soft"
            >
                View Profile
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}