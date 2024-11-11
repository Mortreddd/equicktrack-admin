import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import SuccessIcon from "@/components/common/icons/SuccessIcon";
import LoadingSection from "@/components/LoadingSection";
import { useNavigate, useParams } from "react-router-dom";
import useVerifyForgotPasswordByUuid from "@/api/auth/useVerifyForgotPasswordByUuid";

export default function ForgotPasswordRedirection() {
  const { uuid } = useParams<{ uuid: string }>();
  const { loading, error, data } = useVerifyForgotPasswordByUuid(uuid);
  const navigate = useNavigate();

  if (data !== null) {
    navigate(`/auth/reset-password/${uuid}`);
  }

  return (
    <main className={"h-screen w-full antialiased flex justify-center p-20"}>
      <div className="w-96 h-fit">
        {loading && <LoadingSection />}
        <div className="w-full flex items-center flex-col">
          {error !== null && (
            <>
              <Alert variant={"danger"}>
                <DangerIcon iconSize="size-9" />
                {error}
              </Alert>
              <a href="/">
                <Button
                  variant={"primary"}
                  rounded={"default"}
                  className={"mt-10"}
                >
                  Go to Home
                </Button>
              </a>
            </>
          )}
          {data !== null && (
            <Alert variant={"success"}>
              <SuccessIcon />
              {data.message}
            </Alert>
          )}
        </div>
      </div>
    </main>
  );
}
