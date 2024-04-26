import { cn } from '@/lib/utils';
import { asyncLoginUser } from '@/services/states/auth-slice';
import { useAppDispatch } from '@/app/hooks';
import LoginInput from '@/components/content/LoginInput';

function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    const status = await dispatch(asyncLoginUser({ email, password }));
    return status;
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <div
        className={cn('max-w-3xl w-full mx-auto', 'bg-white rounded-md p-8')}
      >
        <LoginInput handleLogin={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
