import { Paginate, PaginateParams } from "@/types/Paginate";
import { User } from "@/types/User";
import { ADMIN_API } from "@/utils/Api";
import {AxiosError, AxiosResponse} from "axios";
import { useEffect, useState } from "react";
import {RequestState} from "@/api/common.ts";
import {ErrorResponse} from "@/types/Models.ts";

export function useGetUsers({ pageNo = 0, pageSize = 10 }: PaginateParams) {
  
  const [state, setState] = useState<RequestState<Paginate<User[]>>>({
    loading : false,
    error : null,
    data : null
  })
  useEffect(() => {
    async function fetchUsers() {
      setState({loading: true, error: null, data: null});
      await ADMIN_API.get("/users", {
        params: {
          pageNo,
          pageSize
        },
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response: AxiosResponse<Paginate<User[]>>) => {
        setState({loading: false, error: null, data: response.data})
      }).catch((error: AxiosError<ErrorResponse>) => {
        setState({loading: false, error: error?.response?.data.message, data: null})
      })
    }

    fetchUsers();
  }, [pageNo, pageSize]);

  return state;
}
