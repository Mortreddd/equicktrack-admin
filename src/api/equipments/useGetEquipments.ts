import { Equipment } from "@/types/Equipment";
import { Paginate, PaginateParams } from "@/types/Paginate";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useGetEquipments({
  pageNo = 0,
  pageSize = 10,
}: PaginateParams) {
  const [result, setResult] = useState<Paginate<Equipment[]> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    async function fetchEquipments() {
      try {
        setIsLoading(true);
        const response = await ADMIN_API.get<
          PaginateParams,
          AxiosResponse<Paginate<Equipment[]>>
        >("/equipments", {
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

    fetchEquipments();
  }, []);

  return { result, isLoading, error } as const;
}
