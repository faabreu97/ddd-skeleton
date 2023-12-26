import { TrashIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Input/Select';
import PageContent from '../../components/Layout/PageContent';
import Modal from '../../components/Modal';
import ConfirmationDialog from '../../components/Modal/Confirmation';
import Table, { TableAction, TableColumn } from '../../components/Table';
import useOpenable from '../../hooks/useOpenable';
import { useDeleteUser, useRegister, useUsers } from '../../hooks/user';
import { QueryKeys } from '../../utils/constants';

export default function Users() {
  const { data: users, isPending } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { open, handleClose, handleOpen } = useOpenable();
  const [selectedUser, setSelectedUser] = useState<any>();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const queryClient = useQueryClient();

  const onDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id, {
        onSuccess: () => {
          toast.success('User deleted successfully');
          queryClient.resetQueries({ queryKey: QueryKeys.getUsers });
        }
      });
    }
  };

  const columns: TableColumn[] = [
    { header: 'name', key: 'name' },
    { header: 'email', key: 'email' },
    { header: 'role', key: 'role' }
  ];

  const actions: TableAction<any>[] = [
    {
      header: 'delete',
      icon: <TrashIcon className="w-5" />,
      onClick: (value: any) => {
        setSelectedUser(value);
        setOpenDeleteConfirmation(true);
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin | Users</title>
      </Helmet>
      <PageContent
        title="Users"
        titleActions={[
          {
            text: 'Add',
            onClick: handleOpen
          }
        ]}
      >
        <Table
          data={users ?? []}
          columns={columns}
          actions={actions}
          loadingData={isPending}
        />
      </PageContent>
      <ConfirmationDialog
        open={openDeleteConfirmation}
        onClose={() => {
          setOpenDeleteConfirmation(false);
        }}
        title="Delete confirmation"
        description="Are you sure do you want to delete this behavior?"
        okLabel={'Delete'}
        onConfirm={() => {
          setOpenDeleteConfirmation(false);
          onDelete();
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <RegisterUserModalContent handleClose={handleClose} />
      </Modal>
    </>
  );
}

const RegisterUserModalContent = (props: { handleClose: () => void }) => {
  const { mutate: registerUser, isPending } = useRegister();
  const [errors, setErrors] = useState<any>(null);
  const queryClient = useQueryClient();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    registerUser(
      {
        name: data.get('name')?.toString().trim() ?? '',
        email: data.get('email')?.toString().trim() ?? '',
        password: data.get('password')?.toString().trim() ?? '',
        role: data.get('role')?.toString().trim() ?? ''
      },
      {
        onSuccess: () => {
          queryClient.resetQueries({ queryKey: QueryKeys.getUsers });
          toast.success('User registered successfully');
          props.handleClose();
        },
        onError: error => {
          console.log('error', error);
          if (error instanceof AxiosError) {
            setErrors(error.response?.data.errors);
            return;
          }
          toast.error(error.message);
        }
      }
    );
  };

  return (
    <form className="flex flex-col gap-3 p-5" onSubmit={handleSubmit}>
      <Input name="name" label="Name" error={errors?.name} />
      <Input name="email" label="Email" error={errors?.email} />
      <Input name="password" label="Password" error={errors?.password} />
      <Select name="role" label="Role">
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="read">Read</option>
      </Select>
      <Button loading={isPending} type="submit">
        Register
      </Button>
    </form>
  );
};
