'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useEffect } from 'react';

export default function Navbar() {
    const { isAuthenticated, logout, checkAuth, user, showConfirmation, showToast } = useAppStore();

    const handleLogout = () => {
        showConfirmation({
            title: 'Logout',
            message: 'You will be logged out of your account. Continue?',
            confirmText: 'Logout',
            onConfirm: () => {
                logout();
                showToast('Logged out successfully', 'success');
            }
        });
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-text-muted/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl">⏳</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                        ChronoAI
                    </span>
                </Link>

<div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
                    <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
                    <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    <Link href="/community" className="hover:text-primary transition-colors">Community</Link>
                    <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-warning hover:text-warning/80 transition-colors"
                            >
                                Logout
                            </button>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
                                {user?.email?.[0].toUpperCase() || 'U'}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="hidden md:block text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                                Log in
                            </Link>
                            <Link
                                href="/wizard"
                                className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-primary-hover hover:shadow-soft transition-all transform hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
