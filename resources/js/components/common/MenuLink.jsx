import { Link, useForm } from '@inertiajs/react';
import { Ellipsis, LogOut } from 'lucide-react';
import { useRef } from 'react';
import { toast } from '../../hooks/use-toast';
import getMenu from '../../lib/menu';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const MenuLink = ({ isOpen }) => {
  const pathname = window.location.pathname;
  const menuList = getMenu(pathname);
  const { post } = useForm();

  const csrfToken = useRef(
    document.querySelector('meta[name="csrf-token"]')
  );

  const handleLogout = () => {
    post(route('logout'), {
      _token: csrfToken.current,
      onSuccess: () => {
        toast({
          title: 'Successfully Sign Out',
          description: 'Your successfully sign out',
          variant: 'success',
        });
      },
      onError: () => {
        toast({
          title: 'Failed to Sign Out',
          description:
            'Something went wrong trying to sign out',
          variant: 'destructive',
        });
      },
      onFinish: () => reset('password'),
    });
  };

  return (
    <>
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="mt-8 h-full w-full">
          <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
            {menuList.map(
              ({ groupLabel, menus }, index) => (
                <li
                  className={cn(
                    'w-full',
                    groupLabel ? 'pt-5' : ''
                  )}
                  key={index}
                >
                  {(isOpen && groupLabel) ||
                  isOpen === undefined ? (
                    <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                      {groupLabel}
                    </p>
                  ) : !isOpen &&
                    isOpen !== undefined &&
                    groupLabel ? (
                    <TooltipProvider>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger className="w-full">
                          <div className="flex w-full items-center justify-center">
                            <Ellipsis className="h-5 w-5" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{groupLabel}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <p className="pb-2"></p>
                  )}
                  {menus.map(
                    (
                      {
                        label,
                        href,
                        active,
                        icon: Icon,
                        submenus,
                      },
                      index
                    ) =>
                      submenus.length === 0 ? (
                        <div className="w-full" key={index}>
                          <TooltipProvider
                            disableHoverableContent
                          >
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={
                                    active
                                      ? 'secondary'
                                      : 'ghost'
                                  }
                                  className="mb-1 h-10 w-full justify-start"
                                  asChild
                                >
                                  <Link href={href}>
                                    <span
                                      className={cn(
                                        isOpen === false
                                          ? ''
                                          : 'mr-4'
                                      )}
                                    >
                                      <Icon size={18} />
                                    </span>
                                    <p
                                      className={cn(
                                        'max-w-[200px] truncate',
                                        isOpen === false
                                          ? '-translate-x-96 opacity-0'
                                          : 'translate-x-0 opacity-100'
                                      )}
                                    >
                                      {label}
                                    </p>
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              {isOpen === false && (
                                <TooltipContent side="right">
                                  {label}
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ) : (
                        <div
                          className="w-full"
                          key={index}
                        ></div>
                      )
                  )}
                </li>
              )
            )}
            <li className="flex w-full grow items-end">
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="my-5 h-10 w-full justify-center hover:outline hover:outline-1 hover:outline-red-500"
                    >
                      <p
                        className={cn(
                          'whitespace-nowrap',
                          isOpen === false
                            ? 'hidden opacity-0'
                            : 'opacity-100'
                        )}
                      >
                        Sign out
                      </p>
                      <span
                        className={cn(
                          isOpen === false ? '' : 'mr-4'
                        )}
                      >
                        <LogOut size={18} />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  {isOpen === false && (
                    <TooltipContent side="right">
                      Sign out
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </nav>
      </ScrollArea>
    </>
  );
};

export default MenuLink;
