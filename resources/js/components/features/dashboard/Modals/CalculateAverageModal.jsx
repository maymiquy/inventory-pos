import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const CalculateAverageModal = ({
  isOpen,
  onClose,
  onCalculate,
}) => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 5 },
    (_, i) => currentYear - i
  );

  const handleCalculate = () => {
    onCalculate(selectedYear);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Select Year for Average Summary
          </DialogTitle>
          <DialogDescription className="text-sm">
            Please select a year what you want to calculate
            the average summary.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) =>
              setSelectedYear(parseInt(value))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleCalculate}>
            Calculate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculateAverageModal;
