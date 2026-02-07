interface LoadingSkeletonProps {
    className?: string;
    children?: React.ReactNode;
}

export default function LoadingSkeleton({ className = "", children }: LoadingSkeletonProps) {
    return (
        <div className={`animate-pulse ${className}`}>
            {children || <div className="h-4 bg-slate-200 rounded"></div>}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-text-muted/10">
            <div className="space-y-4">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 3 }: { rows?: number }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-text-muted/10 overflow-hidden">
            <div className="p-6 border-b border-text-muted/10">
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            </div>
            <div className="divide-y divide-text-muted/10">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="p-6 flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                            <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                            <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                        </div>
                        <div className="h-8 bg-slate-200 rounded w-20"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ButtonSkeleton({ width = "w-24" }: { width?: string }) {
    return (
        <div className={`h-10 ${width} bg-slate-200 rounded-lg animate-pulse`}></div>
    );
}

export function TimelineSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-medium border border-text-muted/10">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-6"></div>
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="relative pl-8">
                        <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                        <div className="bg-slate-50 rounded-xl p-5 h-24 w-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}