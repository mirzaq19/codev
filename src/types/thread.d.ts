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

export type DetailThread = Omit<Thread, 'ownerId' | 'totalComments'> & {
  owner: Omit<User, 'email'>;
} & { comments: Comment[] };

export type NewThreadRequest = {
  title: string;
  body: string;
  category?: string;
};

export type VoteRequest = {
  threadId: string;
  userId: string;
};

export type VoteCommentRequest = {
  threadId: string;
  commentId: string;
  userId: string;
};
