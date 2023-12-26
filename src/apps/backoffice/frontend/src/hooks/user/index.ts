import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserServices } from '../../services/user_services';
import { QueryKeys } from '../../utils/constants';

export function useUser() {
  const userService = new UserServices();

  return useQuery({
    queryKey: QueryKeys.getUser,
    queryFn: userService.getProfile
  });
}

export function useUsers() {
  const userService = new UserServices();

  return useQuery({
    queryKey: QueryKeys.getUsers,
    queryFn: userService.getUsers
  });
}

export function useLogin() {
  const userService = new UserServices();

  return useMutation({
    mutationFn: userService.login
  });
}

export function useRegister() {
  const userService = new UserServices();

  return useMutation({
    mutationFn: userService.register
  });
}

export function useDeleteUser() {
  const userService = new UserServices();

  return useMutation({
    mutationFn: userService.deleteUser
  });
}

export function useSignOut() {
  const userService = new UserServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.signOut,
    onSuccess: () => {
      queryClient.clear();
    }
  });
}
