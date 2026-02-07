'use client';

import { useState } from 'react';

export default function TournamentForm({ onSubmit, loading }: any) {
    const [formData, setFormData] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        teams: '',
        venues: '',
        matchDuration: '90',
        restTime: '30',
        maxMatchesPerDay: '3',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const teams = formData.teams.split('\n').filter(t => t.trim());
        const venues = formData.venues.split('\n').filter(v => v.trim());

        // Generate matches (round-robin)
        const matches = [];
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                matches.push({
                    title: `${teams[i]} vs ${teams[j]}`,
                    duration: parseInt(formData.matchDuration),
                    priority: 1,
                    required_entities: [],
                    metadata: { teams: [teams[i], teams[j]] },
                });
            }
        }

        onSubmit({
            eventName: formData.eventName,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            constraints: {
                rest_time: parseInt(formData.restTime),
                max_matches_per_day: parseInt(formData.maxMatchesPerDay),
            },
            entities: [
                { type: 'team', items: teams.map(name => ({ name })) },
                { type: 'venue', items: venues.map(name => ({ name, capacity: 100 })) },
            ],
            sessions: matches,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-8 border-b border-text-muted/10 pb-4">
                <div className="text-3xl">🏆</div>
                <h2 className="text-2xl font-bold text-text-main">Tournament Configuration</h2>
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
                    placeholder="e.g., Summer Football Tournament 2026"
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
                <label className="block text-sm font-medium text-text-main mb-2">Teams (one per line)</label>
                <textarea
                    name="teams"
                    value={formData.teams}
                    onChange={(e: any) => handleChange(e)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:text-text-muted/50"
                    placeholder="Team A&#10;Team B&#10;Team C"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-main mb-2">Venues (one per line)</label>
                <textarea
                    name="venues"
                    value={formData.venues}
                    onChange={(e: any) => handleChange(e)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:text-text-muted/50"
                    placeholder="Court 1&#10;Court 2"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Match Duration (min)</label>
                    <input
                        type="number"
                        name="matchDuration"
                        value={formData.matchDuration}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Rest Time (min)</label>
                    <input
                        type="number"
                        name="restTime"
                        value={formData.restTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Max Matches/Day</label>
                    <input
                        type="number"
                        name="maxMatchesPerDay"
                        value={formData.maxMatchesPerDay}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    />
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
