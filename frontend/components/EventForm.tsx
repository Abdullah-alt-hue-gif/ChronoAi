'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { api, endpoints } from '@/lib/api';
import TournamentForm from './forms/TournamentForm';
import ConferenceForm from './forms/ConferenceForm';
import HackathonForm from './forms/HackathonForm';
import WorkshopForm from './forms/WorkshopForm';

export default function EventForm({ onComplete }: { onComplete: () => void }) {
    const {
        currentEvent,
        setCurrentEvent,
        setSchedule,
        setConflicts,
        setSuggestions,
        setExplanations,
        setLoading: setGlobalLoading,
        showToast
    } = useAppStore();
    const [loading, setLoading] = useState(false);

    const handleLoading = (state: boolean) => {
        setLoading(state);
        setGlobalLoading(state);
    };

    if (!currentEvent) return null;

    const handleSubmit = async (formData: any) => {
        handleLoading(true);

        try {
            // Step 1: Create event
            const eventResponse = await api.post(endpoints.events.create, {
                event_name: formData.eventName,
                event_type: currentEvent.eventType,
                start_date: formData.startDate,
                end_date: formData.endDate,
                constraints: formData.constraints || {},
            });

            const eventId = eventResponse.id;

            // Step 2: Add entities
            if (formData.entities && formData.entities.length > 0) {
                for (const entityGroup of formData.entities) {
                    await api.post(endpoints.events.entities(eventId), {
                        entity_type: entityGroup.type,
                        entities: entityGroup.items
                    });
                }
            }

            // Step 3: Add sessions
            if (formData.sessions && formData.sessions.length > 0) {
                await api.post(endpoints.events.sessions(eventId), {
                    sessions: formData.sessions
                });
            }

            // Step 4: Generate schedule
            const scheduleResponse = await api.post(endpoints.events.generate(eventId), {});

            // Update store
            setSchedule(scheduleResponse.schedule || []);
            setConflicts(scheduleResponse.conflicts || []);
            setSuggestions(scheduleResponse.suggestions || []);
            setExplanations(scheduleResponse.explanations || []);

            // Check for fatal scheduling failures (Fail-Safe rule)
            const fatalConflict = scheduleResponse.conflicts?.find((c: any) => c.type === 'fail-safe' || c.is_fatal);

            if (fatalConflict) {
                showToast(`Scheduling Error: ${fatalConflict.message.split('.')[0]}.`, 'error');
            } else {
                showToast('Schedule generated successfully!', 'success');
            }

            // Update current event with ID
            setCurrentEvent({ ...currentEvent, id: eventId });

            onComplete();
        } catch (error) {
            console.error('Error generating schedule:', error);
            showToast('Generation failed. Please check your bandwidth or constraints.', 'error');
        } finally {
            handleLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-medium border border-text-muted/10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {currentEvent.eventType === 'tournament' && <TournamentForm onSubmit={handleSubmit} loading={loading} />}
            {currentEvent.eventType === 'conference' && <ConferenceForm onSubmit={handleSubmit} loading={loading} />}
            {currentEvent.eventType === 'hackathon' && <HackathonForm onSubmit={handleSubmit} loading={loading} />}
            {currentEvent.eventType === 'workshop' && <WorkshopForm onSubmit={handleSubmit} loading={loading} />}
        </div>
    );
}
