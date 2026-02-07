'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, endpoints } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

interface Event {
    id: number;
    name: string;
    type: string;
    status?: string;
    date?: string;
    participants?: number;
}

export default function DashboardPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();
    const { isAuthenticated, checkAuth, showConfirmation, showToast } = useAppStore();

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const data = await api.get(endpoints.events.list);
            setEvents(data.events || []);
        } catch (error) {
            console.error("Failed to fetch events", error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';
            showToast(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
        setAuthChecked(true);
    }, [checkAuth]);

    useEffect(() => {
        if (!authChecked) return;
        
        if (isAuthenticated) {
            fetchEvents();
        } else {
            router.push('/login');
        }
    }, [isAuthenticated, authChecked, router]);

    const handleDelete = (id: number) => {
        showConfirmation({
            title: 'Delete Event',
            message: 'Are you sure you want to delete this event? This action cannot be undone and all associated data will be permanently removed.',
            isDestructive: true,
            confirmText: 'Delete Event',
            onConfirm: async () => {
                try {
                    await api.delete(endpoints.events.details(id));
                    setEvents(prev => prev.filter(e => e.id !== id));
                    showToast('Event deleted successfully', 'success');
                } catch (error) {
                    console.error("Failed to delete event", error);
                    const errorMessage = error instanceof Error ? error.message : 'Failed to delete event. Please try again.';
                    showToast(errorMessage, 'error');
                }
            }
        });
    };

    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeedDemo = async () => {
        setIsSeeding(true);
        try {
            // 1. Create Demo Event
            const event = await api.post(endpoints.events.list, {
                event_name: `Hackathon 2026 (Demo)`,
                event_type: "hackathon",
                start_date: new Date().toISOString(),
                end_date: new Date(Date.now() + 86400000).toISOString(),
                constraints: {}
            });

            // 2. Add Entities
            await api.post(endpoints.events.entities(event.id), {
                entity_type: "venue",
                entities: [
                    { name: "Main Hall", capacity: 100 },
                    { name: "Workshop Room A", capacity: 30 },
                    { name: "Lounge", capacity: 50 }
                ]
            });

            // 3. Add Sessions
            await api.post(endpoints.events.sessions(event.id), {
                sessions: [
                    { title: "Opening Ceremony", duration: 60, priority: 3, meta: { room: "Main Hall" } },
                    { title: "AI Workshop", duration: 90, priority: 2, meta: { room: "Workshop Room A" } },
                    { title: "Lunch Break", duration: 60, priority: 1, meta: { room: "Lounge" } },
                    { title: "Pitch Practice", duration: 120, priority: 2, meta: { room: "Main Hall" } }
                ]
            });

            // 4. Generate Schedule
            await api.post(endpoints.events.generate(event.id), {});

            await fetchEvents();
            showToast("Demo event seeded successfully!", "success");
        } catch (error) {
            console.error("Failed to seed demo data", error);
            showToast("Failed to seed demo data. Please check connection.", "error");
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">Dashboard</h1>
                    <p className="text-text-muted mt-1">Welcome back. You have {events.length} active events.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleSeedDemo}
                        disabled={isSeeding}
                        className="px-6 py-3 bg-white border border-secondary text-secondary font-bold rounded-xl shadow-sm hover:bg-secondary/5 transition-all disabled:opacity-50"
                    >
                        {isSeeding ? "Seeding..." : "✨ Seed Demo Event"}
                    </button>
                    <Link
                        href="/wizard"
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-medium hover:bg-primary-hover hover:shadow-hover hover:-translate-y-0.5 transition-all"
                    >
                        + Create New Event
                    </Link>
                </div>
            </div>

            {/* Stats Overview (Static for now, could be dynamic later) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: "Total Events", value: events.length.toString(), icon: "📅", change: "Updated now" },
                    { label: "AI Reliability", value: "99.9%", icon: "🤖", change: "Current Score" },
                    { label: "Plan Status", value: "Standard", icon: "✨", change: "Growth Account" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-text-muted/10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-bg-page rounded-xl text-2xl">{stat.icon}</div>
                            <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded">{stat.change}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-text-main">{stat.value}</h3>
                        <p className="text-sm text-text-muted">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Events List */}
            <div className="bg-white rounded-2xl shadow-sm border border-text-muted/10 overflow-hidden">
                <div className="p-6 border-b border-text-muted/10 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-text-main">Recent Events</h2>
                    <button className="text-sm text-primary font-bold hover:underline">View All</button>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-text-muted">Loading events...</div>
                ) : events.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-text-muted mb-4">No events found. Create your first event to get started.</p>
                        <Link
                            href="/wizard"
                            className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors"
                        >
                            Create Event
                        </Link>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-bg-page border-b border-text-muted/10 text-xs uppercase text-text-muted font-semibold">
                            <tr>
                                <th className="px-6 py-4">Event Name</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-text-muted/10">
                            {events.map(event => (
                                <tr key={event.id} className="hover:bg-bg-page transition-colors">
                                    <td className="px-6 py-4 font-bold text-text-main">{event.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-text-muted/20 text-xs font-medium text-text-muted">
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <Link
                                            href={`/wizard?eventId=${event.id}`}
                                            className="text-sm font-bold text-electric-blue hover:text-electric-blue/80 transition-colors"
                                        >
                                            Manage
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="text-sm font-bold text-crimson hover:text-crimson/80 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

</div>
        </div>
    );
}
