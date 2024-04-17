import { MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import parse from 'html-react-parser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { timeDiff } from '@/lib/utils';
import { DetailThread } from '@/types/thread';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  asyncDownVotes,
  asyncNeutralizeVotes,
  asyncUpVotes,
} from '@/services/states/thread-slice';

type ThreadDetailItemProps = {
  thread: DetailThread;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ThreadDetailItem({
  thread,
  className,
  ...rest
}: ThreadDetailItemProps) {
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const upvoted = user?.id && thread.upVotesBy.includes(user.id);
  const downvoted = user?.id && thread.downVotesBy.includes(user.id);
  const hasToNeutralize = upvoted || downvoted;

  const onUpVote = (threadId: string) => {
    if (!authenticated) {
      toast.error(() => (
        <span>
          You need to{' '}
          <Link className="font-bold hover:underline" to="/login">
            login
          </Link>{' '}
          to upvote
        </span>
      ));
    }
    if (hasToNeutralize) {
      dispatch(asyncNeutralizeVotes({ threadId, userId: user?.id as string }));
      if (upvoted) return;
    }
    dispatch(asyncUpVotes({ threadId, userId: user?.id as string }));
  };

  const onDownVote = (threadId: string) => {
    if (!authenticated) {
      toast.error(() => (
        <span>
          You need to{' '}
          <Link className="font-bold hover:underline" to="/login">
            login
          </Link>{' '}
          to downvote
        </span>
      ));
    }
    if (hasToNeutralize) {
      dispatch(asyncNeutralizeVotes({ threadId, userId: user?.id as string }));
      if (downvoted) return;
    }
    dispatch(asyncDownVotes({ threadId, userId: user?.id as string }));
  };

  return (
    <div className={className} {...rest}>
      <Card key={thread.id}>
        <CardHeader className="pb-2">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={thread.owner.avatar} />
              <AvatarFallback>{thread.owner.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base md:text-lg font-bold">
                {thread.owner.name}
              </h3>
              <p className="text-gray-500 text-xs">
                Posted{' '}
                <span className="font-bold">{timeDiff(thread.createdAt)}</span>
              </p>
            </div>
          </div>

          <CardTitle className="space-x-2">
            <span>{thread.title}</span>
            <span className="bg-green-100 text-sm font-normal leading-10 text-gray-600 rounded mt-2 h-fit w-fit px-2 py-1 hover:underline">
              #{thread.category}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>{parse(thread.body)}</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="md:space-x-2">
            <Button
              onClick={() => onUpVote(thread.id)}
              variant="ghost"
              className={`space-x-2 ${upvoted ? 'bg-green-50' : ''}`}
            >
              <ThumbsUp className="w-5 h-5" />
              <p className="text-sm">
                {thread.upVotesBy.length}{' '}
                <span className="hidden md:inline">Upvotes</span>
              </p>
            </Button>
            <Button
              onClick={() => onDownVote(thread.id)}
              variant="ghost"
              className={`space-x-2 ${downvoted ? 'bg-red-50' : ''}`}
            >
              <ThumbsDown className="w-5 h-5" />
              <p>
                {thread.downVotesBy.length}{' '}
                <span className="hidden md:inline">Downvotes</span>
              </p>
            </Button>
          </div>
          <Button variant="ghost" className="space-x-2">
            <MessageCircleMore className="w-5 h-5" />
            <p>
              {thread.totalComments}{' '}
              <span className="hidden md:inline">Comments</span>
            </p>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ThreadDetailItem;
