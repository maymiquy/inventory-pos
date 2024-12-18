import InputError from '@/components/ui/input-error';
import InputLabel from '@/components/ui/input-label';
import TextInput from '@/components/ui/text-input';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '../../components/ui/button';
import { toast } from '../../hooks/use-toast';

export default function Register() {
  const { data, setData, post, processing, errors, reset } =
    useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });

  const submit = (e) => {
    e.preventDefault();

    post(route('register'), {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Successfully Register',
          description: 'Your successfully register',
          variant: 'success',
        });
      },
      onError: () => {
        toast({
          title: 'Failed to Register',
          description:
            'Something went wrong trying to register, please try again',
          variant: 'destructive',
        });
      },
      onFinish: () =>
        reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) =>
              setData('name', e.target.value)
            }
            required
          />

          <InputError
            message={errors.name}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) =>
              setData('email', e.target.value)
            }
            required
          />

          <InputError
            message={errors.email}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) =>
              setData('password', e.target.value)
            }
            required
          />

          <InputError
            message={errors.password}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) =>
              setData(
                'password_confirmation',
                e.target.value
              )
            }
            required
          />

          <InputError
            message={errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('login')}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Already registered?
          </Link>

          <Button
            type="submit"
            className="ms-4"
            disabled={processing}
          >
            Register
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
