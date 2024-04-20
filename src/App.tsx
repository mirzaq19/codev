import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import Register from '@/pages/Register';
import LoadingProgress from '@/components/LoadingProgress';
import useLogin from '@/hooks/useLogin';
import ScrollToTop from '@/components/ScrollToTop';
import ThreadDetail from '@/pages/ThreadDetail';
import Leaderboard from '@/pages/Leaderboard';
import NewThread from '@/pages/NewThread';
import PublicRoute from '@/routes/PublicRoute';
import PrivateRoute from '@/routes/PrivateRoute';
import { useAppDispatch } from '@/app/hooks';
import { asyncGetLeaderboards } from './services/states/leaderboard-slice';
import ErrorPage from '@/pages/ErrorPage';
import AuthVerifyRoute from '@/routes/AuthVerifyRoute';
import Footer from '@/components/content/Footer';

function App() {
  const { loginDispatch } = useLogin();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loginDispatch({
      successAction: async () => {
        await dispatch(asyncGetLeaderboards());
      },
      errorAction: (error) => {
        console.log('error action', error.message);
      },
    });
  }, []);

  return (
    <AuthVerifyRoute>
      <LoadingProgress />
      <div className="bg-gray-100">
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<PublicRoute restricted={false} />}>
              <Route path="/" element={<Home />} />
              <Route path="/thread/:id" element={<ThreadDetail />} />
              <Route path="/leaderboards" element={<Leaderboard />} />
            </Route>
            <Route path="/" element={<PublicRoute restricted />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/new-thread" element={<NewThread />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Toaster />
        </Container>
        <Footer />
      </div>
      <ScrollToTop />
    </AuthVerifyRoute>
  );
}

export default App;
