'use client';

import { useAppStore } from '@/lib/store';

export default function ConflictPanel() {
    const { conflicts } = useAppStore();

    if (!conflicts || conflicts.length === 0) {
        return (
            <div className="bg-success/5 border border-success/20 rounded-xl p-6 flex items-start gap-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    ✅
                </div>
                <div>
                    <h3 className="font-bold text-text-main text-lg mb-1">Constraints Satisfied</h3>
                    <p className="text-sm text-text-muted">The schedule follows all your rules perfectly.</p>
                </div>
            </div>
        );
    }

    const hardConflicts = conflicts.filter(c => c.type === 'hard');
    const softConflicts = conflicts.filter(c => c.type === 'soft');

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            {hardConflicts.length > 0 && (
                <div className="bg-error/5 border-l-4 border-error rounded-r-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-error text-lg flex items-center gap-2">
                            <span>🚨</span> Hard Conflicts
                        </h3>
                        <span className="bg-error text-white text-xs font-bold px-2 py-1 rounded-md">{hardConflicts.length}</span>
                    </div>
                    <ul className="space-y-4">
                        {hardConflicts.map((conflict, index) => (
                            <li key={index} className="text-sm text-text-main bg-white p-3 rounded-md border border-error/10">
                                <p className="font-medium mb-1">{conflict.message}</p>
                                {conflict.suggestion && (
                                    <p className="text-xs text-text-muted flex items-start gap-1 mt-2">
                                        <span className="text-primary font-bold">Suggestion:</span> {conflict.suggestion}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {softConflicts.length > 0 && (
                <div className="bg-warning/5 border-l-4 border-warning rounded-r-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-warning hover:text-warning-dark transition-colors text-lg flex items-center gap-2">
                            <span>⚠️</span> Warnings
                        </h3>
                        <span className="bg-warning text-white text-xs font-bold px-2 py-1 rounded-md">{softConflicts.length}</span>
                    </div>
                    <ul className="space-y-3">
                        {softConflicts.map((conflict, index) => (
                            <li key={index} className="text-sm text-text-main pl-2 border-l-2 border-warning/30">
                                {conflict.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
