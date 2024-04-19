import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { asyncPostNewComment } from '@/services/states/thread-slice';

const formSchema = z.object({
  comment: z.string().min(1, {
    message: 'You must enter a comment.',
  }),
});

type CommentBoxProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function CommentBox({ className, ...rest }: CommentBoxProps) {
  const [loading, setLoading] = useState(false);
  const { detailThread } = useAppSelector((state) => state.thread);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { comment } = values;
    console.log(comment);
    await dispatch(
      asyncPostNewComment({
        threadId: detailThread?.id as string,
        content: comment,
      }),
    );
    setLoading(false);
    form.reset();
  };
  return (
    <div className={cn('bg-white rounded-lg p-4', className)} {...rest}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your comment here..."
                    className="resize-none min-h-28 placeholder-shown:min-h-3 transition-all duration-200 ease-in-out focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-normal text-sm" />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className={`w-full ${form.formState.isDirty ? 'inline-flex' : 'hidden'}`}
            type="submit"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Send Comment</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CommentBox;
