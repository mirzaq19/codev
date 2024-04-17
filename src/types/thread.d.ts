import { User } from '@/types/auth';

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

export type VoteRequest = {
  threadId: string;
  userId: string;
};
