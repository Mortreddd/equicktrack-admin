import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import SuccessIcon from "@/components/common/icons/SuccessIcon";
import LoadingSection from "@/components/LoadingSection";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const devUrl = import.meta.env.VITE_DEV_API_URL as string;
export default function VerifyEmail() {
  const { uuid } = useParams<{ uuid: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  useEffect(() => {
    async function verifyEmail() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${devUrl}/auth/verify-email/${uuid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        switch (response.status) {
          case 200:
            setIsSuccess(true);
            setLoading(false);
            break;

          case 422:
            setIsSuccess(false);
            setLoading(false);
            break;
        }
      } catch (error) {
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    }

    verifyEmail();
  }, []);
  return (
    <main
      className={"min-h-[100dvh] w-full antialiased flex justify-center p-20"}
    >
      <div className="w-96 h-fit">
        {loading && isSuccess === null && <LoadingSection />}
        {!loading && !isSuccess && (
          <div className="w-full flex items-center flex-col">
            <Alert variant={"danger"}>
              <DangerIcon />
              Invalid Verification
            </Alert>
            <Link to="/">
              <Button variant={"primary"}>Go to Home</Button>
            </Link>
          </div>
        )}

        {isSuccess && (
          <div className="w-full flex items-center flex-col">
            <Alert variant={"success"}>
              <SuccessIcon />
              Successfully Verified
            </Alert>
            <Link to="/">
              <Button variant={"primary"}>Go to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
