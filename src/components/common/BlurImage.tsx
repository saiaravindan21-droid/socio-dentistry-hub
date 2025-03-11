
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const BlurImage = ({ src, alt, className, width, height }: BlurImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [src]);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'transition-all duration-500 ease-in-out',
        isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100',
        className
      )}
    />
  );
};

export default BlurImage;
