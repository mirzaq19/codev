import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
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
import { cn } from '@/lib/utils';
import codevlogo from '@/assets/logo/codev-logo.svg';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'You must enter an email address.',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  password: z.string().min(1, {
    message: 'You must enter a password.',
  }),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto min-h-main px-4 md:px-0">
      <div
        className={cn('max-w-3xl w-full mx-auto', 'bg-white rounded-md p-8')}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <img
            src={codevlogo}
            alt="Codev logo"
            className="w-8 h-8 md:w-12 md:h-12"
          />
          <h1 className="font-title font-bold text-center mb-6">
            Co-Dev Login
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-sm" />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                className="text-foreground font-semibold hover:underline"
                to="/register"
              >
                Register
              </Link>
            </p>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
