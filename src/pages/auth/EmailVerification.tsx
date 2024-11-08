import ApplicationLogo from "@/components/ApplicationLogo";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, Response } from "@/types/Models";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "@/components/Alert";
import DangerIcon from "@/components/common/icons/DangerIcon";
import { useAlert } from "@/contexts/AlertContext";
import { useState } from "react";
import { RequestState } from "@/api/common";
interface EmailVerificationFormProps {
  oldEmail: string;
  newEmail: string;
}

export default function EmailVerification() {
  const [formState, setFormState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });

  const { showAlert } = useAlert();
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EmailVerificationFormProps>({
    defaultValues: {
      oldEmail: currentUser?.email,
      newEmail: "",
    },
  });
  const onSubmit: SubmitHandler<EmailVerificationFormProps> = async (data) => {
    if (errors.newEmail) {
      showAlert(`${errors.newEmail?.message}`, "error");
      return;
    }
    const { newEmail } = data;
    const formData = {
      oldEmail: currentUser?.email,
      newEmail,
    };

    setFormState({ ...formState, loading: true });
    await ADMIN_API.post("/auth/verify-email", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<Response>) => {
        setFormState({ ...formState, loading: false, data: response.data });
        showAlert("Verification email has been sent", "info");
      })
      .catch((error: AxiosError<ErrorResponse>) => {
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

    // console.log(formData);
  };

  function handleAlert() {
    showAlert("Verification email has been sent", "info");
  }
  return (
    <main className="flex w-full h-screen">
      <div
        className={
          "lg:w-[50vw] w-full h-full p-20 flex justify-center bg-white items-center"
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <div className="flex items-center gap-5">
            <ApplicationLogo />
            <p className="text-3xl font-sans">Equicktrack</p>
          </div>
          <h1 className="text-2xl font-bold mt-5">Email Verification</h1>
          <p className="text-gray-500 mt-2">
            The email <strong>{currentUser?.email}</strong> was sent, didn't
            receive an email? Feel free to change the email you submitted.
          </p>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              {...register("newEmail", {
                required: "Email is required",
                validate: (value) => {
                  return (
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Invalid email address"
                  );
                },
              })}
              variantSize={"full"}
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
              loading={isSubmitting}
            >
              Submit
            </Button>
          </div>
          <div className="mt-5">
            <Button
              onClick={handleAlert}
              type={"button"}
              variant={"warning"}
              size={"full"}
              rounded={"default"}
            >
              Show
            </Button>
          </div>
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
