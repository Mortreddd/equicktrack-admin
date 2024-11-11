import ApplicationLogo from "@/components/ApplicationLogo";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, Response } from "@/types/Models";
import { useAlert } from "@/contexts/AlertContext";
import { ChangeEvent, FormEvent, useState } from "react";
import { RequestState } from "@/api/common";
interface EmailVerificationFormProps {
  email: string;
}

export default function ForgotPassword() {
  const [formState, setFormState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });
  const [attempt, setAttempt] = useState<number>(0);

  const [formData, setFormData] = useState<EmailVerificationFormProps>({
    email: "",
  });
  const { showAlert } = useAlert();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendForgotPassword();
  }

  async function sendForgotPassword() {
    setFormState({ ...formState, loading: true });
    await ADMIN_API.post("/auth/forgot-password", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<Response>) => {
        setAttempt(attempt + 1);
        setFormState({ ...formState, loading: false, data: response.data });
        showAlert("Reset password email has been sent", "info");
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setAttempt(attempt + 1);
        setFormState({
          ...formState,
          loading: false,
          error: error.response?.data.details,
        });
        showAlert(
          error.response?.data.details ?? "Something went wrong",
          "error"
        );
      });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setFormData({ email: value });
  }

  return (
    <main className="flex w-full h-screen">
      <div
        className={
          "lg:w-[50vw] w-full h-full p-20 flex justify-center bg-white items-center"
        }
      >
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex items-center gap-5">
            <ApplicationLogo />
            <p className="text-2xl md:text-3xl font-sans">Equicktrack</p>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mt-5">
            Forgot Password
          </h1>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              onChange={onChange}
              variantSize={"full"}
              defaultValue={formData.email}
              className="mt-1 block"
            />
          </div>
          <div className="mt-5">
            <Button
              type={"submit"}
              variant={"primary"}
              rounded={"default"}
              size={"full"}
              className={"font-sans font-semibold"}
              loading={formState.loading}
            >
              Submit
            </Button>
          </div>
          {attempt >= 1 && (
            <div className="mt-5">
              <Button
                type={"button"}
                variant={"warning"}
                rounded={"default"}
                size={"full"}
                onClick={() => sendForgotPassword()}
                className={"font-sans font-semibold"}
                loading={formState.loading}
              >
                Resend
              </Button>
            </div>
          )}
        </form>
      </div>
      <div className="h-full w-[50vw] p-20 lg:flex  hidden justify-center items-center bg-primary">
        <div className="flex items-center gap-5">
          <ApplicationLogo />
          <p className="text-3xl font-sans text-white">Equicktrack</p>
        </div>
      </div>
    </main>
  );
}
