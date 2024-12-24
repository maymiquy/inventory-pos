import FormSupplier from '../../components/features/dashboard/Forms/FormSupplier';
import DashboardLayout from '../../layouts/DashboardLayout';

const Create = () => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormSupplier
          submitRoute="suppliers.store"
          submitAction="create"
        />
      </div>
    </DashboardLayout>
  );
};

export default Create;
