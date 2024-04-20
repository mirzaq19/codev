import { cn } from '@/lib/utils';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <div className={cn('w-full lg:max-w-5xl mx-auto', className)} {...rest}>
      {children}
    </div>
  );
}

export default Container;
