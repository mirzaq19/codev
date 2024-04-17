import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { asyncGetDetailThread } from '@/services/states/thread-slice';
import ThreadDetailItem from '@/components/content/ThreadDetailItem';
import { DetailThread } from '@/types/thread';
import ThreadSkeleton from '@/components/skeleton/ThreadSkeleton';

function ThreadDetail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { detailThread } = useAppSelector((state) => state.thread);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDetailThread = async () => {
      await dispatch(asyncGetDetailThread(id as string));
      setLoading(false);
    };
    fetchDetailThread();
  }, [id]);

  return (
    <div className="min-h-main mt-4 px-4 lg:px-0">
      {loading && <ThreadSkeleton className="mt-4" />}
      {!loading && <ThreadDetailItem thread={detailThread as DetailThread} />}
    </div>
  );
}

export default ThreadDetail;
