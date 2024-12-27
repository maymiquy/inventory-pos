import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from '../../../../hooks/use-toast';
import { Button } from '../../../ui/button';
import { Checkbox } from '../../../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import { Label } from '../../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

const GenerateReportModal = ({ isOpen, onClose }) => {
  const { data, setData, post, processing, reset } =
    useForm({
      year: new Date().getFullYear(),
      months: [],
    });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('reports.generate'), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Successfully Reports Generated',
          description:
            'The reports have been generated successfully.',
          variant: 'success',
        });
        onClose();
      },
      onError: () => {
        toast({
          title: 'Error, Failed to Generate Reports',
          description:
            'Failed to generate reports. Please try again.',
          variant: 'destructive',
        });
      },
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 5 },
    (_, i) => currentYear - i
  );
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const toggleMonth = (monthValue) => {
    setData(
      'months',
      data.months.includes(monthValue)
        ? data.months.filter((m) => m !== monthValue)
        : [...data.months, monthValue]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Reports</DialogTitle>
          <DialogDescription className="text-sm">
            Generating report for total income & total
            expense by selected year and months.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-8 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Select
                value={data.year.toString()}
                onValueChange={(value) =>
                  setData('year', parseInt(value))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem
                      key={y}
                      value={y.toString()}
                    >
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label className="text-right">Months</Label>
              <div className="col-span-3 mx-auto grid w-full grid-cols-3 gap-2">
                {months.map((month) => (
                  <div
                    key={month.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`month-${month.value}`}
                      checked={data.months.includes(
                        month.value
                      )}
                      onCheckedChange={() =>
                        toggleMonth(month.value)
                      }
                    />
                    <Label
                      className="cursor-pointer text-[10px] sm:text-xs"
                      htmlFor={`month-${month.value}`}
                    >
                      {month.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-4">
            <Button
              type="submit"
              className="w-full"
              disabled={
                processing || data.months.length === 0
              }
            >
              {processing ? 'Generating...' : 'Generate'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateReportModal;
