'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, endpoints } from '@/lib/api';
import { format } from 'date-fns';
import { useAppStore } from '@/lib/store';
import ProtectedRoute from '@/components/ProtectedRoute';

interface SessionDetails {
    id: number;
    title: string;
    duration: number;
    priority: number;
    required_entities: number[];
    meta_data: any;
    schedule_item?: {
        id: number;
        start_time: string;
        end_time: string;
        venue_id?: number;
        venue_name?: string;
        explanation: string;
    };
    event_info: {
        id: number;
        name: string;
        type: string;
    };
}

export default function SessionDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = parseInt(params.id as string);
    
    const [session, setSession] = useState<SessionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { showToast, showConfirmation } = useAppStore();

    const fetchSessionDetails = async () => {
        try {
            setLoading(true);
            const data = await api.get(endpoints.events.sessionDetails(sessionId));
            setSession(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load session details');
            showToast('Failed to load session details', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sessionId) {
            fetchSessionDetails();
        }
    }, [sessionId]);

    const handleReschedule = () => {
        if (!session) return;
        
        showConfirmation({
            title: 'Reschedule Session',
            message: `Are you sure you want to reschedule "${session.title}"? This will regenerate the entire event schedule.`,
            isDestructive: false,
            confirmText: 'Reschedule',
            onConfirm: async () => {
                try {
                    await api.post(endpoints.events.generate(session.event_info.id), {});
                    showToast('Schedule regenerated successfully', 'success');
                    fetchSessionDetails(); // Refresh the data
                } catch (err: any) {
                    showToast(err.message || 'Failed to reschedule', 'error');
                }
            }
        });
    };

    const handleCancel = () => {
        if (!session) return;
        
        showConfirmation({
            title: 'Cancel Session',
            message: `Are you sure you want to cancel "${session.title}"? This action cannot be undone.`,
            isDestructive: true,
            confirmText: 'Cancel Session',
            onConfirm: async () => {
                try {
                    await api.delete(endpoints.events.sessionDelete(session.id));
                    showToast('Session cancelled successfully', 'success');
                    router.push(`/dashboard?eventId=${session.event_info.id}`);
                } catch (err: any) {
                    showToast(err.message || 'Failed to cancel session', 'error');
                }
            }
        });
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-slate-200 rounded w-1/3 mb-6"></div>
                        <div className="bg-white rounded-2xl p-8 shadow-medium">
                            <div className="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-4 bg-slate-100 rounded w-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error || !session) {
        return (
            <ProtectedRoute>
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl p-8 shadow-medium border border-error/20">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">⚠️</span>
                            <h2 className="text-xl font-bold text-error">Session Not Found</h2>
                        </div>
                        <p className="text-text-muted mb-6">
                            {error || 'The session you are looking for does not exist or you do not have permission to view it.'}
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
                    <Link href="/dashboard" className="hover:text-text-main transition-colors">
                        Dashboard
                    </Link>
                    <span>/</span>
                    <Link 
                        href={`/wizard?eventId=${session.event_info.id}`}
                        className="hover:text-text-main transition-colors"
                    >
                        {session.event_info.name}
                    </Link>
                    <span>/</span>
                    <span className="text-text-main font-medium">{session.title}</span>
                </nav>

                {/* Session Header */}
                <div className="bg-white rounded-2xl p-8 shadow-medium mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-text-main mb-2">{session.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-text-muted">
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-bg-page border border-text-muted/20">
                                    Priority: {session.priority}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-bg-page border border-text-muted/20">
                                    Duration: {session.duration} minutes
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-bg-page border border-text-muted/20">
                                    Type: {session.event_info.type}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleReschedule}
                                className="px-4 py-2 bg-white border border-text-muted/20 text-text-main rounded-lg hover:bg-bg-page transition-colors"
                            >
                                🔄 Reschedule
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                            >
                                ✕ Cancel
                            </button>
                        </div>
                    </div>

                    {/* Schedule Timeline Status */}
                    {session.schedule_item ? (
                        <div className="bg-success/5 border border-success/20 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                <h3 className="font-bold text-success">Scheduled</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-text-main">Start Time:</span>
                                    <div className="text-text-muted">
                                        {format(new Date(session.schedule_item.start_time), 'PPP p')}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium text-text-main">End Time:</span>
                                    <div className="text-text-muted">
                                        {format(new Date(session.schedule_item.end_time), 'PPP p')}
                                    </div>
                                </div>
                                {session.schedule_item.venue_name && (
                                    <div>
                                        <span className="font-medium text-text-main">Venue:</span>
                                        <div className="text-text-muted">{session.schedule_item.venue_name}</div>
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium text-text-main">Duration:</span>
                                    <div className="text-text-muted">{session.duration} minutes</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-amber/5 border border-amber/20 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">⏳</span>
                                <h3 className="font-bold text-amber">Not Yet Scheduled</h3>
                            </div>
                            <p className="text-amber text-sm">
                                This session has been created but not yet scheduled. Generate the event schedule to assign a time slot.
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Session Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Participant/Entity Highlight */}
                        {session.required_entities && session.required_entities.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-medium">
                                <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                                    <span>👥</span> Required Entities
                                </h3>
                                <div className="space-y-2">
                                    {session.required_entities.map((entityId, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-bg-page rounded-lg">
                                            <span className="text-sm font-medium text-text-main">Entity ID: {entityId}</span>
                                            <span className="text-xs text-text-muted bg-white px-2 py-1 rounded border border-text-muted/10">
                                                Required
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Metadata Information */}
                        {session.meta_data && Object.keys(session.meta_data).length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-medium">
                                <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                                    <span>📋</span> Additional Information
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(session.meta_data).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center py-2 border-b border-text-muted/10 last:border-0">
                                            <span className="text-sm font-medium text-text-main capitalize">{key.replace('_', ' ')}</span>
                                            <span className="text-sm text-text-muted">
                                                {Array.isArray(value) ? value.join(', ') : String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Explainability */}
                    {session.schedule_item?.explanation && (
                        <div className="bg-white rounded-2xl p-6 shadow-medium">
                            <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                                <span>🧠</span> AI Explainability
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                                    <h4 className="font-medium text-primary text-sm mb-2">Scheduling Reason</h4>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                        {session.schedule_item.explanation}
                                    </p>
                                </div>
                                <div className="text-xs text-text-muted">
                                    <p>This session was scheduled by ChronoAI's constraint-based algorithm, considering:</p>
                                    <ul className="mt-2 space-y-1 list-disc list-inside">
                                        <li>Entity availability and rest periods</li>
                                        <li>Venue capacity and equipment requirements</li>
                                        <li>Priority and time preferences</li>
                                        <li>Conflict avoidance with other sessions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}