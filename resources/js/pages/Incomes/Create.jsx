import FormIncome from '../../components/features/dashboard/Forms/FormIncome';
import DashboardLayout from '../../layouts/DashboardLayout';

const Create = ({ products, customers }) => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormIncome
          submitRoute="incomes.store"
          submitAction="create"
          products={products}
          customers={customers}
        />
      </div>
    </DashboardLayout>
  );
};

export default Create;
