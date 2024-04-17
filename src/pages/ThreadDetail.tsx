import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { asyncGetDetailThread } from '@/services/states/thread-slice';
import ThreadDetailItem from '@/components/content/ThreadDetailItem';
import { DetailThread } from '@/types/thread';
import ThreadSkeleton from '@/components/skeleton/ThreadSkeleton';
import CommentItem from '@/components/content/CommentItem';

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
    <div className="min-h-main mt-4 py-4 px-4 lg:px-0">
      {loading && <ThreadSkeleton className="mt-4" />}
      {!loading && (
        <>
          <ThreadDetailItem thread={detailThread as DetailThread} />
          <div>
            <h2 className="text-xl font-bold my-4">
              Comments ({detailThread?.comments.length})
            </h2>
            <div>
              {detailThread?.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  threadId={id as string}
                />
              ))}
              {detailThread?.comments.length === 0 && (
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-center text-slate-700">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ThreadDetail;
