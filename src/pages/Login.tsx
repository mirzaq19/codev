import { useNavigate } from 'react-router-dom';
import { asyncLoginUser } from '@/services/states/auth-slice';
import { useAppDispatch } from '@/app/hooks';
import LoginInput from '@/components/content/LoginInput';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const status = await dispatch(asyncLoginUser({ email, password }));
    if (status) navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <LoginInput handleLogin={handleLogin} />
    </div>
  );
}

export default Login;
