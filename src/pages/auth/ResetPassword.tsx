import ApplicationLogo from "@/components/ApplicationLogo";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, Response } from "@/types/Models";
import { useAlert } from "@/contexts/AlertContext";
import { useState } from "react";
import { RequestState } from "@/api/common";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "@/components/Alert";
import DangerIcon from "@/components/common/icons/DangerIcon";

interface ResetPasswordFormProps {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [formState, setFormState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });

  const { uuid } = useParams<{ uuid: string }>();
  const [attempt, setAttempt] = useState<number>(0);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormProps>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { showAlert } = useAlert();

  const onSubmit: SubmitHandler<ResetPasswordFormProps> = async (data) => {
    setFormState({ ...formState, loading: true });
    await ADMIN_API.patch(
      `/auth/reset-password/${uuid}`,
      {
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response: AxiosResponse<Response>) => {
        setAttempt(attempt + 1);
        setFormState({ ...formState, loading: false, data: response.data });
        showAlert(`${response.data.message}`, "success");
        navigate("/", { replace: true });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setAttempt(attempt + 1);
        setFormState({
          ...formState,
          loading: false,
          error: error.response?.data.message,
        });
        showAlert(
          error.response?.data.details ?? "Something went wrong",
          "error"
        );
      });
  };

  return (
    <main className="flex w-full h-screen">
      <div
        className={
          "lg:w-[50vw] w-full h-full p-20 gap-5 flex justify-center bg-white items-center"
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <div className="flex items-center gap-5">
            <ApplicationLogo />
            <p className="text-2xl md:text-3xl font-sans">Equicktrack</p>
          </div>
          {errors.password && (
            <div className="my-3">
              <Alert variant={"danger"}>
                <DangerIcon />
                {errors.password?.message ?? errors.confirmPassword?.message}
              </Alert>
            </div>
          )}
          <h1 className="text-xl md:text-2xl font-bold mt-5">Reset Password</h1>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) =>
                  value === watch("confirmPassword") ||
                  "Passwords do not match",
              })}
              variantSize={"full"}
              className="mt-1 block"
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
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
              loading={formState.loading || isSubmitting}
            >
              Submit
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
