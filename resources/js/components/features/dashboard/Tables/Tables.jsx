import { router } from '@inertiajs/react';
import {
  ChartSpline,
  Pen,
  PlusCircle,
  Trash,
} from 'lucide-react';
import { toast } from '../../../../hooks/use-toast';
import { formatParagraph } from '../../../../utils/formatParagraph';
import { Button } from '../../../ui/button';
import {
  ScrollArea,
  ScrollBar,
} from '../../../ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';

const Tables = ({
  columns,
  data,
  indexData,
  onCalculateAverage,
}) => {
  const pathname = window.location.pathname.slice(1);
  const handleDelete = (id) => {
    router.delete(
      route(`${pathname}.destroy`, {
        id,
      }),
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          toast({
            title: 'Successfully Deleted',
            description:
              'Your data has been deleted successfully',
            variant: 'success',
          });
        },
        onError: () => {
          toast({
            title: 'Failed to Delete',
            description:
              'Something went wrong trying to delete, please try again',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <Table className="relative w-full max-w-lg border-collapse overflow-x-scroll rounded-[4px] shadow-xl sm:max-w-full md:max-w-full">
        <TableHeader className="border-b border-zinc-300 bg-muted/100">
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={`${index === 0 && 'w-12'}`}
              >
                {column.title}
              </TableHead>
            ))}
            <TableHead className="w-[100px] text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                className="hover:bg-zinc-100"
                key={index}
                onClick={() =>
                  router.visit(
                    route(`${pathname}.show`, {
                      id: row.id,
                    })
                  )
                }
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`${
                      colIndex === 1 ? 'font-semibold' : ''
                    } ${
                      column.field === 'description'
                        ? 'leading-relaxed'
                        : ''
                    } cursor-pointer text-start text-xs`}
                  >
                    {column.field === 'id' ? (
                      indexData + index + 1
                    ) : column.field === 'price' ||
                      column.field === 'total_income' ||
                      column.field === 'total_expense' ||
                      column.field === 'price_per_item' ||
                      column.field === 'total_amount' ? (
                      `$ ${row[column.field]}`
                    ) : column.field === 'description' ||
                      column.field === 'name' ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: formatParagraph(
                            row[column.field],
                            80
                          ),
                        }}
                      />
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}

                <TableCell>
                  <div className="flex items-center justify-center gap-4">
                    <TooltipProvider
                      disableHoverableContent
                    >
                      {pathname !== 'reports' && (
                        <Tooltip delayDuration={500}>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.visit(
                                  route(
                                    `${pathname}.edit`,
                                    {
                                      id: row.id,
                                    }
                                  )
                                );
                              }}
                              className="bg-indigo-500 text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              size="icon"
                            >
                              <Pen className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            Edit data
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip delayDuration={500}>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(row.id);
                            }}
                            variant="destructive"
                            className="shadow-sm transition duration-150 ease-in-out hover:shadow-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            size="icon"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          Delete data
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <div className="flex w-full flex-col items-center justify-center py-24">
                  <p className="text-center text-xl text-zinc-500">
                    No data available
                  </p>
                  {data.length === 0 && (
                    <span className="text-center text-xs font-extralight text-zinc-400">
                      0 rows affected (
                      {(Math.random() * 0.3 + 0.2).toFixed(
                        1
                      )}{' '}
                      s)
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter className="border-t border-zinc-300 bg-muted/100">
          <TableRow>
            <TableCell colSpan={columns.length + 1}>
              {pathname !== 'reports' ? (
                <Button
                  onClick={() =>
                    router.visit(
                      route(`${pathname}.create`)
                    )
                  }
                  className="w-full outline-[0.2px] hover:outline hover:outline-green-600"
                  variant="outline"
                >
                  <p className="mr-2 text-zinc-600">
                    Add new data
                  </p>
                  <span>
                    <PlusCircle className="h-4 w-4 text-green-600" />
                  </span>
                </Button>
              ) : (
                <Button
                  onClick={onCalculateAverage}
                  className="w-full outline-[0.2px] hover:outline hover:outline-green-600"
                  variant="outline"
                >
                  <p className="mr-2 text-zinc-600">
                    Get Average Summary
                  </p>
                  <span>
                    <ChartSpline className="h-4 w-4 text-indigo-600" />
                  </span>
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Tables;
