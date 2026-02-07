'use client';

import { useAppStore } from '@/lib/store';

const EVENT_TYPES = [
    {
        id: 'tournament',
        icon: '🏆',
        title: 'Tournament',
        description: 'Competitive matches with teams, venues, and schedules',
        accent: 'border-l-4 border-amber',
        hover: 'hover:border-amber',
        iconBg: 'bg-amber/10 text-amber-600'
    },
    {
        id: 'conference',
        icon: '🎤',
        title: 'Conference',
        description: 'Talks & sessions with speakers and rooms',
        accent: 'border-l-4 border-primary',
        hover: 'hover:border-primary',
        iconBg: 'bg-primary/10 text-primary'
    },
    {
        id: 'hackathon',
        icon: '🧑‍💻',
        title: 'Hackathon',
        description: 'Multi-phase event with tracks, mentors, and demos',
        accent: 'border-l-4 border-success',
        hover: 'hover:border-success',
        iconBg: 'bg-success/10 text-success'
    },
    {
        id: 'workshop',
        icon: '📚',
        title: 'Workshop',
        description: 'Training & learning sessions with instructors',
        accent: 'border-l-4 border-secondary',
        hover: 'hover:border-secondary',
        iconBg: 'bg-secondary/10 text-secondary'
    },
    {
        id: 'custom',
        icon: '⚙️',
        title: 'Custom',
        description: 'Define your own rules and constraints',
        accent: 'border-l-4 border-text-muted',
        hover: 'hover:border-text-main',
        iconBg: 'bg-text-muted/10 text-text-main'
    },
];

export default function EventTypeSelector({ onSelect }: { onSelect: () => void }) {
    const { setCurrentEvent } = useAppStore();

    const handleSelect = (type: string) => {
        setCurrentEvent({
            eventName: '',
            eventType: type as any,
            startDate: '',
            endDate: '',
            constraints: {},
            entities: [],
            sessions: [],
        });
        onSelect();
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENT_TYPES.map((type) => (
                <button
                    key={type.id}
                    onClick={() => handleSelect(type.id)}
                    className={`group relative p-8 bg-white rounded-xl shadow-sm hover:shadow-hover transition-all duration-300 text-left border border-text-muted/10 hover:-translate-y-1 ${type.accent}`}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${type.iconBg} transition-transform group-hover:scale-110`}>
                            {type.icon}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                        {type.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                        {type.description}
                    </p>
                </button>
            ))}
        </div>
    );
}
