'use client';

import { useAppStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function ConfirmationModal() {
    const { confirmation, hideConfirmation } = useAppStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') hideConfirmation();
        };

        if (confirmation.isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [confirmation.isOpen, hideConfirmation]);

    if (!mounted) return null;
    if (!confirmation.isOpen) return null;

    const handleConfirm = () => {
        confirmation.onConfirm();
        hideConfirmation();
    };

    const handleCancel = () => {
        confirmation.onCancel();
        hideConfirmation();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={handleCancel}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl border border-text-muted/10 p-8 animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-text-main mb-2">{confirmation.title}</h3>
                    <p className="text-text-muted leading-relaxed">{confirmation.message}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-6 py-2.5 rounded-xl text-text-muted font-semibold hover:bg-bg-page transition-all"
                    >
                        {confirmation.cancelText || 'Cancel'}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`flex-1 px-6 py-2.5 rounded-xl text-white font-semibold shadow-md transition-all active:scale-[0.98] ${confirmation.isDestructive
                                ? 'bg-error hover:bg-red-600 shadow-error/20'
                                : 'bg-primary hover:bg-primary-hover shadow-primary/20'
                            }`}
                    >
                        {confirmation.confirmText || 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}
