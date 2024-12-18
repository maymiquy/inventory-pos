import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import Paginations from '../../components/common/Paginations';
import Tables from '../../components/features/dashboard/Tables/Tables';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const { products } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(
    products.length / itemsPerPage
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const columns = [
    { title: '', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Price', field: 'price' },
    { title: 'Quantity', field: 'quantity' },
  ];

  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col items-center justify-center space-y-2 overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <div className="flex w-full flex-row justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Showing {indexOfFirstItem + 1} to{' '}
              {indexOfLastItem} of {products.length} data
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