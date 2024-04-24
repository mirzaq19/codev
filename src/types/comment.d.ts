import { User } from '@/types/auth';

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
} & { owner: Omit<User, 'email'> };

export type CommentRequest = {
  comment: Comment;
  threadId: string;
};

export type CommentAsyncRequest = {
  threadId: string;
  content: string;
};
