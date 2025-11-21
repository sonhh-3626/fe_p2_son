import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/User";
import { ProfileFormData } from "@/lib/types";
import { changePassword, fetchUserProfile, updateAvatar, updateProfile } from "@/libs/api/profile";
import { STALE_TIME_DEFAULT } from "@/constants/queryParams";

export const QUERY_KEYS = {
  user: ["profile"] as const,
};

export function useUserProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: fetchUserProfile,
    staleTime: STALE_TIME_DEFAULT,
    retry: 2,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onMutate: async (newData: ProfileFormData) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.user });

      const previousUser = queryClient.getQueryData<User>(QUERY_KEYS.user);

      if (previousUser) {
        queryClient.setQueryData<User>(QUERY_KEYS.user, {
          ...previousUser,
          ...newData,
        });
      }

      return { previousUser };
    },
    onError: (err, newData, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(QUERY_KEYS.user, context.previousUser);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.user, data);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
