import { cn } from '@/lib/utils';

export function Grid({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-1 xl:grid-cols-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
