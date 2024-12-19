import { router, usePage } from '@inertiajs/react';
import Paginations from '../../components/common/Paginations';
import Tables from '../../components/features/dashboard/Tables/Tables';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const { suppliers } = usePage().props;

  const columns = [
    { title: '', field: 'id' },
    { title: 'Company', field: 'company_name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
  ];

  const handlePageChange = (page) => {
    router.visit(
      route('suppliers.index', { page }),
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
              Showing {suppliers?.from || 0} to{' '}
              {suppliers?.to || 0} of {suppliers?.total}{' '}
              data entries
            </p>
          </div>
          <div>{/* <SearchBar /> */}</div>
        </div>
        <Tables
          columns={columns}
          data={suppliers.data}
          indexData={
            (suppliers.current_page - 1) *
            suppliers.per_page
          }
        />
        <Paginations
          currentPage={suppliers.current_page}
          totalPages={suppliers.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
