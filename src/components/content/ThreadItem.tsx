import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react';
import { User } from '@/types/auth';
import { Thread } from '@/types/thread';
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

type ThreadItemProps = {
  thread: Thread & { owner: User };
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ThreadItem({ thread, className, ...rest }: ThreadItemProps) {
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
            <Button variant="ghost" className="space-x-2">
              <ThumbsUp className="w-5 h-5" />
              <p className="text-sm">
                {thread.upVotesBy.length}{' '}
                <span className="hidden md:inline">Upvotes</span>
              </p>
            </Button>
            <Button variant="ghost" className="space-x-2">
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
