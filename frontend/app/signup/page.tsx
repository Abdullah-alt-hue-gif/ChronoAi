'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, endpoints } from '@/lib/api';

export default function SignupPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.post(endpoints.auth.signup, { email, username, password, full_name: fullName });
            router.push('/login');
        } catch (err: any) {
            setError(err.message || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-page px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-text-muted/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-main mb-2">Create Account</h1>
                    <p className="text-text-muted">Join ChronoAI and schedule smarter</p>
                </div>

                {error && (
                    <div className="bg-warning/10 text-warning p-3 rounded-lg mb-4 text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-text-muted/20 focus:border-primary focus:outline-none transition-colors"
                            placeholder="maryam123"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-text-muted/20 focus:border-primary focus:outline-none transition-colors"
                            placeholder="Maryam"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-text-muted/20 focus:border-primary focus:outline-none transition-colors"
                            placeholder="you@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-text-muted/20 focus:border-primary focus:outline-none transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Create Account' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-text-muted">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
