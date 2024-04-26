import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  asyncGetDetailThread,
  asyncPostNewComment,
} from '@/services/states/thread-slice';
import ThreadDetailItem from '@/components/content/ThreadDetailItem';
import { DetailThread } from '@/types/thread';
import ThreadSkeleton from '@/components/skeleton/ThreadSkeleton';
import CommentItem from '@/components/content/CommentItem';
import CommentBox from '@/components/content/CommentBox';
import ErrorInfo from '@/components/content/ErrorInfo';

function ThreadDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { detailThread } = useAppSelector((state) => state.thread);
  const { authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDetailThread = async () => {
      const status = await dispatch(asyncGetDetailThread(id as string));
      if (!status) setError(true);
      setLoading(false);
    };
    fetchDetailThread();
  }, [id]);

  const onCommentSubmit = async (comment: string) => {
    await dispatch(
      asyncPostNewComment({
        threadId: detailThread?.id as string,
        content: comment,
      }),
    );
  };

  if (error) {
    return (
      <div className="min-h-main flex flex-col justify-center items-center">
        <ErrorInfo
          statusCode={404}
          title="Thread not found"
          desc="The thread you are looking for is not found"
        />
      </div>
    );
  }

  return (
    <div className="min-h-main mt-4 py-4 px-4 lg:px-0">
      {loading && <ThreadSkeleton className="mt-4" />}
      {!loading && (
        <>
          <ThreadDetailItem thread={detailThread as DetailThread} />
          {!authenticated && (
            <div className="bg-white p-4 rounded-lg mt-4">
              <p className="text-center text-slate-700">
                Please{' '}
                <Link className="hover:underline" to="/login">
                  <b>login</b>
                </Link>{' '}
                to comment
              </p>
            </div>
          )}
          {authenticated && (
            <CommentBox onCommentSubmit={onCommentSubmit} className="mt-4" />
          )}
          <div>
            <h2 className="text-xl font-bold my-4">
              Comments ({detailThread?.comments.length})
            </h2>
            <div className="space-y-2">
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
