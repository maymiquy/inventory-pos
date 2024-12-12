import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Navbar from '../components/features/dashboard/Navbar/Navbar';
import Sidebar from '../components/features/dashboard/Sidebar/Sidebar';
import { Toaster } from '../components/ui/toaster';
import { useSidebarToggle } from '../hooks/use-sidebar-toggle';
import { useStore } from '../hooks/use-store';
import getMenu from '../lib/menu';
import { cn } from '../lib/utils';

const DashboardLayout = ({ children }) => {
  const user = usePage().props.auth.user;
  const type = window.location.pathname;
  const [title, setTitle] = useState('');
  const [breadcrumbList, setBreadcrumbList] = useState([]);
  const pathname = window.location.pathname;
  const menuList = getMenu(pathname);
  const menus = menuList.map(({ menus }) => menus);
  const { label = '', href = '' } = menus
    .flat()
    .find((item) => `${item.href}` === pathname) ?? {
    label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
    href: '',
  };

  useEffect(() => {
    setTitle(label);

    const breadcrumbItems = [{ label: label, href: href }];
    if (pathname !== '/dashboard') {
      breadcrumbItems.unshift({
        label: 'Dashboard',
        href: '/dashboard',
      });
    }

    setBreadcrumbList(breadcrumbItems);
  }, [pathname, label, href]);

  const sidebar = useStore(
    useSidebarToggle,
    (state) => state
  );

  if (!sidebar) return null;

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col">
        <Sidebar />
        <main
          className={cn(
            'min-h-[calc(100vh_-_56px)] bg-zinc-100 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
            sidebar?.isOpen === false
              ? 'lg:ml-[90px]'
              : 'lg:ml-72'
          )}
        >
          <Navbar title={title} user={user} />
          <div className="container space-y-2 px-4 py-6 sm:px-8 md:space-y-4">
            <Breadcrumbs menu={breadcrumbList} />
            <section className="border-px flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] flex-col items-center justify-center gap-2 rounded-md bg-zinc-50 shadow-md">
              <div className="flex w-full flex-row ps-6 pt-8 text-start">
                <h1 className="text-2xl font-bold">
                  {title}
                </h1>
              </div>
              {children}
            </section>
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
};

export default DashboardLayout;
