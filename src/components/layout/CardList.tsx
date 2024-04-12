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
import type { CardProps } from '@/types/card';
import { cn } from '@/lib/utils';

type CardListProps = {
  cards: CardProps[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function CardList({ cards, className, ...rest }: CardListProps) {
  return (
    <div className={cn('space-y-2', className)} {...rest}>
      {cards.map((card: CardProps) => (
        <Card key={card.id}>
          <CardHeader className="pb-2">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/unknown.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-base md:text-lg font-bold">John Doe</h3>
                <span className="text-gray-500 text-sm">john@gmail.com</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row justify-between">
              <div>
                <Link to="/">
                  <CardTitle className="hover:underline">
                    {card.title}
                  </CardTitle>
                </Link>
                <div className="bg-green-50 text-gray-600 rounded mt-2 w-fit px-2 hover:underline">
                  #{card.category}
                </div>
              </div>
              <CardDescription>{card.createdAt}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p>{card.body}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="md:space-x-2">
              <Button variant="ghost" className="space-x-2">
                <ThumbsUp className="w-5 h-5" />
                <p className="text-sm">
                  {card.upVotesBy.length}{' '}
                  <span className="hidden md:inline">Upvotes</span>
                </p>
              </Button>
              <Button variant="ghost" className="space-x-2">
                <ThumbsDown className="w-5 h-5" />
                <p>
                  {card.downVotesBy.length}{' '}
                  <span className="hidden md:inline">Downvotes</span>
                </p>
              </Button>
            </div>
            <Button variant="ghost" className="space-x-2">
              <MessageCircleMore className="w-5 h-5" />
              <p>
                {card.totalComments}{' '}
                <span className="hidden md:inline">Comments</span>
              </p>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default CardList;
