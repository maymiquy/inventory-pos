import { Link } from '@inertiajs/react';
import { CircleDollarSign } from 'lucide-react';
import { useSidebarToggle } from '../../../../hooks/use-sidebar-toggle';
import { useStore } from '../../../../hooks/use-store';
import { cn } from '../../../../lib/utils';
import MenuLink from '../../../common/MenuLink';
import { Button } from '../../../ui/button';
import Toggle from './Toggle';

const Sidebar = () => {
  const sidebar = useStore(
    useSidebarToggle,
    (state) => state
  );

  if (!sidebar) return null;

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
          sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
        )}
      >
        <Toggle
          isOpen={sidebar?.isOpen}
          setIsOpen={sidebar?.setIsOpen}
        />
        <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
          <Button
            className={cn(
              'mb-1 transition-transform duration-300 ease-in-out',
              sidebar?.isOpen === false
                ? 'translate-x-1'
                : 'translate-x-0'
            )}
            variant="link"
            asChild
          >
            <Link
              to="/dashboard"
              className="flex items-center justify-start transition-opacity duration-300 hover:opacity-85"
            >
              <CircleDollarSign
                className="mr-1 h-8 w-8"
                size={32}
              />
              <span
                className={cn(
                  'whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
                  sidebar?.isOpen === false
                    ? 'hidden -translate-x-96 opacity-0'
                    : 'translate-x-0 opacity-100'
                )}
              >
                Inventory POS
              </span>
            </Link>
          </Button>
          <MenuLink isOpen={sidebar?.isOpen} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
