'use client';

import { useState, Suspense } from 'react';
import EventTypeSelector from '@/components/EventTypeSelector';
import EventForm from '@/components/EventForm';
import ScheduleView from '@/components/ScheduleView';
import ConflictPanel from '@/components/ConflictPanel';
import ExplainabilityPanel from '@/components/ExplainabilityPanel';
import { useAppStore, EventData } from '@/lib/store';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { api, endpoints } from '@/lib/api';
import { format } from 'date-fns';

function WizardContent() {
    const [step, setStep] = useState(1);
    const searchParams = useSearchParams();
    const eventId = searchParams.get('eventId');

    const {
        currentEvent, setCurrentEvent,
        schedule, setSchedule,
        conflicts, setConflicts,
        explanations, setExplanations,
        clearEvent, setLoading, isLoading,
        showToast
    } = useAppStore();

    useEffect(() => {
        const loadEvent = async () => {
            if (!eventId) {
                clearEvent();
                return;
            }

            setLoading(true);
            try {
                // 1. Fetch Event Details
                const event = await api.get(endpoints.events.details(Number(eventId)));

                // 2. Fetch Entities & Sessions
                const [entitiesData, sessionsData, scheduleData] = await Promise.all([
                    api.get(endpoints.events.entities(Number(eventId))),
                    api.get(endpoints.events.sessions(Number(eventId))),
                    api.get(endpoints.events.schedule(Number(eventId)))
                ]);

                // Map backend to frontend EventData
                const mappedEvent: EventData = {
                    id: event.id,
                    eventName: event.name,
                    eventType: event.event_type,
                    startDate: format(new Date(event.start_date), "yyyy-MM-dd'T'HH:mm"),
                    endDate: format(new Date(event.end_date), "yyyy-MM-dd'T'HH:mm"),
                    constraints: event.constraints || {},
                    entities: entitiesData.entities.map((e: any) => ({
                        type: e.type,
                        items: e.meta ? [e.meta] : [] // Simplify for now
                    })),
                    sessions: sessionsData.sessions.map((s: any) => ({
                        title: s.title,
                        duration: s.duration.toString(),
                        priority: s.priority.toString(),
                        room: s.meta?.room || ''
                    }))
                };

                setCurrentEvent(mappedEvent);

                if (scheduleData.schedule && scheduleData.schedule.length > 0) {
                    // We need to fetch the FULL schedule with titles, venues, etc. 
                    // The backend list_schedule has a slightly different format than results view.
                    // Let's use the generate-schedule logic to get full details for demo.
                    const fullSchedule = await api.post(endpoints.events.generate(Number(eventId)), {});
                    setSchedule(fullSchedule.schedule || []);
                    setConflicts(fullSchedule.conflicts || []);
                    setExplanations(fullSchedule.explanations || []);
                    setStep(3);
                } else {
                    setStep(2);
                }

            } catch (error) {
                console.error("Failed to load event for management", error);
                showToast("Failed to load event details. Please try again.", "error");
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [eventId, clearEvent, setCurrentEvent, setSchedule, setConflicts, setExplanations, setLoading, showToast]);

    return (
        <ProtectedRoute>
            <div className="min-h-[calc(100vh-64px)] bg-bg-page py-12">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Progress Stepper */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <div className="flex items-center justify-between relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-text-muted/20 -z-10 -translate-y-1/2"></div>

                            {[
                                { id: 1, label: "Select Type" },
                                { id: 2, label: "Configure" },
                                { id: 3, label: "Schedule" }
                            ].map((s) => (
                                <div key={s.id} className="flex flex-col items-center bg-bg-page px-4">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
                                    ${step >= s.id
                                                ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-110'
                                                : 'bg-white border-text-muted/30 text-text-muted'
                                            }`}
                                    >
                                        {s.id}
                                    </div>
                                    <span className={`mt-2 text-sm font-medium ${step >= s.id ? 'text-primary' : 'text-text-muted'}`}>
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Event Type Selection */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl font-bold text-text-main mb-3">Choose Event Type</h1>
                                <p className="text-text-muted">Select the template that best fits your scheduling needs</p>
                            </div>
                            <EventTypeSelector onSelect={() => setStep(2)} />
                        </div>
                    )}

                    {/* Step 2: Event Configuration */}
                    {step === 2 && currentEvent && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl font-bold text-text-main mb-3">Configure Event</h1>
                                <p className="text-text-muted">Set up your teams, sessions, and constraints</p>
                            </div>
                            <EventForm onComplete={() => setStep(3)} />
                        </div>
                    )}

                    {/* Step 3: Review Schedule */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold text-text-main">Optimized Schedule</h1>
                                    <p className="text-text-muted mt-1">AI-generated timeline based on your constraints</p>
                                </div>
                                <button
                                    onClick={() => window.print()}
                                    className="px-4 py-2 bg-white border border-text-muted/20 rounded-lg text-sm font-medium hover:bg-bg-page transition-colors shadow-sm"
                                >
                                    Export PDF
                                </button>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 bg-primary text-white border border-primary rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm ml-2"
                                >
                                    Go to Dashboard
                                </Link>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <ScheduleView />
                                </div>
                                <div className="space-y-6">
                                    {conflicts.length > 0 && <ConflictPanel />}
                                    {explanations.length > 0 && <ExplainabilityPanel />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
</ProtectedRoute>
    );
}

export default function WizardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[calc(100vh-64px)] bg-bg-page py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-text-muted">Loading...</p>
                </div>
            </div>
        }>
            <WizardContent />
        </Suspense>
    );
}
