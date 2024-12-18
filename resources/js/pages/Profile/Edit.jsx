import DashboardLayout from '@/layouts/DashboardLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
  return (
    <DashboardLayout>
      <div className="px-4 py-6 md:px-0 md:py-8">
        <div className="mx-auto grid w-full grid-cols-1 items-start gap-4 sm:px-6 lg:px-8 xl:grid-cols-2">
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="h-full bg-white p-4 shadow sm:rounded-lg sm:p-8 xl:row-span-2">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
