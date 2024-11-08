import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import SuccessIcon from "@/components/common/icons/SuccessIcon";
import LoadingSection from "@/components/LoadingSection";
import { Link, useParams } from "react-router-dom";
// import useVerifyEmailByUuid from "@/api/auth/useVerifyEmailByUuid";
import { useEffect, useState } from "react";
import { RequestState } from "@/api/common";
import { ADMIN_API } from "@/utils/Api";
import { ErrorResponse, Response } from "@/types/Models";
import { AxiosResponse, AxiosError } from "axios";

export default function VerifyEmailRedirection() {
  const { uuid } = useParams<{ uuid: string }>();
  const [state, setState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });

  // useEffect(() => {
  async function verifyEmail() {
    setState({ ...state, loading: true });
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
  // }, []);

  return (
    <main className={"h-screen w-full antialiased flex justify-center p-20"}>
      <div className="w-96 h-fit">
        {state.loading && <LoadingSection />}
        <div className="w-full flex items-center flex-col">
          {state.error !== null && (
            <Alert variant={"danger"}>
              <DangerIcon iconSize="size-9" />
              {state.error}
            </Alert>
          )}
          {state.data !== null && (
            <Alert variant={"success"}>
              <SuccessIcon />
              {state.data.message}
            </Alert>
          )}
          <Link to="/">
            <Button variant={"primary"} rounded={"default"} className={"mt-10"}>
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
