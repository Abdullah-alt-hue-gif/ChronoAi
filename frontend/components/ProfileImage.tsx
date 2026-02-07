'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProfileImageProps {
    src: string;
    alt: string;
    name: string;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export default function ProfileImage({ 
    src, 
    alt, 
    name, 
    size = 'medium', 
    className = '' 
}: ProfileImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const sizeClasses = {
        small: 'w-20 h-20',
        medium: 'w-24 h-24',
        large: 'w-40 h-40'
    };

    const textSizes = {
        small: 'text-2xl',
        medium: 'text-3xl',
        large: 'text-5xl'
    };

    const handleError = () => {
        setImgSrc('');
    };

    const initials = name.split(' ').map(n => n[0]).join('');

    return (
        <div 
            className={`
                ${sizeClasses[size]} 
                ${sizeClasses[size].replace('w-', 'min-w-').replace('h-', 'min-h-')} 
                rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 
                border-2 border-primary/20 relative group shadow-md hover:shadow-xl transition-shadow duration-300
                ${className}
            `}
        >
            {imgSrc ? (
                <>
                    {isLoading && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                            <div className={`${textSizes[size]} font-bold text-primary animate-pulse`}>
                                {initials}
                            </div>
                        </div>
                    )}
                    <Image
                        src={imgSrc}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={handleError}
                        onLoad={() => setIsLoading(false)}
                        sizes="(max-width: 768px) 96px, 160px"
                    />
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <div className={`${textSizes[size]} font-bold text-primary`}>
                        {initials}
                    </div>
                </div>
            )}
        </div>
    );
}