import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ThreadList, { ThreadWithOwner } from '@/components/layout/ThreadList';
import CategoryList from '@/components/layout/CategoryList';
import { asyncPopulateUsersAndThreads } from '@/services/states/share-thunk';

// const categories: string[] = ['React', 'Vue', 'Angular'];

// const cards: CardProps[] = [
//   {
//     id: '1',
//     title: 'How to use React Query',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     category: 'React',
//     ownerId: '1',
//     upVotesBy: ['1', '2'],
//     downVotesBy: ['3'],
//     totalComments: 5,
//     createdAt: '2021-10-10',
//   },
//   {
//     id: '2',
//     title: 'How to use Vue Query',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     category: 'Vue',
//     ownerId: '1',
//     upVotesBy: ['1', '2'],
//     downVotesBy: ['3'],
//     totalComments: 5,
//     createdAt: '2021-10-10',
//   },
//   {
//     id: '3',
//     title: 'How to use Angular Query',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     category: 'Angular',
//     ownerId: '1',
//     upVotesBy: ['1', '2'],
//     downVotesBy: ['3'],
//     totalComments: 5,
//     createdAt: '2021-10-10',
//   },
// ];

function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { threads } = useAppSelector((state) => state.thread);
  const { users } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, []);

  useEffect(() => {
    const categoriesRaw = threads.map((thread) => thread.category);
    setCategories([...new Set(categoriesRaw)]);
  }, [threads]);

  const threadList = threads.map((thread) => {
    const user = users.find((u) => u.id === thread.ownerId);
    return {
      ...thread,
      owner: user,
    };
  }) as ThreadWithOwner[];

  console.log('threadList', threads);

  return (
    <div className="min-h-main mt-4 px-4 lg:px-0">
      <h1 className="mb-4">Home</h1>
      <CategoryList categories={categories} />
      <ThreadList threads={threadList} />
    </div>
  );
}

export default Home;
