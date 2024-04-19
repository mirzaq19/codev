import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <span
      role="alert"
      className={cn('text-sm font-normal text-destructive', className)}
    >
      {message}
    </span>
  );
}
