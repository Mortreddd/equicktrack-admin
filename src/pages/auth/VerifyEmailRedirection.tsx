import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import SuccessIcon from "@/components/common/icons/SuccessIcon";
import LoadingSection from "@/components/LoadingSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RequestState } from "@/api/common";
import { ErrorResponse, Response } from "@/types/Models";
import { AxiosError, AxiosResponse } from "axios";
import { ADMIN_API } from "@/utils/Api";

export default function VerifyEmailRedirection() {
  const { uuid } = useParams<{ uuid: string }>();
  const [requestState, setRequestState] = useState<RequestState<Response>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    async function verifyEmail() {
      setRequestState({ error: null, data: null, loading: true });
      await ADMIN_API.get(`/auth/verify-email/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response: AxiosResponse<Response>) => {
          setRequestState({ data: response.data, loading: false, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setRequestState({
            error: error.response?.data.message,
            loading: false,
            data: null,
          });
        });
    }

    verifyEmail();
  }, []);

  return (
    <main className={"h-screen w-full antialiased flex justify-center p-20"}>
      <div className="w-96 h-fit">
        {requestState.loading && <LoadingSection />}
        <div className="w-full flex items-center flex-col">
          {requestState.error !== null && (
            <Alert variant={"danger"}>
              <DangerIcon iconSize="size-9" />
              {requestState.error}
            </Alert>
          )}
          {requestState !== null && (
            <Alert variant={"success"}>
              <SuccessIcon />
              {requestState.data?.message}
            </Alert>
          )}
          <a href="/">
            <Button variant={"primary"} rounded={"default"} className={"mt-10"}>
              Go to Home
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
}
