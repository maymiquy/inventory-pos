import { CircleDollarSign, MenuIcon } from 'lucide-react';

import { Link } from '@inertiajs/react';
import MenuLink from '../../../common/MenuLink';
import { Button } from '../../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../../../ui/dialog';

const DialogMenu = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="lg:hidden" asChild>
          <Button
            className="h-8"
            variant="outline"
            size="icon"
          >
            <MenuIcon size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="flex h-full flex-col px-3 sm:w-72"
          side="left"
        >
          <DialogHeader>
            <Button
              className="flex items-center justify-center pb-2 pt-1"
              variant="link"
              asChild
            >
              <Link
                href="/dashboard"
                className="flex items-center justify-start transition-opacity duration-300 hover:opacity-85"
              >
                <CircleDollarSign className="mr-3 h-6 w-6" />
                <span className="font-bold">
                  Inventory POS
                </span>
              </Link>
            </Button>
          </DialogHeader>
          <MenuLink isOpen />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogMenu;
