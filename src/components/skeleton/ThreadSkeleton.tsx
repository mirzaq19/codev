import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type ThreadSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function ThreadSkeleton({ className, ...rest }: ThreadSkeletonProps) {
  return (
    <div className={cn('bg-white p-6 rounded-lg', className)} {...rest}>
      <Skeleton className="h-8 w-3/4 mb-2 bg-slate-300" />
      <Skeleton className="h-6 w-1/4 mb-4 bg-slate-300" />
      <Skeleton className="h-5 w-full mb-2 bg-slate-300" />
      <Skeleton className="h-5 w-full mb-2 bg-slate-300" />
      <Skeleton className="h-5 w-full mb-2 bg-slate-300" />
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-32 bg-slate-300" />
          <Skeleton className="h-8 w-32 bg-slate-300" />
        </div>
        <Skeleton className="h-8 w-32 bg-slate-300" />
      </div>
    </div>
  );
}

export default ThreadSkeleton;
