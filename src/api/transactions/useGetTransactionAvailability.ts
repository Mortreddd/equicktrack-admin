import { Transaction } from "@/types/Transactions";
import { useEffect, useState } from "react";
import { RequestState } from "../common";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "react-router-dom";

interface GetAvailabilityProps {
  availability: boolean;
}

export default function useGetTransactionAvailability({
  availability,
}: GetAvailabilityProps) {
  const [state, setState] = useState<RequestState<Transaction[]>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    async function fetchData() {
      setState({ loading: true, error: null, data: null });
      await ADMIN_API.get(`/dashboard/transactions`, {
        params: {
          availability,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response: AxiosResponse<Array<Transaction>>) => {
          setState({
            data: response.data,
            error: null,
            loading: false,
          });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            error: error?.message,
            loading: false,
          });
        });
    }

    fetchData();
  }, [availability]);

  return state;
}
