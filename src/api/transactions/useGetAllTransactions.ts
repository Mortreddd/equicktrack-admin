import { useEffect, useState } from "react";
import { RequestState } from "../common";
import { Transaction } from "@/types/Transactions";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Models";
import { ADMIN_API } from "@/utils/Api";

export type FilterType =
  | "all"
  | "pending"
  | "approved"
  | "returned"
  | "ongoing";

export default function useGetAllTransactions() {
  const [state, setState] = useState<RequestState<Transaction[]>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    async function fetchTransactions() {
      setState({ loading: true, error: null, data: null });
      await ADMIN_API.get("/dashboard/transactions", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response: AxiosResponse<Transaction[]>) => {
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
  }, []);

  return state;
}
