import { useForm } from '@inertiajs/react';
import { LogOut, User, UserCog } from 'lucide-react';
import { useRef } from 'react';
import { toast } from '../../../../hooks/use-toast';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../ui/avatar';
import { Button } from '../../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';

const UserAvatar = (props) => {
  const userAvatar = `${props.user.name.charAt(0).toUpperCase()}${props.user.name
    .split(' ')
    [props.user.name.split(' ').length - 1].charAt(0)
    .toUpperCase()}`;
  const { get, post } = useForm();

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
      <DropdownMenu>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="#" alt="Avatar" />
                    <AvatarFallback className="bg-transparent">
                      {props.user.name ? userAvatar : 'n/a'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <span className="relative flex items-center px-2 py-1.5 text-sm">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              Account Information
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <div className="relative flex flex-col space-y-2 px-2 py-1.5">
              <p className="text-sm font-medium leading-none">
                {props.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {props.user.email}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                <span className="font-semibold text-gray-800">
                  Role
                </span>
                <span className="font bold ml-1 mr-1">
                  :
                </span>
                Admin
              </p>
            </div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => {
              get(route('profile.edit'));
            }}
          >
            <UserCog className="mr-3 h-4 w-4 text-muted-foreground" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAvatar;
