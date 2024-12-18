import Checkbox from '@/components/ui/checkbox';
import InputError from '@/components/ui/input-error';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from '../../hooks/use-toast';

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } =
    useForm({
      email: '',
      password: '',
      remember: false,
    });

  const submit = (e) => {
    e.preventDefault();

    post(route('login'), {
      onSuccess: () => {
        toast({
          title: 'Successfully Sign In',
          description: 'Your successfully sign in',
          variant: 'success',
        });
      },
      onError: () => {
        toast({
          title: 'Failed to Sign In',
          description:
            'Something went wrong trying to sign in, please try again',
          variant: 'destructive',
        });
      },
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Sign in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <div className="my-4 space-y-2">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="text-sm text-zinc-600">
          Please sign in to your account
        </p>
      </div>

      <div className="mb-8 h-px w-full bg-zinc-300" />

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="email"
            onChange={(e) =>
              setData('email', e.target.value)
            }
          />

          <InputError
            message={errors.email}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) =>
              setData('password', e.target.value)
            }
          />

          <InputError
            message={errors.password}
            className="mt-2"
          />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) =>
                setData('remember', e.target.checked)
              }
            />
            <span className="ms-2 text-sm text-gray-600">
              Remember me
            </span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button
            type="submit"
            className="ms-4"
            disabled={processing}
          >
            Sign in
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
