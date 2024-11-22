import { Equipment } from "@/types/Equipment";
import { Paginate, PaginateParams } from "@/types/Paginate";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ErrorResponse } from "@/types/Models.ts";
import { RequestState } from "@/api/common.ts";

export function useGetEquipments({
  pageNo = 0,
  pageSize = 10,
}: PaginateParams) {
  const [state, setState] = useState<RequestState<Paginate<Array<Equipment>>>>({
    data: null,
    error: null,
    loading: false,
  });
  useEffect(() => {
    async function fetchEquipments() {
      setState({ loading: true, error: null, data: null });
      await ADMIN_API.get("/equipments", {
        params: {
          pageNo,
          pageSize,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response: AxiosResponse<Paginate<Array<Equipment>>>) => {
          setState({ error: null, data: response.data, loading: false });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            error: error?.response?.data.message,
            data: null,
            loading: false,
          });
        });
    }

    fetchEquipments();
  }, [pageNo, pageSize]);
  return { ...state } as const;
}
