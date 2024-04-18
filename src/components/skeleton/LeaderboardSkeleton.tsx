import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type LeaderboardSkeletonProps = {
  row?: number;
  classname?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function LeaderboardSkeleton({
  row = 3,
  className,
  ...rest
}: LeaderboardSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)} {...rest}>
      <div className="flex gap-4">
        <div className="flex-none">
          <Skeleton className="bg-gray-200 h-4 w-16" />
        </div>
        <div className="grow flex gap-2">
          <Skeleton className="bg-gray-200 h-4 w-16" />
        </div>
        <div>
          <Skeleton className="flex-none bg-gray-200 h-4 w-20" />
        </div>
      </div>
      {Array.from({ length: row as number }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="flex gap-4" key={index}>
          <div className="flex-none flex items-center">
            <Skeleton className="bg-gray-200 h-4 w-16" />
          </div>
          <div className="grow flex gap-2 items-center">
            <Skeleton className="bg-gray-200 h-8 w-8 rounded-full" />
            <Skeleton className="bg-gray-200 h-4 w-32" />
          </div>
          <div className="flex items-center">
            <Skeleton className="flex-none bg-gray-200 h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardSkeleton;
