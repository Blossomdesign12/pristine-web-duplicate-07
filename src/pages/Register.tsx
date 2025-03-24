import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface RegisterProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Register = ({ isOpen, onClose }: RegisterProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(UserRole.BUYER);
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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
      await registerUser(data.name, data.email, data.password, selectedRole);
      toast({
        title: 'Registration successful',
        description: 'Your account has been created!',
      });
      
      if (onClose) {
        onClose();
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'There was an error creating your account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const renderRegisterForm = () => (
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
        <p className="text-gray-600 mt-1">Join our community today</p>
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

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">I am a:</p>
          <RadioGroup 
            defaultValue={selectedRole} 
            onValueChange={setSelectedRole}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={UserRole.BUYER} id="buyer" />
              <Label htmlFor="buyer">Home Buyer/Tenant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={UserRole.OWNER} id="owner" />
              <Label htmlFor="owner">Property Owner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={UserRole.AGENT} id="agent" />
              <Label htmlFor="agent">Real Estate Agent</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Sign Up'}
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
  );

  if (isOpen !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose && onClose()}>
        <DialogContent className="sm:max-w-md">
          {renderRegisterForm()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {renderRegisterForm()}
    </div>
  );
};

export default Register;
