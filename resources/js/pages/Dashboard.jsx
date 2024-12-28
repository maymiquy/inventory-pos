import {
  Scale,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Grid } from '../components/common/grid';
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RecentTransactions,
} from '../components/features/dashboard/Charts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import DashboardLayout from '../layouts/DashboardLayout';
import { formatCurrency } from '../utils/formatCurrency';

export default function Dashboard({
  totalIncomeThisMonth,
  totalExpenseThisMonth,
  topProducts,
  topCustomers,
  monthlyIncome,
  monthlyExpense,
  productQuantities,
  recentTransactions,
}) {
  return (
    <DashboardLayout className="shadow-none backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="p-6">
        <Grid className="gap-6">
          <Card className="col-span-3 border border-green-200 bg-green-50 bg-opacity-5 text-green-700 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <TrendingUp className="mr-4 h-5 w-5 text-green-500" />
              <CardTitle>Total Income This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(totalIncomeThisMonth)}
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-3 border border-red-200 bg-red-50 bg-opacity-5 text-red-700 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <TrendingDown className="mr-4 h-5 w-5 text-red-500" />
              <CardTitle>
                Total Expense This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(totalExpenseThisMonth)}
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-3 border border-yellow-200 bg-yellow-50 bg-opacity-5 text-yellow-700 backdrop:blur md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <Scale className="mr-4 h-5 w-5 text-yellow-500" />
              <CardTitle>Net Income This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  totalIncomeThisMonth -
                    totalExpenseThisMonth
                )}
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-3 md:col-span-4 lg:col-span-3 xl:col-span-4">
            <CardHeader>
              <CardTitle>
                Monthly Income vs Expense
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={combineMonthlyData(
                  monthlyIncome,
                  monthlyExpense
                )}
              />
            </CardContent>
          </Card>
          <RecentTransactions
            transactions={recentTransactions}
          />
          <Card className="col-span-3 md:col-span-4 lg:col-span-3 xl:col-span-4">
            <CardHeader>
              <CardTitle>
                Top 5 Products - Best Seller
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={topProducts}
                xDataKey="name"
                yDataKey="incomes_count"
              />
            </CardContent>
          </Card>
          <Card className="col-span-3 md:col-span-4 lg:col-span-3 xl:col-span-4">
            <CardHeader>
              <CardTitle>
                Top 5 Customers - Most Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={topCustomers}
                xDataKey="name"
                yDataKey="total_spent"
              />
            </CardContent>
          </Card>
          <Card className="col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CardHeader>
              <CardTitle>
                Most Lowest Products Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart
                data={productQuantities}
                dataKey="quantity"
                nameKey="name"
              />
            </CardContent>
          </Card>
          <Card className="col-span-3 md:col-span-6 lg:col-span-3 xl:col-span-6">
            <CardHeader>
              <CardTitle>Monthly Income Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={monthlyIncome}
                xDataKey="month"
                yDataKey="total"
              />
            </CardContent>
          </Card>
        </Grid>
      </div>
    </DashboardLayout>
  );
}

function combineMonthlyData(income, expense) {
  const combinedData = {};
  income.forEach((item) => {
    combinedData[item.month] = {
      month: item.month,
      income: item.total,
      expense: 0,
    };
  });
  expense.forEach((item) => {
    if (combinedData[item.month]) {
      combinedData[item.month].expense = item.total;
    } else {
      combinedData[item.month] = {
        month: item.month,
        income: 0,
        expense: item.total,
      };
    }
  });
  return Object.values(combinedData).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}
