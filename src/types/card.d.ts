export type CardProps = {
  id: string;
  title: string;
  body: string;
  category: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
  createdAt: string;
};
