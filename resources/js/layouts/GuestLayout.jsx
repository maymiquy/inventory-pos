import ApplicationLogo from '@/components/ui/application-logo';
import { Link } from '@inertiajs/react';
import { Toaster } from '../components/ui/toaster';

export default function GuestLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-zinc-100 pt-6 sm:justify-center sm:pt-0">
        <div className="flex flex-col items-center">
          <Link href="/">
            <ApplicationLogo className="h-20 w-20 fill-current text-zinc-50" />
          </Link>
          <h1 className="text-4xl font-bold">
            Inventory Point of Sales
          </h1>
        </div>

        <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
          {children}
        </div>
      </div>
      <Toaster />
    </>
  );
}
