import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type CategoryListProps = {
  categories: string[];
  className?: string;
} & Omit<
  ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>,
  'ref'
>;

function CategoryList({ categories, className, ...rest }: CategoryListProps) {
  return (
    <ScrollArea className={className} {...rest}>
      <div className="flex gap-2 mb-3 overflow-auto">
        {categories.map((category: string) => (
          <Button key={category} variant="outline">
            #{category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default CategoryList;
