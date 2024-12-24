import { useForm } from '@inertiajs/react';
import { toast } from '../../../../hooks/use-toast';
import { formatPhoneNumber } from '../../../../utils/formatPhoneNumber';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

const FormSupplier = ({
  supplier,
  submitRoute,
  submitAction,
}) => {
  const { data, setData, post, put, processing, errors } =
    useForm({
      company_name: supplier?.company_name || '',
      email: supplier?.email || '',
      phone: supplier?.phone
        ? formatPhoneNumber(supplier.phone)
        : '',
    });

  const submit = (e) => {
    e.preventDefault();

    const submitFunction =
      submitAction === 'create' ? post : put;
    const url =
      submitAction === 'create'
        ? route(submitRoute)
        : route(submitRoute, supplier.id);

    submitFunction(url, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: `Successfully ${submitAction === 'create' ? 'Created' : 'Updated'} ${data.company_name}`,
          description: `The supplier has been ${submitAction === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success',
        });
      },
      onError: (errors) => {
        console.error(errors);
        toast({
          title: `Failed to ${submitAction === 'create' ? 'Create' : 'Update'} ${data.company_name}`,
          description: `Something went wrong trying to ${submitAction === 'create' ? 'create' : 'update'} the supplier, please try again`,
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
            htmlFor="company_name"
            className="block font-semibold"
          >
            Company Name
          </Label>
          <Input
            id="company_name"
            type="text"
            name="company_name"
            value={data.company_name}
            className="mt-1 block w-full"
            onChange={(e) =>
              setData('company_name', e.target.value)
            }
          />
          {errors.company_name && (
            <p className="mt-2 text-sm text-red-600">
              {errors.company_name}
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
            ? 'Create New Supplier'
            : 'Update Supplier'}
        </Button>
      </div>
    </form>
  );
};

export default FormSupplier;
