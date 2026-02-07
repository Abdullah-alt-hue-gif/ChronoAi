'use client';

import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Check auth status on mount only
        const checkAuth = useAppStore.getState().checkAuth;
        checkAuth();
    }, []);

    return <>{children}</>;
}
