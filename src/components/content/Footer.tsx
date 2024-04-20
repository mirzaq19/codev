import { Linkedin, Github, Heart } from 'lucide-react';
import Container from '@/components/layout/Container';
import { Button } from '../ui/button';

function Footer() {
  return (
    <Container className="mt-8">
      <div className="mt-4 px-4 py-5 flex justify-between items-center border-t border-t-gray-300">
        <p>
          <span className="font-semibold">&copy; 2024</span> | Made by with{' '}
          <Heart className="inline" size={20} fill="#f10082" strokeWidth={0} />{' '}
          <a
            target="_blank"
            href="https://github.com/mirzaq19"
            rel="noreferrer"
            className="font-semibold hover:underline"
          >
            Mirzaq
          </a>
        </p>
        <div className="flex gap-2">
          <a
            target="_blank"
            href="https://github.com/mirzaq19"
            rel="noreferrer"
            className="font-semibold hover:underline"
          >
            <Button className="px-2" variant="outline">
              <Github size={20} />
            </Button>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/mirzaq/"
            rel="noreferrer"
            className="font-semibold hover:underline"
          >
            <Button className="px-2" variant="outline">
              <Linkedin size={20} />
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
}
export default Footer;
