import { router, usePage } from '@inertiajs/react';
import Paginations from '../../components/common/Paginations';
import Tables from '../../components/features/dashboard/Tables/Tables';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const { reports } = usePage().props;

  const columns = [
    { title: '', field: 'id' },
    { title: 'Year', field: 'year' },
    { title: 'Month', field: 'month' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Total Incomes', field: 'total_income' },
    { title: 'Total Expenses', field: 'total_expense' },
  ];

  const handlePageChange = (page) => {
    router.visit(
      route('reports.index', { page }),
      {},
      { preserveState: true, preserveScroll: true }
    );
  };

  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col items-center justify-center space-y-2 overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <div className="flex w-full flex-row justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Showing {reports?.from || 0} to{' '}
              {reports?.to || 0} of {reports.total} data
              entries
            </p>
          </div>
          <div>{/* <SearchBar /> */}</div>
        </div>
        <Tables
          columns={columns}
          data={reports.data}
          indexData={
            (reports.current_page - 1) * reports.per_page
          }
        />
        <Paginations
          currentPage={reports.current_page}
          totalPages={reports.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
