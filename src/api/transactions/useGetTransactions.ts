import { useEffect, useState } from "react";
import { Transaction } from "@/types/Transactions";
import { ADMIN_API } from "@/utils/Api";
import { Paginate, PaginateParams } from "@/types/Paginate";
import { AxiosResponse } from "axios";

export function useGetTransactions({
  pageNo = 0,
  pageSize = 10,
}: PaginateParams) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<Paginate<Transaction[]> | null>(null);
  const [error, setError] = useState<Object | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      setIsLoading(true);

      try {
        const response = await ADMIN_API.get<
          PaginateParams,
          AxiosResponse<Paginate<Array<Transaction>>>
        >("/transactions", {
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
        setError(error as any);
      }
      setIsLoading(false);
    }

    fetchTransactions();
  }, []);

  return { isLoading, result, error } as const;
}
