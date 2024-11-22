import { useEffect, useState } from "react";
import { Transaction } from "@/types/Transactions";
import { ADMIN_API } from "@/utils/Api";
import { Paginate, PaginateParams } from "@/types/Paginate";
import {AxiosError, AxiosResponse} from "axios";
import {RequestState} from "@/api/common.ts";
import {ErrorResponse} from "@/types/Models.ts";

export function useGetTransactions({
  pageNo = 0,
  pageSize = 10,
}: PaginateParams) {
  const [state, setState] = useState<RequestState<Paginate<Transaction[]>>>({
    data: null,
    error: null,
    loading: false,
  })

  useEffect(() => {
    async function fetchTransactions() {
      setState({ loading : true, error: null, data: null });
      await ADMIN_API.get("/transactions", {
        params: {
          pageNo,
          pageSize
        },
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response : AxiosResponse<Paginate<Array<Transaction>>>)=> {
        setState({ data: response.data, loading: false, error : null });
      }).catch((error : AxiosError<ErrorResponse>) => {
        setState({loading : false, data : null, error : error?.response?.data.message})
      })
    }

    fetchTransactions();
  }, [pageNo, pageSize]);

  return state;
}
