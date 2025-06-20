import { Suspense } from 'react';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyLoad({ children, fallback }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback || <LoadingSkeleton height="200px" />}>
      {children}
    </Suspense>
  );
} 