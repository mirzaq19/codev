import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import codevlogo from '@/assets/logo/codev-logo.svg';
import { Button } from '../ui/button';

type NavbarProps = {
  classname?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Navbar({ classname, ...rest }: NavbarProps) {
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
          </div>
          <div>
            <ul className="flex items-center space-x-2">
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
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
