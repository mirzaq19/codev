import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChevronDown, ChevronUp } from 'lucide-react';
import parse from 'html-react-parser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { timeDiff } from '@/lib/utils';
import { Comment } from '@/types/comment';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  asyncDownVotesComment,
  asyncNeutralizeVotesComment,
  asyncUpVotesComment,
} from '@/services/states/thread-slice';

type CommentItemProps = {
  comment: Comment;
  threadId: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function CommentItem({
  comment,
  threadId,
  className,
  ...rest
}: CommentItemProps) {
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const upvoted = user?.id && comment.upVotesBy.includes(user.id);
  const downvoted = user?.id && comment.downVotesBy.includes(user.id);
  const hasToNeutralize = upvoted || downvoted;

  const onUpVote = (commentId: string) => {
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
      return;
    }
    if (hasToNeutralize) {
      dispatch(
        asyncNeutralizeVotesComment({
          threadId,
          commentId,
          userId: user?.id as string,
        }),
      );
      if (upvoted) return;
    }
    dispatch(
      asyncUpVotesComment({ threadId, commentId, userId: user?.id as string }),
    );
  };

  const onDownVote = (commentId: string) => {
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
      return;
    }
    if (hasToNeutralize) {
      dispatch(
        asyncNeutralizeVotesComment({
          threadId,
          commentId,
          userId: user?.id as string,
        }),
      );
      if (downvoted) return;
    }
    dispatch(
      asyncDownVotesComment({
        threadId,
        commentId,
        userId: user?.id as string,
      }),
    );
  };

  return (
    <div className={className} {...rest}>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={comment.owner.avatar} />
              <AvatarFallback>{comment.owner.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base md:text-lg font-bold">
                {comment.owner.name}
              </h3>
              <p className="text-gray-500 text-xs">
                Posted{' '}
                <span className="font-bold">{timeDiff(comment.createdAt)}</span>
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div>{parse(comment.content)}</div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => onUpVote(comment.id)}
            variant="ghost"
            className={`space-x-2 ${upvoted ? 'bg-green-50' : ''}`}
            size="sm"
          >
            <ChevronUp className="w-5 h-5" />
            <p className="text-sm">{comment.upVotesBy.length}</p>
          </Button>
          <Button
            onClick={() => onDownVote(comment.id)}
            variant="ghost"
            className={`space-x-2 ${downvoted ? 'bg-red-50' : ''}`}
            size="sm"
          >
            <ChevronDown className="w-5 h-5" />
            <p>{comment.downVotesBy.length}</p>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CommentItem;
