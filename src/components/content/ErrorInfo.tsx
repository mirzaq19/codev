import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import errorImage from '@/assets/error.svg';

type ErrorInfoProps = {
  statusCode: number;
  title: string;
  desc: string;
  errorImageUrl?: typeof errorImage;
};

function ErrorInfo({
  statusCode,
  title,
  desc,
  errorImageUrl = errorImage,
}: ErrorInfoProps) {
  const navigate = useNavigate();

  const onBackHandler = () => {
    navigate('/');
  };

  return (
    <div className="text-center px-4">
      <img className="max-w-lg w-full" src={errorImageUrl} alt="error" />
      <h1 className="mt-8">{statusCode}</h1>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="flex justify-center">
        <Button onClick={onBackHandler} className="mt-4">
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default ErrorInfo;
