'use client';

import { useState } from 'react';

export default function ConferenceForm({ onSubmit, loading }: any) {
    const [formData, setFormData] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        sessions: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Parse sessions: format "Title|Speaker|Duration|Priority|Room"
        const sessionLines = formData.sessions.split('\n').filter(s => s.trim());
        const sessions = sessionLines.map(line => {
            const [title, speaker, duration, priority, room] = line.split('|').map(s => s.trim());
            return {
                title: title || 'Untitled Session',
                duration: parseInt(duration) || 60,
                priority: parseInt(priority) || 1,
                required_entities: [],
                metadata: { speaker, room, equipment: [] },
            };
        });

        const rooms = [...new Set(sessionLines.map(line => line.split('|')[4]?.trim()).filter(Boolean))];

        onSubmit({
            eventName: formData.eventName,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            constraints: {},
            entities: [
                { type: 'room', items: rooms.map(name => ({ name, capacity: 100, equipment: ['projector', 'microphone'] })) },
            ],
            sessions,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-8 border-b border-text-muted/10 pb-4">
                <div className="text-3xl">🎤</div>
                <h2 className="text-2xl font-bold text-text-main">Conference Configuration</h2>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-main mb-2">Event Name</label>
                <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:text-text-muted/50"
                    placeholder="e.g., Tech Summit 2026"
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
                <label className="block text-sm font-medium text-text-main mb-2">
                    Sessions (format: Title | Speaker | Duration | Priority | Room)
                </label>
                <textarea
                    name="sessions"
                    value={formData.sessions}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none bg-white font-mono text-sm leading-relaxed"
                    placeholder="AI in Healthcare | Expert Speaker | 60 | 3 | Main Hall&#10;Web Development | Technical Lead | 90 | 2 | Room A"
                />
                <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                    <span className="inline-block w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">i</span>
                    Priority: 1 (low) to 3 (critical). Duration in minutes.
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
