import FormExpense from '../../components/features/dashboard/Forms/FormExpense';
import DashboardLayout from '../../layouts/DashboardLayout';

const Create = ({ products, suppliers }) => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormExpense
          submitRoute="expenses.store"
          submitAction="create"
          products={products}
          suppliers={suppliers}
        />
      </div>
    </DashboardLayout>
  );
};

export default Create;
