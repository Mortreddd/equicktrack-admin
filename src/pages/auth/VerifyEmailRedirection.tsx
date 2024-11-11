import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import SuccessIcon from "@/components/common/icons/SuccessIcon";
import LoadingSection from "@/components/LoadingSection";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useVerifyEmailByUuid from "@/api/auth/useVerifyEmailByUuid";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function VerifyEmailRedirection() {
  const { uuid } = useParams<{ uuid: string }>();
  const { loading, error, data } = useVerifyEmailByUuid(uuid);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  if (currentUser?.contactNumberVerifiedAt !== null) {
    setIsRedirecting(true);
    const timeout = setTimeout(() => {
      setIsRedirecting(false);
      navigate("/", { replace: true });
    }, 5000);

    clearTimeout(timeout);
  }

  return (
    <main className={"h-screen w-full antialiased flex justify-center p-20"}>
      <div className="w-96 h-fit">
        {loading || (isRedirecting && <LoadingSection />)}
        <div className="w-full flex items-center flex-col">
          {error !== null && (
            <Alert variant={"danger"}>
              <DangerIcon iconSize="size-9" />
              {error}
            </Alert>
          )}
          {data !== null && (
            <Alert variant={"success"}>
              <SuccessIcon />
              {data.message}
            </Alert>
          )}
          {currentUser?.contactNumberVerifiedAt === null && (
            <a href="/">
              <Button
                variant={"primary"}
                rounded={"default"}
                className={"mt-10"}
              >
                Go to Home
              </Button>
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
