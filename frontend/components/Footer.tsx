'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isExcluded = pathname?.startsWith('/dashboard') || pathname?.startsWith('/wizard');

    if (isExcluded) return null;

    return (
        <footer className="bg-white border-t border-text-muted/10 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">⏳</span>
                        <span className="font-bold text-text-main">ChronoAI</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">
                        The intelligent scheduling platform for modern events. No conflicts, just clarity.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-text-main mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                        <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                        <li><Link href="/integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
                        <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-text-main mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                        <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                        <li><Link href="/api-reference" className="hover:text-primary transition-colors">API Reference</Link></li>
                        <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="/resources" className="hover:text-primary transition-colors">Guides</Link></li>
                    </ul>
                </div>

<div>
                    <h4 className="font-semibold text-text-main mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                        <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
                        <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-text-muted/10 text-center md:text-left text-sm text-text-muted">
                <p>&copy; {new Date().getFullYear()} ChronoAI Inc. All rights reserved.</p>
            </div>
        </footer>
    );
}
