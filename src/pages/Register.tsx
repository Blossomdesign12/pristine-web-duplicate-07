
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register: registerUser, isLoading } = useAuth();
  const [role, setRole] = useState<string>(UserRole.BUYER);

  const formSchema = z.object({
    name: z.string().min(3, {
      message: 'Name must be at least 3 characters long',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await registerUser(data.name, data.email, data.password, role);
      toast({
        title: 'Account created successfully',
        description: 'You have been registered and signed in',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'There was an error during registration. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <img 
              src="https://res.cloudinary.com/dw7w2at8k/image/upload/v1741631701/jugyahblack.5fadb514_sdcgzu.svg" 
              alt="Logo" 
              className="h-8 mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold mt-4">Create an Account</h1>
          <p className="text-gray-600 mt-1">Sign up to start using our platform</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...form.register('name')}
              className="w-full"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...form.register('email')}
              className="w-full"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={role === UserRole.BUYER ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setRole(UserRole.BUYER)}
              >
                Home Buyer
              </Button>
              <Button
                type="button"
                variant={role === UserRole.OWNER ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setRole(UserRole.OWNER)}
              >
                Property Owner
              </Button>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...form.register('password')}
              className="w-full"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...form.register('confirmPassword')}
              className="w-full"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
