import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ThreadList from '@/components/layout/ThreadList';
import CategoryList from '@/components/layout/CategoryList';
import { asyncPopulateUsersAndThreads } from '@/services/states/share-thunk';
import { Skeleton } from '@/components/ui/skeleton';
import ThreadSkeleton from '@/components/skeleton/ThreadSkeleton';
import { ThreadWithOwner } from '@/types/thread';
import { Button } from '@/components/ui/button';

function Home() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { threads } = useAppSelector((state) => state.thread);
  const { users } = useAppSelector((state) => state.user);
  const { authenticated } = useAppSelector((state) => state.auth);

  const activeCategory = searchParams.get('category');

  useEffect(() => {
    const fetchUsersAndThreads = async () => {
      await dispatch(asyncPopulateUsersAndThreads());
      setLoading(false);
    };
    fetchUsersAndThreads();
  }, [activeCategory]);

  const onClickCategory = (category: string) => {
    setSearchParams({ category });
  };

  const categories = useMemo(
    () => [...new Set(threads.map((thread) => thread.category))],
    [threads],
  );

  const filteredThreads = activeCategory
    ? threads.filter((thread) => thread.category === activeCategory)
    : threads;

  const threadList = useMemo(
    () =>
      filteredThreads.map((thread) => {
        const user = users.find((u) => u.id === thread.ownerId);
        return {
          ...thread,
          owner: user,
        };
      }) as ThreadWithOwner[],
    [threads, users],
  );

  return (
    <div className="min-h-main mt-4 px-4 lg:px-0">
      <h1 className="mb-4">Home</h1>
      {loading && (
        <>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 bg-slate-300" />
            <Skeleton className="h-8 w-24 bg-slate-300" />
            <Skeleton className="h-8 w-24 bg-slate-300" />
          </div>
          <ThreadSkeleton className="mt-4" />
        </>
      )}
      {!loading && (
        <>
          <h3 className=" mb-4">Categories</h3>
          <CategoryList
            activeCategory={activeCategory}
            onClickCategory={onClickCategory}
            categories={categories}
          />
          <h3 className=" mb-4">Threads</h3>
          {authenticated && (
            <Button
              to="/new-thread"
              className="fixed right-4 bottom-12 transition-all duration-200 hover:bottom-11 md:mb-4 md:static"
            >
              Create a new Thread
            </Button>
          )}
          <ThreadList threads={threadList} />
        </>
      )}
    </div>
  );
}

export default Home;
