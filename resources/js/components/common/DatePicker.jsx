import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { forwardRef } from 'react';

const DatePicker = forwardRef(
  ({ value, onChange, className = '' }, ref) => {
    const handleSelect = (date) => {
      if (date) {
        const formattedDate = format(
          date,
          'yyyy-MM-dd HH:mm:ss'
        );
        onChange(formattedDate);
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              className
            )}
            ref={ref}
          >
            {value
              ? format(new Date(value), 'PPP')
              : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
