import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import React from 'react';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption:
          'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        caption_dropdowns: 'flex justify-center gap-1 pt-6',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-xl'
        ),
        nav_button_previous: 'absolute left-1 bottom-1',
        nav_button_next: 'absolute right-1 bottom-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn('h-4 w-4', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn('h-4 w-4', className)}
            {...props}
          />
        ),
        Dropdown: ({
          value,
          onChange,
          children,
          ...props
        }) => {
          const options = React.Children.toArray(children);
          const selected = options.find(
            (item) => item.props.value === value
          );
          const handleChange = (value) => {
            const eventChange = {
              target: {
                value,
              },
            };
            onChange(eventChange);
          };
          return (
            <>
              <Select
                value={value?.toString()}
                onValueChange={(value) => {
                  handleChange(value);
                }}
                {...props}
              >
                <SelectTrigger className="pr-1.5 text-[13px] shadow-none focus:ring-0">
                  <SelectValue>
                    {selected?.props.children}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <ScrollArea className="h-80">
                    {options &&
                      options.map((item, index) => (
                        <SelectItem
                          key={`${item.props.value}-${index}`}
                          value={
                            item.props.value.toString() ??
                            ''
                          }
                        >
                          {item.props.children}
                        </SelectItem>
                      ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </>
          );
        },
        Footer: () => {
          return (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-center text-sm font-medium text-gray-500">
                Please Pick a Date
              </p>
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
