import { Equipment } from "@/types/Equipment"
import { Transaction } from "@/types/Transactions";
import { User } from "@/types/User";
import { ADMIN_API } from "@/utils/Api";
import { useEffect, useState } from "react";
import {RequestState} from "@/api/common.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Models.ts";

interface DashboardDataProps {
  transactions: Transaction[];
  equipments: Equipment[];
  users: User[];
}

export function useGetDashboardData() {
  const [state, setState] = useState<RequestState<DashboardDataProps>>({
    loading : false,
    error : null,
    data : null
  })

  useEffect(() => {
    async function fetchData() {
      setState({ loading : true, error: null, data: null });
      await ADMIN_API.get("/dashboard", {
       headers: {
         "Content-Type": "application/json",
       }
     }).then((response : AxiosResponse<DashboardDataProps>) => {
       console.log(response)
       setState({ loading: false, data: response.data, error: null });
      }).catch((error : AxiosError<ErrorResponse>) => {
        console.log(error)
        setState({ loading : false, data : null, error : error?.response?.data.message})
      })
    }

    fetchData()
  }, [])

  return state;
}
