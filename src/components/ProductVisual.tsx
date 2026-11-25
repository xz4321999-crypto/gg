import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, Keyboard, Monitor, Mouse, Store } from 'lucide-react';
import { CategoryId } from '../types';

function resolveAssetUrl(src: string): string {
  if (!src) return '';
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  return `${normalizedBase}${cleanSrc}`;
}

function useResilientImage(src: string) {
  const resolvedSrc = useMemo(() => resolveAssetUrl(src), [src]);
  const [overrideSrc, setOverrideSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const attemptedRecoveryRef = useRef(false);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    attemptedRecoveryRef.current = false;
    setFailed(false);
    setOverrideSrc(null);

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [resolvedSrc]);

  const handleError = async () => {
    if (!resolvedSrc || /^(data:|blob:)/i.test(resolvedSrc)) {
      setFailed(true);
      return;
    }
    if (attemptedRecoveryRef.current) {
      setFailed(true);
      return;
    }
    attemptedRecoveryRef.current = true;

    try {
      const bustUrl = `${resolvedSrc}${resolvedSrc.includes('?') ? '&' : '?'}v=2`;
      const isExternal = /^https?:\/\//i.test(resolvedSrc);
      const res = await fetch(bustUrl, {
        cache: 'no-store',
        credentials: isExternal ? 'omit' : 'same-origin',
      });
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.startsWith('image/')) {
        setFailed(true);
        return;
      }
      const blob = await res.blob();
      if (blob.size < 100) {
        setFailed(true);
        return;
      }
      const objUrl = URL.createObjectURL(blob);
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      objectUrlRef.current = objUrl;
      setOverrideSrc(objUrl);
    } catch {
      setFailed(true);
    }
  };

  return {
    effectiveSrc: overrideSrc ?? resolvedSrc,
    failed,
    handleError,
  };
}

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
  const { effectiveSrc, failed, handleError } = useResilientImage(src);

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

  if (failed || !effectiveSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#152A42] via-[#0B192C] to-[#1A3352] p-6 text-center ${className}`}
      >
        {renderFallbackIcon()}
        <span className="line-clamp-2 text-xs font-medium text-[#CBD5E1]">{alt}</span>
      </div>
    );
  }

  const isExternal = /^https?:\/\//i.test(effectiveSrc);

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      referrerPolicy={isExternal ? 'no-referrer' : undefined}
      loading={loading}
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
};

interface StoreImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  compact?: boolean;
}

export const StoreImage: React.FC<StoreImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'eager',
  compact = false,
}) => {
  const { effectiveSrc, failed, handleError } = useResilientImage(src);

  if (failed || !effectiveSrc) {
    return (
      <div
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#152A42] via-[#0B192C] to-[#1A3352] text-center ${
          compact ? 'p-2' : 'p-4'
        } ${className}`}
      >
        <Store className={compact ? 'h-6 w-6 text-[#D6B45A]' : 'h-10 w-10 text-[#D6B45A]'} />
        {!compact && (
          <span className="line-clamp-2 text-xs font-medium text-[#CBD5E1]">{alt}</span>
        )}
      </div>
    );
  }

  const isExternal = /^https?:\/\//i.test(effectiveSrc);

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      referrerPolicy={isExternal ? 'no-referrer' : undefined}
      loading={loading}
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
};
