import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ThreadList, { ThreadWithOwner } from '@/components/layout/ThreadList';
import CategoryList from '@/components/layout/CategoryList';
import { asyncPopulateUsersAndThreads } from '@/services/states/share-thunk';

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

  return (
    <div className="min-h-main mt-4 px-4 lg:px-0">
      <h1 className="mb-4">Home</h1>
      <CategoryList categories={categories} />
      <ThreadList threads={threadList} />
    </div>
  );
}

export default Home;
