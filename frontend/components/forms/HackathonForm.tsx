'use client';

import { useState } from 'react';

export default function HackathonForm({ onSubmit, loading }: any) {
    const [formData, setFormData] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        venue: '',
        openingDuration: '60',
        codingDuration: '480',
        mentorshipDuration: '120',
        submissionDuration: '30',
        demosDuration: '180',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Hackathon phases
        const sessions = [
            { title: 'Opening Ceremony', duration: parseInt(formData.openingDuration), priority: 1, metadata: { phase: 'opening' }, required_entities: [] },
            { title: 'Coding Phase', duration: parseInt(formData.codingDuration), priority: 1, metadata: { phase: 'coding' }, required_entities: [] },
            { title: 'Mentorship Sessions', duration: parseInt(formData.mentorshipDuration), priority: 1, metadata: { phase: 'mentorship' }, required_entities: [] },
            { title: 'Submission Deadline', duration: parseInt(formData.submissionDuration), priority: 1, metadata: { phase: 'submission' }, required_entities: [] },
            { title: 'Demo Presentations', duration: parseInt(formData.demosDuration), priority: 1, metadata: { phase: 'demos' }, required_entities: [] },
        ];

        // Create venue entity if venue is provided
        const entities = [];
        if (formData.venue.trim()) {
            entities.push({
                type: 'venue',
                items: [{ name: formData.venue.trim(), capacity: 200 }]
            });
        }

        onSubmit({
            eventName: formData.eventName,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            constraints: {},
            entities,
            sessions,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-8 border-b border-text-muted/10 pb-4">
                <div className="text-3xl">🧑‍💻</div>
                <h2 className="text-2xl font-bold text-text-main">Hackathon Configuration</h2>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mb-8">
                <div className="flex gap-3">
                    <span className="text-xl">ℹ️</span>
                    <p className="text-sm text-text-main leading-relaxed">
                        <strong>Standard Hackathon Flow:</strong> The scheduling engine will enforce the sequence: Opening Ceremony → Coding Phase → Mentorship → Submission → Demos.
                    </p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-main mb-2">Event Name</label>
                <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all property-all"
                    placeholder="e.g., iCodeGuru Hackathon 2026"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Start Date</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-main mb-2">End Date</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-main mb-2">Venue</label>
                <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    placeholder="e.g., TechHub Convention Center"
                />
            </div>

            <div className="space-y-4 pt-4 border-t border-text-muted/10">
                <h3 className="text-lg font-bold text-text-main mb-4">Phase Durations (minutes)</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-2">Opening Ceremony</label>
                        <input type="number" name="openingDuration" value={formData.openingDuration} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-2">Coding Phase</label>
                        <input type="number" name="codingDuration" value={formData.codingDuration} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-2">Mentorship</label>
                        <input type="number" name="mentorshipDuration" value={formData.mentorshipDuration} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-2">Submission</label>
                        <input type="number" name="submissionDuration" value={formData.submissionDuration} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-text-main mb-2">Demos & Closing</label>
                        <input type="number" name="demosDuration" value={formData.demosDuration} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all" />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-medium hover:bg-primary-hover hover:shadow-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Schedule...
                    </span>
                ) : (
                    '⚡ Generate Schedule'
                )}
            </button>
        </form>
    );
}
