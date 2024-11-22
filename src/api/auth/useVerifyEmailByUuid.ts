import { ErrorResponse, Response } from "@/types/Models";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { RequestState } from "../common";

export default function useVerifyEmailByUuid(uuid: string | undefined) {
  const [state, setState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    async function verifyEmail() {
      setState({ error: null, data: null, loading: true });
      await ADMIN_API.get(`/auth/verify-email/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response: AxiosResponse<Response>) => {
          setState({ data: response.data, loading: false, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            error: error.response?.data.message,
            loading: false,
            data: null,
          });
        });
    }

    verifyEmail();
  }, []);

  return state;
}
