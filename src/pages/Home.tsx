import CardList from '@/components/layout/CardList';
import CategoryList from '@/components/layout/CategoryList';
import { CardProps } from '@/types/card';

const categories: string[] = ['React', 'Vue', 'Angular'];

const cards: CardProps[] = [
  {
    id: '1',
    title: 'How to use React Query',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'React',
    ownerId: '1',
    upVotesBy: ['1', '2'],
    downVotesBy: ['3'],
    totalComments: 5,
    createdAt: '2021-10-10',
  },
  {
    id: '2',
    title: 'How to use Vue Query',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Vue',
    ownerId: '1',
    upVotesBy: ['1', '2'],
    downVotesBy: ['3'],
    totalComments: 5,
    createdAt: '2021-10-10',
  },
  {
    id: '3',
    title: 'How to use Angular Query',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Angular',
    ownerId: '1',
    upVotesBy: ['1', '2'],
    downVotesBy: ['3'],
    totalComments: 5,
    createdAt: '2021-10-10',
  },
];

function Home() {
  return (
    <div className="min-h-main mt-4 px-4 lg:px-0">
      <h1 className="mb-4">Home</h1>
      <CategoryList categories={categories} />
      <CardList cards={cards} />
    </div>
  );
}

export default Home;
