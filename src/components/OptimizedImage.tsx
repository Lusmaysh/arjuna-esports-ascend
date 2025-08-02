import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazy?: boolean;
  priority?: boolean;
  webpSupport?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  lazy = true,
  priority = false,
  webpSupport = true,
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if WebP is supported
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    if (webpSupport) {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const supported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      setSupportsWebP(supported);
    }
  }, [webpSupport]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || imageSrc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, lazy, priority, imageSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  // Convert image URL to WebP if supported and source allows
  const getOptimizedSrc = (originalSrc: string) => {
    if (!supportsWebP || !webpSupport) return originalSrc;
    
    // For Supabase storage, we can request WebP format
    if (originalSrc.includes('supabase.co/storage')) {
      const url = new URL(originalSrc);
      url.searchParams.set('format', 'webp');
      return url.toString();
    }
    
    return originalSrc;
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder/Loading state */}
      {!isLoaded && imageSrc && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      <img
        ref={imgRef}
        src={imageSrc ? getOptimizedSrc(imageSrc) : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />
    </div>
  );
};