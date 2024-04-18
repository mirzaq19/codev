import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { asyncGetLeaderboards } from '@/services/states/leaderboard-slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LeaderboardSkeleton from '@/components/skeleton/LeaderboardSkeleton';

function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const { leaderboards } = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchLeaderboards = async () => {
      await dispatch(asyncGetLeaderboards());
      setLoading(false);
    };
    fetchLeaderboards();
  }, []);

  return (
    <div className="min-h-main p-4 lg:px-0">
      <div className="p-4 bg-white rounded-lg">
        <h1 className="mb-2">Leaderboard</h1>
        {loading && <LeaderboardSkeleton row={3} className="mt-4" />}
        {!loading && (
          <Table>
            <TableCaption>A list of recent leaderboard.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-[100px]">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboards.map((leaderboard, index) => (
                <TableRow key={leaderboard.user.id}>
                  <TableCell className="font-medium">{index + 1}.</TableCell>
                  <TableCell className="flex gap-2 items-center">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={leaderboard.user.avatar} />
                      <AvatarFallback>
                        {leaderboard.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{leaderboard.user.name}</span>
                  </TableCell>
                  <TableCell>{leaderboard.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
