import { User } from '@/types/auth';
import { Comment } from '@/types/comment';

export type Thread = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
};

export type ThreadWithOwner = Thread & { owner: User };

export type DetailThread = Omit<Thread, 'ownerId'> & {
  owner: Omit<User, 'email'>;
} & { comments: Comment[] };

export type VoteRequest = {
  threadId: string;
  userId: string;
};
