import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type CategoryListProps = {
  categories: string[];
  activeCategory: string | null;
  className?: string;
} & Omit<
  ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>,
  'ref'
>;

function CategoryList({
  categories,
  activeCategory,
  className,
  ...rest
}: CategoryListProps) {
  const [, setSearchParams] = useSearchParams();
  const onClickCategory = (category: string) => {
    setSearchParams({ category });
  };

  return (
    <ScrollArea className={className} {...rest}>
      <div className="flex gap-2 mb-3 overflow-auto">
        <Button
          variant={activeCategory ? 'outline' : 'default'}
          onClick={() => onClickCategory('')}
          to="/"
        >
          All
        </Button>
        {categories.map((category: string) => (
          <Button
            key={category}
            variant={category === activeCategory ? 'default' : 'outline'}
            onClick={() => onClickCategory(category)}
            to={`/?category=${category}`}
          >
            #{category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default CategoryList;
