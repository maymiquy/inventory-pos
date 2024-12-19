import { router, usePage } from '@inertiajs/react';
import Paginations from '../../components/common/Paginations';
import Tables from '../../components/features/dashboard/Tables/Tables';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const { customers } = usePage().props;

  const columns = [
    { title: '', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
  ];

  const handlePageChange = (page) => {
    router.visit(
      route('customers.index', { page }),
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
              Showing {customers?.from || 0} to{' '}
              {customers?.to || 0} of {customers.total} data
              entries
            </p>
          </div>
          <div>{/* <SearchBar /> */}</div>
        </div>
        <Tables
          columns={columns}
          data={customers.data}
          indexData={
            (customers.current_page - 1) *
            customers.per_page
          }
        />
        <Paginations
          currentPage={customers.current_page}
          totalPages={customers.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
