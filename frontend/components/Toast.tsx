'use client';

import { useAppStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Toast() {
    const { toast, hideToast } = useAppStore();
    const [isClosing, setIsClosing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (toast.visible) {
            setIsClosing(false);
        }
    }, [toast.visible]);

    if (!mounted) return null;
    if (!toast.visible && !isClosing) return null;

    const typeStyles = {
        success: 'bg-green-500 border-green-600',
        error: 'bg-red-500 border-red-600',
        info: 'bg-primary border-primary-hover'
    };

    const typeIcons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    return (
        <div className="fixed bottom-8 right-8 z-[110] pointer-events-none">
            <div
                className={`
                    flex items-center gap-3 px-6 py-4 rounded-2xl text-white shadow-xl border-2 pointer-events-auto
                    animate-in slide-in-from-right-10 fade-in duration-300
                    ${typeStyles[toast.type]}
                `}
            >
                <span className="text-xl">{typeIcons[toast.type]}</span>
                <p className="font-semibold text-sm">{toast.message}</p>
                <button
                    onClick={hideToast}
                    className="ml-4 hover:opacity-70 transition-opacity"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
