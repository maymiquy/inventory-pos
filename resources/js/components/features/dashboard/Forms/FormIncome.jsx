import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from '../../../../hooks/use-toast';
import DatePicker from '../../../common/DatePicker';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

const FormIncome = ({
  income,
  submitRoute,
  submitAction,
  products,
  customers,
}) => {
  const { data, setData, post, put, processing, errors } =
    useForm({
      product_id: income?.product_id || '',
      customer_id: income?.customer_id || '',
      quantity: income?.quantity || '',
      price_per_item: income?.price_per_item || '',
      total_amount: income?.total_amount || '',
      purchase_date: income?.purchase_date || '',
    });

  useEffect(() => {
    if (data.product_id) {
      const selectedProduct = products.find(
        (p) => p.id.toString() === data.product_id
      );
      if (selectedProduct) {
        setData('price_per_item', selectedProduct.price);
      }
    }
  }, [data.product_id, products]);

  useEffect(() => {
    const quantity = parseFloat(data.quantity) || 0;
    const pricePerItem =
      parseFloat(data.price_per_item) || 0;
    const totalAmount = (quantity * pricePerItem).toFixed(
      2
    );
    setData('total_amount', totalAmount);
  }, [data.quantity, data.price_per_item]);

  const submit = (e) => {
    e.preventDefault();

    const submitFunction =
      submitAction === 'create' ? post : put;
    const url =
      submitAction === 'create'
        ? route(submitRoute)
        : route(submitRoute, income.id);

    submitFunction(url, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: `Successfully ${submitAction === 'create' ? 'Created' : 'Updated'} Income`,
          description: `The income has been ${submitAction === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success',
        });
      },
      onError: () => {
        console.error(errors.error);
        toast({
          title: `Failed to ${submitAction === 'create' ? 'Create' : 'Update'} Income`,
          description:
            errors.error ||
            `Something went wrong trying to ${submitAction === 'create' ? 'create' : 'update'} the income, please try again`,
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="flex w-full flex-col space-y-12">
        <div className="mt-4">
          <Label
            htmlFor="product_id"
            className="block font-semibold"
          >
            Product
          </Label>
          {submitAction === 'create' ? (
            <Select
              value={data.product_id}
              onValueChange={(value) =>
                setData('product_id', value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {products.map((product) => (
                  <SelectItem
                    className="text-xs"
                    key={product.id}
                    value={product.id.toString()}
                  >
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="mt-1 rounded bg-gray-100 p-2">
              {income.product.name}
            </p>
          )}
          {errors.product_id && (
            <p className="mt-2 text-sm text-red-600">
              {errors.product_id}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Label
            htmlFor="customer_id"
            className="block font-semibold"
          >
            Customer
          </Label>
          {submitAction === 'create' ? (
            <Select
              value={data.customer_id}
              onValueChange={(value) =>
                setData('customer_id', value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {customers.map((customer) => (
                  <SelectItem
                    className="text-xs"
                    key={customer.id}
                    value={customer.id.toString()}
                  >
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="mt-1 rounded bg-gray-100 p-2">
              {income.customer.name}
            </p>
          )}
          {errors.customer_id && (
            <p className="mt-2 text-sm text-red-600">
              {errors.customer_id}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="quantity"
              className="block font-semibold"
            >
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              value={data.quantity}
              min="1"
              className="mt-1 block w-full"
              onChange={(e) =>
                setData('quantity', e.target.value)
              }
            />
            {errors.quantity && (
              <p className="mt-2 text-sm text-red-600">
                {errors.quantity}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="price_per_item"
              className="block font-semibold"
            >
              Price per Item
            </Label>
            <Input
              id="price_per_item"
              type="number"
              name="price_per_item"
              value={data.price_per_item}
              className="mt-1 block w-full"
              onChange={(e) =>
                setData('price_per_item', e.target.value)
              }
              readOnly
            />
            {errors.price_per_item && (
              <p className="mt-2 text-sm text-red-600">
                {errors.price_per_item}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="total_amount"
              className="block font-semibold"
            >
              Total Amount
            </Label>
            <Input
              id="total_amount"
              type="number"
              name="total_amount"
              value={data.total_amount}
              className="mt-1 block w-full"
              readOnly
            />
            {errors.total_amount && (
              <p className="mt-2 text-sm text-red-600">
                {errors.total_amount}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="purchase_date"
              className="block font-semibold"
            >
              Purchase Date
            </Label>
            <DatePicker
              value={data.purchase_date}
              onChange={(date) =>
                setData('purchase_date', date)
              }
              className="mt-1 block w-full"
            />
            {errors.purchase_date && (
              <p className="mt-2 text-sm text-red-600">
                {errors.purchase_date}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 mt-12 flex items-center justify-center">
        <Button
          type="submit"
          className="w-full"
          disabled={processing}
        >
          {submitAction === 'create'
            ? 'Create New Income'
            : 'Update Income'}
        </Button>
      </div>
    </form>
  );
};

export default FormIncome;
