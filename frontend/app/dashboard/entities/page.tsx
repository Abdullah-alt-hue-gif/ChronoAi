'use client';

import { useAppStore } from '@/lib/store';
import { api, endpoints } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function EntitiesPage() {
    const { currentEvent, setCurrentEvent, showConfirmation, showToast } = useAppStore();
    const [events, setEvents] = useState<any[]>([]);
    const [entities, setEntities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('team'); // Backend uses 'team', 'venue', 'judge'

    const tabs = [
        { id: 'team', label: 'Teams' },
        { id: 'venue', label: 'Venues' },
        { id: 'judge', label: 'Judges' },
    ];

    // Fetch user events to populate selector if none active
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.get(endpoints.events.list);
                setEvents(data.events || []);
                if (!currentEvent && data.events?.length > 0) {
                    // Don't auto-select, let user choose or show global
                }
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        fetchEvents();
    }, [currentEvent]);

    // Fetch entities when currentEvent or activeTab changes
    const fetchEntities = async () => {
        if (!currentEvent?.id) return;
        setLoading(true);
        try {
            const data = await api.get(`${endpoints.events.entities(currentEvent.id)}?entity_type=${activeTab}`);
            setEntities(data.entities || []);
        } catch (error) {
            console.error("Failed to fetch entities", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntities();
    }, [currentEvent?.id, activeTab]);

    const handleDelete = (id: number) => {
        showConfirmation({
            title: `Delete ${activeTab}`,
            message: `Are you sure you want to remove this ${activeTab}? This action is permanent and might affect your schedule.`,
            isDestructive: true,
            confirmText: 'Remove',
            onConfirm: async () => {
                try {
                    await api.delete(`${endpoints.events.list}/entities/${id}`);
                    setEntities(prev => prev.filter(e => e.id !== id));
                    showToast(`${activeTab} removed successfully`, 'success');
                } catch (error) {
                    console.error("Delete failed", error);
                    showToast(`Failed to delete ${activeTab}.`, 'error');
                }
            }
        });
    };

    const handleEventSelect = async (id: string) => {
        if (!id) {
            // clear or global
            return;
        }
        const event = await api.get(`${endpoints.events.list}/${id}`);
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
                    <h1 className="text-3xl font-bold text-text-main">Entity Management</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-text-muted">Managing Event:</span>
                        <select
                            className="bg-white border border-text-muted/20 rounded-lg px-3 py-1 text-sm font-bold text-primary focus:outline-none"
                            value={currentEvent?.id || ""}
                            onChange={(e) => handleEventSelect(e.target.value)}
                        >
                            <option value="">Select an Event...</option>
                            {events.map(e => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    disabled={!currentEvent}
                    className="px-6 py-3 bg-secondary text-white font-bold rounded-xl shadow-medium hover:bg-secondary-hover hover:shadow-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    + Add New {tabs.find(t => t.id === activeTab)?.label.slice(0, -1)}
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-text-muted/10 overflow-hidden min-h-[500px]">
                {/* Tabs */}
                <div className="flex border-b border-text-muted/10">
                    {tabs.map(tab => {
                        const count = entities.filter(e => e.type === tab.id).length;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2
                                    ${activeTab === tab.id
                                        ? 'border-secondary text-secondary bg-secondary/5'
                                        : 'border-transparent text-text-muted hover:text-text-main hover:bg-bg-page'
                                    }
                                `}
                            >
                                {tab.label}
                                {currentEvent && (
                                    <span className={`px-2 py-0.5 rounded-full text-xs
                                        ${activeTab === tab.id ? 'bg-secondary/20 text-secondary' : 'bg-text-muted/10 text-text-muted'}
                                    `}>
                                        {entities.length > 0 && activeTab === tab.id ? entities.length : '0'}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Search & Filter */}
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            className="flex-1 px-4 py-2 rounded-lg border border-text-muted/20 bg-bg-page focus:outline-none focus:border-secondary"
                        />
                        <button className="px-4 py-2 border border-text-muted/20 rounded-lg text-text-muted hover:bg-bg-page">Filters</button>
                    </div>

                    {/* Entity List */}
                    {loading ? (
                        <div className="p-12 text-center text-text-muted">Loading {activeTab}s...</div>
                    ) : !currentEvent ? (
                        <div className="p-12 text-center text-text-muted bg-bg-page/50 rounded-xl">
                            Please select an event above to manage its entities.
                        </div>
                    ) : entities.length === 0 ? (
                        <div className="p-12 text-center text-text-muted bg-bg-page/50 rounded-xl">
                            No {activeTab}s found for this event.
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {entities.map(entity => (
                                <div key={entity.id} className="p-4 rounded-xl border border-text-muted/10 hover:shadow-md transition-all group relative bg-white">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleDelete(entity.id)}
                                            className="text-text-muted hover:text-crimson" title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">
                                            {entity.name.slice(0, 1)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main">
                                                {entity.name}
                                            </h3>
                                            <p className="text-xs text-text-muted">ID: #{entity.id}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        {entity.meta && Object.entries(entity.meta).map(([key, value]) => (
                                            key !== 'name' && (
                                                <div key={key} className="text-xs text-text-muted flex justify-between">
                                                    <span className="capitalize">{key}:</span>
                                                    <span className="font-medium text-text-main truncate ml-2">
                                                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
