import FormProduct from '../../components/features/dashboard/Forms/FormProduct';
import DashboardLayout from '../../layouts/DashboardLayout';

const Edit = ({ product }) => {
  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <FormProduct
          product={product}
          submitRoute={`products.update`}
          submitAction="update"
        />
      </div>
    </DashboardLayout>
  );
};

export default Edit;
