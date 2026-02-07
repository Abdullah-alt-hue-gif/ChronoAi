'use client';

import { useAppStore } from '@/lib/store';
import { format } from 'date-fns';

export default function ScheduleView() {
    const { schedule, isLoading, conflicts, suggestions } = useAppStore();

    // Check for fatal scheduling failures (Fail-Safe rule)
    const fatalConflict = conflicts.find(c => c.type === 'fail-safe' || c.is_fatal);
    
    // Conflict Summary for non-fatal conflicts
    const hasConflicts = conflicts.length > 0 && !fatalConflict;

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-medium border border-text-muted/10 animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-6 ml-3 pl-8 border-l-2 border-slate-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="relative">
                            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                            <div className="bg-slate-50 rounded-xl p-5 h-24 w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (fatalConflict) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-medium border-2 border-error/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">⚠️</span>
                    <h2 className="text-xl font-bold text-error">Scheduling Failed (Fail-Safe Triggered)</h2>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
                    <p className="font-bold text-red-800 mb-2">Reason:</p>
                    <p className="text-red-700 leading-relaxed text-sm">
                        {fatalConflict.message}
                    </p>
                </div>

                {suggestions.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-bold text-text-main flex items-center gap-2">
                            <span className="text-lg">💡</span> Suggested Fixes:
                        </h3>
                        <ul className="grid gap-3">
                            {suggestions.map((suggestion, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 bg-bg-page rounded-lg text-sm text-text-muted border border-text-muted/5">
                                    <span className="text-primary mt-0.5">•</span>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-text-muted/10">
                    <p className="text-xs text-text-muted italic">
                        Constraint-driven scheduling ensures 100% validity. Please adjust your inputs to resolve these conflicts.
                    </p>
                </div>
            </div>
        );
    }

    if (!schedule || schedule.length === 0) {
        return (
            <div className="bg-bg-page rounded-xl p-12 text-center border border-dashed border-text-muted/30">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-lg font-medium text-text-main">No schedule yet</h3>
                <p className="text-text-muted">Configure your event and generate a schedule to see it here.</p>
            </div>
        );
    }

    // Sort schedule by time
    const sortedSchedule = [...schedule]
        .filter(item => item && (item.time || item.start_time))
        .sort((a, b) => new Date(a.time || a.start_time).getTime() - new Date(b.time || b.start_time).getTime());

    return (
        <div className="bg-white rounded-2xl p-8 shadow-medium border border-text-muted/10">
            {/* Conflict Summary */}
            {hasConflicts && (
                <div className="mb-6 bg-amber/5 border border-amber/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-amber flex items-center gap-2">
                            <span className="text-lg">⚠️</span> Conflict Summary
                        </h3>
                        <span className="text-sm text-amber bg-amber/10 px-2 py-1 rounded">
                            {conflicts.length} conflict{conflicts.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {conflicts.map((conflict, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-amber">•</span>
                                <span className="text-text-main">
                                    {conflict.message}
                                    {conflict.suggestion && (
                                        <span className="text-text-muted block mt-1">
                                            Suggestion: {conflict.suggestion}
                                        </span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
                <span className="text-2xl">📅</span> Timeline
                {hasConflicts && (
                    <span className="text-sm text-amber bg-amber/10 px-2 py-1 rounded">
                        Conflicts Detected
                    </span>
                )}
            </h2>

            <div className="relative border-l-2 border-text-muted/10 ml-3 space-y-6 pb-2">
                {sortedSchedule.map((item, index) => {
                    const startTime = new Date(item.time || item.start_time);
                    if (isNaN(startTime.getTime())) return null;

                    const endTime = item.end_time ? new Date(item.end_time) : null;
                    const isSession = (item.details?.session_title || item.session_title);

                    return (
                        <div key={index} className="relative pl-8 group">
                            {/* Dot indicator */}
                            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-white border-4 border-primary group-hover:scale-110 transition-transform shadow-sm"></div>

                            <div className="bg-bg-page hover:bg-white border border-transparent hover:border-text-muted/10 rounded-xl p-5 hover:shadow-soft transition-all duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold mb-2">
                                            {format(startTime, 'HH:mm')} {(endTime && !isNaN(endTime.getTime())) ? `- ${format(endTime, 'HH:mm')}` : ''}
                                        </span>
                                        <h3 className="font-bold text-text-main text-lg leading-tight">
                                            {item.session_title || item.details?.session_title || (item.entity || 'Scheduled Item')}
                                        </h3>
                                    </div>
                                    {(item.venue || item.venue_name) && (
                                        <span className="flex items-center gap-1 text-xs font-medium text-text-muted bg-white px-2 py-1 rounded-md border border-text-muted/10">
                                            📍 {item.venue || item.venue_name}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-sm text-text-muted">
                                        {isSession ? `Entity: ${item.entity || 'Assigned'}` : 'Event Item'}
                                    </p>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
