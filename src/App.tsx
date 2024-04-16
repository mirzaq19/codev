import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import Register from '@/pages/Register';
import LoadingProgress from '@/components/LoadingProgress';

function App() {
  return (
    <>
      <LoadingProgress />
      <div className="bg-gray-100">
        <Navbar />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Toaster />
        </Container>
      </div>
    </>
  );
}

export default App;
