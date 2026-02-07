'use client';

export default function ContactPage() {
    return (
        <div className="bg-bg-page min-h-screen py-20 px-6">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
                {/* Info Panel */}
                <div className="bg-midnight-blue p-12 text-white md:w-2/5 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                        <p className="text-white/80 leading-relaxed mb-8">
                            Have questions about enterprise plans, integrations, or just want to say hi? We'd love to hear from you.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span>📧</span>
                                <a href="mailto:hello@chronoai.com" className="hover:underline">hello@chronoai.com</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span>📍</span>
                                <span>123 AI Boulevard, San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        {/* Social Icons */}
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition-colors"></div>
                        ))}
                    </div>
                </div>

                {/* Form Panel */}
                <div className="p-12 md:w-3/5">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:outline-none bg-bg-page" placeholder="Your Name" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:outline-none bg-bg-page" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Message</label>
                            <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-text-muted/20 focus:border-primary focus:outline-none bg-bg-page" placeholder="How can we help?" required></textarea>
                        </div>
                        <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg transition-all">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
