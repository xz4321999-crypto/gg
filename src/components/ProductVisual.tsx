import React, { useEffect, useState } from 'react';
import { Headphones, Keyboard, Monitor, Mouse } from 'lucide-react';
import { CategoryId } from '../types';

interface ProductVisualProps {
  src: string;
  alt: string;
  category: Exclude<CategoryId, CategoryId.All>;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  src,
  alt,
  category,
  className = '',
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setFailed(false);
    setRetryCount(0);
  }, [src]);

  const renderFallbackIcon = () => {
    switch (category) {
      case CategoryId.MiceAndPads:
        return <Mouse className="h-12 w-12 text-[#D6B45A]" />;
      case CategoryId.KeyboardsAndCaps:
        return <Keyboard className="h-12 w-12 text-[#00E5FF]" />;
      case CategoryId.AudioAndMics:
        return <Headphones className="h-12 w-12 text-[#D946EF]" />;
      case CategoryId.DeskAndCables:
        return <Monitor className="h-12 w-12 text-[#D6B45A]" />;
    }
  };

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#152A42] via-[#0B192C] to-[#1A3352] p-6 text-center ${className}`}
      >
        {renderFallbackIcon()}
        <span className="line-clamp-2 text-xs font-medium text-[#CBD5E1]">{alt}</span>
      </div>
    );
  }

  const isExternal = /^https?:\/\//i.test(src);
  const effectiveSrc =
    retryCount > 0 ? `${src}${src.includes('?') ? '&' : '?'}r=${retryCount}` : src;

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      referrerPolicy={isExternal ? 'no-referrer' : undefined}
      loading={loading}
      decoding="async"
      onError={() => {
        if (retryCount < 1) {
          setRetryCount((prev) => prev + 1);
        } else {
          setFailed(true);
        }
      }}
      className={className}
    />
  );
};
