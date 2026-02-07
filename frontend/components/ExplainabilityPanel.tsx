'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';

export default function ExplainabilityPanel() {
    const { explanations } = useAppStore();
    const [expanded, setExpanded] = useState(false);

    if (!explanations || explanations.length === 0) {
        return null;
    }

    const decisions = explanations || [];
    const visibleDecisions = expanded ? decisions : decisions.slice(0, 3);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-medium border border-text-muted/10 animate-in fade-in slide-in-from-right-8 duration-700">
            <h3 className="font-bold text-text-main text-lg mb-4 flex items-center gap-2">
                <span className="text-secondary text-2xl">🧠</span> AI Reasoning
            </h3>

            {decisions.length === 0 && (
                <p className="text-sm text-text-muted">No detailed explanations available for this schedule.</p>
            )}

            <div className="space-y-4">
                {visibleDecisions.map((decision: any, index: number) => (
                    <div key={index} className="bg-bg-page p-4 rounded-xl border border-transparent hover:border-secondary/20 transition-colors">
                        <p className="text-sm text-text-main leading-relaxed font-medium">{decision.explanation}</p>
                        {decision.metadata && decision.metadata.score && (
                            <div className="mt-2 flex items-center gap-2">
                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden max-w-[100px]">
                                    <div
                                        className="h-full bg-secondary rounded-full"
                                        style={{ width: `${Math.min(decision.metadata.score * 10, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-secondary font-mono font-bold">
                                    {decision.metadata.score.toFixed(1)}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {decisions.length > 3 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-4 w-full py-2 text-sm text-secondary hover:text-primary font-semibold border border-transparent hover:border-secondary/10 rounded-lg transition-all"
                >
                    {expanded ? 'Show Less' : `View ${decisions.length - 3} More Decisions`}
                </button>
            )}
        </div>
    );
}
