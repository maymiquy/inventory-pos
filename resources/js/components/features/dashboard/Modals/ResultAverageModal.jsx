import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  BarChart,
  CreditCard,
  DollarSign,
  Percent,
} from 'lucide-react';

const ResultAverageModal = ({
  isOpen,
  onClose,
  results,
}) => {
  if (!results) return null;

  const ResultItem = ({
    title,
    value,
    icon: Icon,
    bgColor,
    borderColor,
    textColor,
    iconColor,
    className = '',
  }) => (
    <div
      className={`rounded-lg p-4 ${bgColor} ${borderColor} ${className}`}
    >
      <div className="mb-2 flex items-center">
        <Icon className={`mr-2 h-5 w-5 ${iconColor}`} />
        <h3 className={`font-semibold ${textColor}`}>
          {title}
        </h3>
      </div>
      <p className={`text-2xl font-bold ${textColor}`}>
        {value}
      </p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-center text-2xl font-bold">
            Annual Financial Summary for {results?.year}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
          <ResultItem
            title="Annual Income"
            value={`$${results?.annualIncome.toLocaleString()}`}
            icon={DollarSign}
            bgColor="bg-green-50"
            borderColor="border border-green-200"
            textColor="text-green-700"
            iconColor="text-green-500"
          />
          <ResultItem
            title="Annual Expense"
            value={`$${results?.annualExpense.toLocaleString()}`}
            icon={CreditCard}
            bgColor="bg-red-50"
            borderColor="border border-red-200"
            textColor="text-red-700"
            iconColor="text-red-500"
          />
          <ResultItem
            title="Avg. Monthly Income"
            value={`$${results?.averageMonthlyIncome.toLocaleString()}`}
            icon={BarChart}
            bgColor="bg-blue-50"
            borderColor="border border-blue-200"
            textColor="text-blue-700"
            iconColor="text-blue-500"
          />
          <ResultItem
            title="Avg. Monthly Expense"
            value={`$${results?.averageMonthlyExpense.toLocaleString()}`}
            icon={BarChart}
            bgColor="bg-orange-50"
            borderColor="border border-orange-200"
            textColor="text-orange-700"
            iconColor="text-orange-500"
          />
          <ResultItem
            title="Expense Percentage"
            value={`${results?.expensePercentage}% of annual income`}
            icon={Percent}
            bgColor="bg-yellow-50"
            borderColor="border border-yellow-200"
            textColor="text-yellow-700"
            iconColor="text-yellow-500"
            className="md:col-span-2"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultAverageModal;
