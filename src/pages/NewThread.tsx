import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { Descendant, Node } from 'slate';
import { zodResolver } from '@hookform/resolvers/zod';
import slateParser from '@/lib/slate-parser';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/app/hooks';
import { asyncPostNewThread } from '@/services/states/thread-slice';
import Editor from '@/components/content/Editor';
import ErrorMessage from '@/components/ui/error-message';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'You must enter a title.',
  }),
  body: z.string().optional(),
  category: z.string(),
});

function NewThread() {
  const [loading, setLoading] = useState(false);
  const [bodyEditor, setBodyEditor] = useState<Descendant[]>([
    {
      type: 'heading-two',
      align: 'left',
      children: [{ text: 'Hello World!' }],
    },
  ]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
    },
  });

  const serializeToTrimmedString = (nodes: Descendant[]) =>
    nodes
      .map((n) => Node.string(n))
      .join('\n')
      .trim();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!serializeToTrimmedString(bodyEditor)) {
      form.setError('root.body', {
        message: 'Body input cannot be empty!',
        type: 'required',
      });
      return;
    }

    const body = bodyEditor.map((n) => slateParser.serialize(n)).join('');

    setLoading(true);
    const { title, category } = values;
    const { status, newThread } = await dispatch(
      asyncPostNewThread({ title, body, category }),
    );
    setLoading(false);
    if (status) navigate(`/thread/${newThread.id}`);
  };

  return (
    <div className="min-h-main p-4 lg:px-0">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="mb-2">New Thread</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="category" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-sm" />
                </FormItem>
              )}
            />
            <Editor currentValue={bodyEditor} onValueChange={setBodyEditor} />
            <ErrorMessage message={form.formState.errors.root?.body?.message} />
            <Button disabled={loading} className="w-full" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Create Thread</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewThread;
