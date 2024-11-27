import { useEffect, useState } from "react";
import { RequestState } from "../common";
import { Transaction } from "@/types/Transactions";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Models";
import { ADMIN_API } from "@/utils/Api";
import {Paginate, PaginateParams} from "@/types/Paginate.ts";

export type FilterType =
  | "all"
  | "pending"
  | "approved"
  | "returned"
  | "borrowed";

export default function useGetAllTransactions({ pageNo, pageSize } : PaginateParams) {
  const [state, setState] = useState<RequestState<Paginate<Transaction[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    async function fetchTransactions() {
      setState({ loading: true, error: null, data: null });
      await ADMIN_API.get("/transactions", {
        params: {
          pageNo,
          pageSize
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response: AxiosResponse<Paginate<Transaction[]>>) => {
          setState({ data: response.data, loading: false, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            loading: false,
            data: null,
            error: error?.response?.data.message,
          });
        });
    }

    fetchTransactions();
  }, [pageNo, pageSize]);

  return state;
}
