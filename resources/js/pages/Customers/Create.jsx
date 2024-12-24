import FormCustomer from '../../components/features/dashboard/Forms/FormCustomer';
import DashboardLayout from '../../layouts/DashboardLayout';

const Create = () => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormCustomer
          submitRoute="customers.store"
          submitAction="create"
        />
      </div>
    </DashboardLayout>
  );
};

export default Create;
