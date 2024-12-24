import FormSupplier from '../../components/features/dashboard/Forms/FormSupplier';
import DashboardLayout from '../../layouts/DashboardLayout';

const Edit = ({ supplier }) => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormSupplier
          supplier={supplier}
          submitRoute={`suppliers.update`}
          submitAction="update"
        />
      </div>
    </DashboardLayout>
  );
};

export default Edit;
