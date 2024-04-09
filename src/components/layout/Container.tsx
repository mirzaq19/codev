import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function Container({ children, ...rest }: ContainerProps) {
  return (
    <div className={cn('w-full lg:max-w-5xl mx-auto')} {...rest}>
      {children}
    </div>
  );
}

export default Container;
