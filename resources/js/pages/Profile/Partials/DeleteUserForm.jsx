import InputError from '@/components/ui/input-error';
import InputLabel from '@/components/ui/input-label';
import Modal from '@/components/ui/modal';
import TextInput from '@/components/ui/text-input';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Button } from '../../../components/ui/button';

export default function DeleteUserForm({ className = '' }) {
  const [
    confirmingUserDeletion,
    setConfirmingUserDeletion,
  ] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    clearErrors();
    reset();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Delete Account
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once your account is deleted, all of its resources
          and data will be permanently deleted. Before
          deleting your account, please download any data or
          information that you wish to retain.
        </p>
      </header>

      <Button
        variant="destructive"
        onClick={confirmUserDeletion}
      >
        Delete Account
      </Button>

      <Modal
        show={confirmingUserDeletion}
        onClose={closeModal}
      >
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete your account?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once your account is deleted, all of its
            resources and data will be permanently deleted.
            Please enter your password to confirm you would
            like to permanently delete your account.
          </p>

          <div className="mt-6 w-full">
            <InputLabel
              htmlFor="password"
              value="Password"
              className="sr-only"
            />

            <TextInput
              className="mt-1 block w-full"
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) =>
                setData('password', e.target.value)
              }
              isFocused
              placeholder="Password"
            />

            <InputError
              message={errors.password}
              className="mt-2"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              type="submit"
              className="ms-3"
              disabled={processing}
            >
              Delete Account
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
