import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
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
import { asyncRegisterUser } from '@/services/states/auth-slice';
import { useAppDispatch } from '@/app/hooks';

const formSchema = z
  .object({
    name: z.string().min(4, {
      message: 'Name be at least 4 characters.',
    }),
    email: z
      .string()
      .min(5, {
        message: 'Email must be at least 5 characters.',
      })
      .email({ message: 'Please enter a valid email address' }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    passwordConfirmation: z.string().min(6, {
      message: 'Password confirmation must be at least 6 characters.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { name, email, password } = values;
    const status = await dispatch(asyncRegisterUser({ name, email, password }));
    setLoading(false);
    if (status) navigate('/login');
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
            Co-Dev Register
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    {/* // change border color based on validation */}
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-sm" />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password confirmation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-sm" />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                className="text-foreground font-semibold hover:underline"
                to="/Login"
              >
                Login
              </Link>
            </p>
            <Button disabled={loading} className="w-full" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Register;
