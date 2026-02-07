'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, checkAuth } = useAppStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        // Initial check
        checkAuth();

        // Small delay to ensure state is synchronized from localStorage
        const timer = setTimeout(() => {
            setIsVerifying(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [checkAuth]);

    useEffect(() => {
        if (!isVerifying && !isAuthenticated) {
            // Redirect to login with return parameter
            const returnUrl = encodeURIComponent(pathname);
            router.push(`/login?returnTo=${returnUrl}`);
        }
    }, [isAuthenticated, isVerifying, router, pathname]);

    if (isVerifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-page">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-muted font-medium">Verifying session...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
