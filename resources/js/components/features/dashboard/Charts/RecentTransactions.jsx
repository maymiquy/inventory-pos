import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowUpIcon,
  Package2Icon,
  UserIcon,
} from 'lucide-react';

export function RecentTransactions({ transactions }) {
  return (
    <Card className="col-span-3 md:col-span-2 md:row-span-2 lg:col-span-3 xl:col-span-2 xl:row-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ScrollArea className="h-full px-4">
          <div className="space-y-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Package2Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-green-500">
                      <ArrowUpIcon className="h-3 w-3 text-white" />
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[12px] font-semibold leading-none">
                      {transaction.product.name}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <UserIcon className="mr-1 h-3 w-3" />
                      {transaction.customer.name}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(
                      transaction.total_amount
                    )}
                  </span>
                  <span className="text-[8px] text-muted-foreground">
                    {formatDistanceToNow(
                      new Date(transaction.purchase_date),
                      { addSuffix: true }
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
