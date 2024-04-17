import parse from 'html-react-parser';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { timeDiff } from '@/lib/utils';
import { ThreadWithOwner } from '@/types/thread';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  asyncDownVotes,
  asyncNeutralizeVotes,
  asyncUpVotes,
} from '@/services/states/thread-slice';

type ThreadItemProps = {
  thread: ThreadWithOwner;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ThreadItem({ thread, className, ...rest }: ThreadItemProps) {
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
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={thread.owner.avatar} />
              <AvatarFallback>{thread.owner.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base md:text-lg font-bold">
                {thread.owner.name}
              </h3>
              <span className="text-gray-500 text-sm">
                {thread.owner.email}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row justify-between">
            <div>
              <Link to="/">
                <CardTitle className="line-clamp-2 hover:underline">
                  {thread.title}
                </CardTitle>
              </Link>
              <div className="bg-green-50 text-gray-600 rounded mt-2 w-fit px-2 hover:underline">
                #{thread.category}
              </div>
            </div>
            <CardDescription>{timeDiff(thread.createdAt)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="line-clamp-4 leading-snug break-words">
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

export default ThreadItem;
