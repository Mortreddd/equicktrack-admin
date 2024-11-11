import { ErrorResponse, Response } from "@/types/Models";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { RequestState } from "../common";

export default function useVerifyForgotPasswordByUuid(
  uuid: string | undefined
) {
  const [state, setState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    async function verifyForgotPassword() {
      setState({ ...state, loading: true });
      await ADMIN_API.get(`/auth/forgot-password/${uuid}`, {
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

    verifyForgotPassword();
  }, []);

  return state;
}
