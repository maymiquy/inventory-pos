import { useForm } from '@inertiajs/react';
import { toast } from '../../../../hooks/use-toast';
import { DropzoneFile } from '../../../common/DropzoneFile';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';

const FormProduct = ({
  product,
  submitRoute,
  submitAction,
}) => {
  const { data, setData, post, put, processing, errors } =
    useForm({
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      quantity: product?.quantity || '',
    });

  const submit = (e) => {
    e.preventDefault();

    const submitFunction =
      submitAction === 'create' ? post : put;
    const url =
      submitAction === 'create'
        ? route(submitRoute)
        : route(submitRoute, product.id);

    submitFunction(url, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: `Successfully ${submitAction === 'create' ? 'Created' : 'Updated'} ${data.name}`,
          description: `The product has been ${submitAction === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success',
        });
      },
      onError: (errors) => {
        console.error(errors);
        toast({
          title: `Failed to ${submitAction === 'create' ? 'Create' : 'Update'} ${data.name}`,
          description: `Something went wrong trying to ${submitAction === 'create' ? 'create' : 'update'} the product, please try again`,
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="flex w-full flex-col-reverse justify-center lg:flex-row lg:justify-between lg:space-x-6 xl:space-x-2">
        <div className="flex w-full flex-col space-y-12">
          <div className="mt-4 max-w-xl">
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

          <div className="mt-4 max-w-xl">
            <Label
              htmlFor="description"
              className="block font-semibold"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              className="mt-1 block w-full"
              onChange={(e) =>
                setData('description', e.target.value)
              }
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          <div className="mt-4 flex max-w-xl flex-row space-x-4">
            <div className="w-1/2">
              <Label
                htmlFor="price"
                className="block font-semibold"
              >
                Price
              </Label>
              <Input
                id="price"
                type="number"
                name="price"
                value={data.price}
                className="mt-1 block w-full"
                onChange={(e) =>
                  setData('price', e.target.value)
                }
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.price}
                </p>
              )}
            </div>

            <div className="w-1/2">
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
          </div>
        </div>

        <div className="flex w-full sm:pt-6 lg:max-w-md lg:justify-end">
          <DropzoneFile />
          {errors.image && (
            <p className="mt-2 text-sm text-red-600">
              {errors.image}
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
            ? 'Create New Data'
            : 'Update Data'}
        </Button>
      </div>
    </form>
  );
};

export default FormProduct;
