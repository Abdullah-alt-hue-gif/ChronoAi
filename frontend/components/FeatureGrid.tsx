interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface FeatureGridProps {
    features: Feature[];
    columns?: 2 | 3;
}

export default function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
    return (
        <div className={`grid md:grid-cols-${columns} gap-8`}>
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-text-muted/10 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 group"
                >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-3">{feature.title}</h3>
                    <p className="text-text-muted leading-relaxed">{feature.description}</p>
                </div>
            ))}
        </div>
    );
}
