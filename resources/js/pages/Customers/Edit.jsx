import FormCustomer from '../../components/features/dashboard/Forms/FormCustomer';
import DashboardLayout from '../../layouts/DashboardLayout';

const Edit = ({ customer }) => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormCustomer
          customer={customer}
          submitRoute={`customers.update`}
          submitAction="update"
        />
      </div>
    </DashboardLayout>
  );
};

export default Edit;
