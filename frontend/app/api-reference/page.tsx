export default function ApiReferencePage() {
    return (
        <div className="bg-bg-page min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-text-main mb-4">API Reference</h1>
                <p className="text-text-muted mb-12 max-w-2xl">
                    Integrate ChronoAI directly into your applications. All endpoints are prefixed with <code className="bg-white px-2 py-1 rounded border border-text-muted/20">/api/v1</code>.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Endpoint Documentation */}
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4">Authentication</h2>
                            <p className="text-text-muted mb-4">
                                ChronoAI uses API keys to allow access to the API. You can register a new API key at our <a href="/dashboard" className="text-primary hover:underline">developer portal</a>.
                            </p>
                            <div className="bg-white rounded-lg p-4 border border-text-muted/10 font-mono text-sm">
                                Authorization: Bearer YOUR_API_KEY
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">POST</span>
                                <h2 className="text-xl font-bold text-text-main">/events</h2>
                            </div>
                            <p className="text-text-muted mb-4">Create a new event configuration.</p>

                            <h3 className="font-bold text-text-main mb-2 mt-6">Parameters</h3>
                            <div className="bg-white rounded-lg border border-text-muted/10 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-bg-page border-b border-text-muted/10">
                                        <tr>
                                            <th className="p-3 font-semibold text-text-main">Field</th>
                                            <th className="p-3 font-semibold text-text-main">Type</th>
                                            <th className="p-3 font-semibold text-text-main">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-text-muted/5">
                                            <td className="p-3 font-mono text-primary">name</td>
                                            <td className="p-3 text-text-muted">string</td>
                                            <td className="p-3 text-text-muted">Name of the event</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-primary">type</td>
                                            <td className="p-3 text-text-muted">string</td>
                                            <td className="p-3 text-text-muted">One of: tournament, conference, hackathon</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Code Snippets */}
                    <div className="space-y-6">
                        <div className="bg-[#1e293b] rounded-xl p-6 shadow-xl text-white">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase">cURL Request</span>
                                <button className="text-xs text-primary hover:text-white transition-colors">Copy</button>
                            </div>
                            <pre className="font-mono text-sm overflow-x-auto">
                                {`curl -X POST https://api.chronoai.com/v1/events \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Tech Summit 2026",
    "type": "conference",
    "start_date": "2026-10-15T09:00:00Z"
  }'`}
                            </pre>
                        </div>

                        <div className="bg-[#1e293b] rounded-xl p-6 shadow-xl text-white">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase">JSON Response</span>
                            </div>
                            <pre className="font-mono text-sm overflow-x-auto text-emerald-400">
                                {`{
  "id": "evt_123456789",
  "status": "created",
  "created_at": "2026-02-06T12:00:00Z"
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
