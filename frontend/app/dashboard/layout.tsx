'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAppStore } from '@/lib/store';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user } = useAppStore();

    const menuItems = [
        { icon: '📊', label: 'Overview', href: '/dashboard' },
        { icon: '📅', label: 'Calendar', href: '/dashboard/calendar' },
        { icon: '👥', label: 'Entities', href: '/dashboard/entities' },
        { icon: '✨', label: 'Create Event', href: '/wizard' },
    ];

    const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-bg-page">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-text-muted/10 hidden md:flex flex-col fixed top-16 bottom-0 overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Menu</h2>
                        <nav className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text-muted hover:bg-bg-page hover:text-text-main'
                                            }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-text-muted/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary">
                                {userInitial}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-text-main truncate" title={user?.email || 'User'}>
                                    {user?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-xs text-text-muted">Free Plan</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 md:ml-64 p-8">
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    );
}
