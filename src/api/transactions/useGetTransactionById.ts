import { useEffect, useState } from "react";
import { RequestState } from "@/api/common.ts";
import { ADMIN_API } from "@/utils/Api.ts";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Models.ts";
import { Transaction } from "@/types/Transactions";

export function useGetTransactionById(equipmentId: number) {
  const [state, setState] = useState<RequestState<Transaction>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    async function getEquipmentById() {
      setState({ error: null, data: null, loading: true });
      await ADMIN_API.get(`/equipments/${equipmentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response: AxiosResponse<Transaction>) => {
          setState({ loading: false, data: response.data, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({ loading: false, error: error?.message, data: null });
        });
    }

    getEquipmentById();
  }, [equipmentId]);

  return state;
}
