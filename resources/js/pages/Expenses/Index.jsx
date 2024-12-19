import { router, usePage } from '@inertiajs/react';
import Paginations from '../../components/common/Paginations';
import Tables from '../../components/features/dashboard/Tables/Tables';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const { expenses } = usePage().props;

  const columns = [
    { title: '', field: 'id' },
    { title: 'Supplier', field: 'supplier_id' },
    { title: 'Product', field: 'product_id' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Price per Item', field: 'price_per_item' },
    { title: 'Total Amount', field: 'total_amount' },
    { title: 'Transaction Date', field: 'purchase_date' },
  ];

  const handlePageChange = (page) => {
    router.visit(
      route('expenses.index', { page }),
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
              Showing {expenses?.from || 0} to{' '}
              {expenses?.to || 0} of {expenses?.total} data
              entries
            </p>
          </div>
          <div>{/* <SearchBar /> */}</div>
        </div>
        <Tables
          columns={columns}
          data={expenses.data}
          indexData={
            (expenses.current_page - 1) * expenses.per_page
          }
        />
        <Paginations
          currentPage={expenses.current_page}
          totalPages={expenses.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
