import FormIncome from '../../components/features/dashboard/Forms/FormIncome';
import DashboardLayout from '../../layouts/DashboardLayout';

const Edit = ({ income, products, customers }) => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormIncome
          income={income}
          submitRoute="incomes.update"
          submitAction="update"
          products={products}
          customers={customers}
        />
      </div>
    </DashboardLayout>
  );
};

export default Edit;
