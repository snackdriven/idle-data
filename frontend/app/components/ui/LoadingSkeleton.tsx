import { FC } from 'react';

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  repeat?: number;
}

export const LoadingSkeleton: FC<LoadingSkeletonProps> = ({
  width,
  height,
  className = '',
  variant = 'text',
  repeat = 1,
}) => {
  const skeletons = Array.from({ length: repeat }, (_, index) => (
    <div
      key={index}
      className={`lj-skeleton lj-skeleton-${variant} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      role="status"
      aria-label="Loading..."
    />
  ));

  return <>{skeletons}</>;
}; 