import { User } from "@/types/User";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface DeleteUserProps {
  userId: number;
}
export function useDeleteUser({ userId }: DeleteUserProps) {
  const [result, setResult] = useState<AxiosResponse<User> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    async function fetchEquipments() {
      try {
        setIsLoading(true);
        const response = await ADMIN_API.delete<
          DeleteUserProps,
          AxiosResponse<User>
        >(`/users/${userId}/delete`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setResult(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEquipments();
  }, []);

  return { result, isLoading, error } as const;
}
