import { Link, useLocation } from 'react-router-dom';
import { LogOut, Zap } from 'lucide-react';
import Container from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import codevlogo from '@/assets/logo/codev-logo.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { asyncLogoutUser } from '@/services/states/auth-slice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type NavbarProps = {
  classname?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Navbar({ classname, ...rest }: NavbarProps) {
  const authState = useAppSelector((state) => state.auth);
  const { leaderboards } = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const logoutHandler = () => {
    dispatch(asyncLogoutUser());
  };

  const getCurrentScore = () =>
    leaderboards.find((l) => l.user.id === authState.user?.id)?.score;

  return (
    <nav
      className={cn(
        'bg-white sticky top-0 z-10 border-b border-gray-200',
        classname,
      )}
      {...rest}
    >
      <Container>
        <div className="flex justify-between items-center py-4 px-4 lg:px-0">
          <div className="flex items-center gap-3">
            <img src={codevlogo} alt="Codev logo" className="w-8 h-8" />
            <Link to="/" className="text-lg md:text-xl font-title font-bold">
              Co-Dev
            </Link>
            <Link to="/leaderboards">
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs md:text-sm transition-all duration-300 hover:bg-blue-50 ${pathname === '/leaderboards' ? 'bg-blue-50' : ''}`}
              >
                Leaderboards
              </Button>
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-4">
              {!authState.authenticated && (
                <>
                  <li>
                    <Link to="/login">
                      <Button size="sm">Login</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <Button size="sm" variant="outline">
                        Register
                      </Button>
                    </Link>
                  </li>
                </>
              )}
              {authState.authenticated && !authState.loading && (
                <>
                  <li className="">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            data-testid="leaderboard-score"
                            className="flex items-center gap-1 px-2 cursor-auto"
                          >
                            <Zap
                              className="w-5 text-zinc-900"
                              fill="#ffea00"
                              strokeWidth={1.2}
                            />
                            <span className="text-gray-700 font-semibold">
                              {getCurrentScore() ?? 0}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Leaderboard Score</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                  <li className="flex items-center">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src={authState.user?.avatar} />
                          <AvatarFallback>
                            {authState.user?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          <p>{authState.user?.name}</p>
                          <p className="text-gray-500 text-xs">
                            {authState.user?.email}
                          </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="space-x-1 cursor-pointer"
                          onClick={logoutHandler}
                        >
                          <LogOut className="h-4 w-4 text-gray-600" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </>
              )}
              {authState.authenticated && authState.loading && (
                <li className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
