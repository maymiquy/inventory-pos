import { useForm } from '@inertiajs/react';
import { toast } from '../../../../hooks/use-toast';
import { formatPhoneNumber } from '../../../../utils/formatPhoneNumber';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

const FormCustomer = ({
  customer,
  submitRoute,
  submitAction,
}) => {
  const { data, setData, post, put, processing, errors } =
    useForm({
      name: customer?.name || '',
      email: customer?.email || '',
      phone: customer?.phone
        ? formatPhoneNumber(customer.phone)
        : '',
    });

  const submit = (e) => {
    e.preventDefault();

    const submitFunction =
      submitAction === 'create' ? post : put;
    const url =
      submitAction === 'create'
        ? route(submitRoute)
        : route(submitRoute, customer.id);

    submitFunction(url, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: `Successfully ${submitAction === 'create' ? 'Created' : 'Updated'} ${data.name}`,
          description: `The customer has been ${submitAction === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success',
        });
      },
      onError: (errors) => {
        console.error(errors);
        toast({
          title: `Failed to ${submitAction === 'create' ? 'Create' : 'Update'} ${data.name}`,
          description: `Something went wrong trying to ${submitAction === 'create' ? 'create' : 'update'} the customer, please try again`,
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
            htmlFor="name"
            className="block font-semibold"
          >
            Name
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            onChange={(e) =>
              setData('name', e.target.value)
            }
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Label
            htmlFor="email"
            className="block font-semibold"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            onChange={(e) =>
              setData('email', e.target.value)
            }
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Label
            htmlFor="phone"
            className="block font-semibold"
          >
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            value={data.phone}
            className="mt-1 block w-full"
            onChange={(e) =>
              setData(
                'phone',
                formatPhoneNumber(e.target.value)
              )
            }
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6 mt-12 flex items-center justify-center">
        <Button
          type="submit"
          className="w-full"
          disabled={processing}
        >
          {submitAction === 'create'
            ? 'Create New Customer'
            : 'Update Customer'}
        </Button>
      </div>
    </form>
  );
};

export default FormCustomer;
