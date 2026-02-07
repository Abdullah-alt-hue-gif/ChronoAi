'use client';

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { api, endpoints } from '@/lib/api';

export default function CalendarPage() {
    const { currentEvent, setCurrentEvent } = useAppStore();
    const [events, setEvents] = useState<any[]>([]);
    const [scheduleItems, setScheduleItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.get(endpoints.events.list);
                setEvents(data.events || []);
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        fetchEvents();
    }, []);

    const fetchSchedule = async () => {
        if (!currentEvent?.id) return;
        setIsLoading(true);
        try {
            const data = await api.get(endpoints.events.schedule(currentEvent.id));
            setScheduleItems(data.schedule || []);
        } catch (error) {
            console.error("Failed to fetch schedule", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, [currentEvent?.id]);

    const handleEventSelect = async (id: string) => {
        if (!id) return;
        const event = await api.get(endpoints.events.details(Number(id)));
        setCurrentEvent({
            id: event.id,
            eventName: event.name,
            eventType: event.event_type,
            startDate: event.start_date,
            endDate: event.end_date,
            constraints: event.constraints,
            entities: [],
            sessions: []
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">Calendar</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-text-muted">Event:</span>
                        <select
                            className="bg-white border border-text-muted/20 rounded-lg px-3 py-1 text-sm font-bold text-electric-blue focus:outline-none"
                            value={currentEvent?.id || ""}
                            onChange={(e) => handleEventSelect(e.target.value)}
                        >
                            <option value="">Select Event...</option>
                            {events.map(e => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-text-muted/20 rounded-lg text-sm hover:bg-white transition-colors">Month</button>
                    <button className="px-4 py-2 border border-text-muted/20 rounded-lg text-sm bg-white font-bold shadow-sm">Week</button>
                    <button className="px-4 py-2 border border-text-muted/20 rounded-lg text-sm hover:bg-white transition-colors">Day</button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-text-muted/10 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-text-main">{format(today, 'MMMM yyyy')}</h2>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-page">←</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-page">→</button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 mb-4 text-center text-sm font-semibold text-text-muted">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {dateRange.map((day, i) => (
                        <div key={i} className={`min-h-[120px] rounded-xl border p-2 transition-all hover:shadow-md
                            ${isSameDay(day, today) ? 'border-primary ring-2 ring-primary/10 bg-primary/5' : 'border-text-muted/10 bg-bg-page/50'}
                        `}>
                            <div className={`text-right text-sm mb-2 ${isSameDay(day, today) ? 'text-primary font-bold' : 'text-text-muted'}`}>
                                {format(day, 'd')}
                            </div>
                            <div className="space-y-1">
                                {isLoading ? (
                                    <div className="h-4 bg-slate-100 animate-pulse rounded"></div>
                                ) : (
                                    scheduleItems
                                        .filter(item => isSameDay(parseISO(item.start_time), day))
                                        .map((item, j) => (
                                            <div key={j} className="text-[10px] p-1 rounded bg-electric-blue/10 text-electric-blue truncate border border-electric-blue/20">
                                                {format(parseISO(item.start_time), 'HH:mm')} - {item.session_title || 'Session'}
                                            </div>
                                        ))
                                )}
                                {!isLoading && scheduleItems.filter(item => isSameDay(parseISO(item.start_time), day)).length === 0 && (
                                    <div className="text-[10px] text-text-muted italic opacity-50">No sessions</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
