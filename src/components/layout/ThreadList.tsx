import { cn } from '@/lib/utils';
import { ThreadWithOwner } from '@/types/thread';
import ThreadItem from '@/components/content/ThreadItem';

type ThreadListProps = {
  threads: ThreadWithOwner[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ThreadList({ threads, className, ...rest }: ThreadListProps) {
  return (
    <div className={cn('space-y-2', className)} {...rest}>
      {threads.map((thread: ThreadWithOwner) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadList;
