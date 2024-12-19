import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import Paginations from '../../components/common/Paginations';
import Tables from '../../components/features/dashboard/Tables/Tables';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const { incomes } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(
    incomes.length / itemsPerPage
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incomes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const columns = [
    { title: '', field: 'id' },
    { title: 'Customer', field: 'customer_id' },
    { title: 'Product', field: 'product_id' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Price per Item', field: 'price_per_item' },
    { title: 'Total Amount', field: 'total_amount' },
    { title: 'Transaction Date', field: 'purchase_date' },
  ];

  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col items-center justify-center space-y-2 overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <div className="flex w-full flex-row justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Showing {indexOfFirstItem + 1} to{' '}
              {indexOfLastItem} of {incomes.length} data
              entries
            </p>
          </div>
          <div>{/* <SearchBar /> */}</div>
        </div>
        <Tables
          indexData={indexOfFirstItem}
          columns={columns}
          data={currentItems}
        />
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
