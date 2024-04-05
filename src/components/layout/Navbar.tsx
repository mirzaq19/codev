import Container from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import codevlogo from '@/assets/logo/codev-logo.svg';
import { Button } from '../ui/button';

type NavbarProps = {
  classname?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Navbar = ({ classname, ...rest }: NavbarProps) => {
  return (
    <nav className={cn('bg-white', classname)} {...rest}>
      <Container>
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <img src={codevlogo} alt="Codev logo" className="w-8 h-8" />
            <Link to="/" className="text-xl font-title font-bold">
              Co-Dev
            </Link>
          </div>
          <div>
            <ul className="flex items-center space-x-2">
              <li>
                <Button size="sm">
                  <Link to="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button size="sm" variant="outline">
                  <Link to="/register">Register</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
