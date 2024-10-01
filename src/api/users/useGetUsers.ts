import { Paginate, PaginateParams } from "@/types/Paginate";
import { User } from "@/types/User";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useGetUsers({ pageNo = 0, pageSize = 10 }: PaginateParams) {
  const [result, setResult] = useState<Paginate<User[]> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const response = await ADMIN_API.get<
          PaginateParams,
          AxiosResponse<Paginate<User[]>>
        >("/users", {
          params: {
            pageNo,
            pageSize,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setResult(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { result, isLoading, error } as const;
}
