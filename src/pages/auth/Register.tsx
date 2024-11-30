import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ApplicationLogo from "@/components/ApplicationLogo";
import { RequestState } from "@/api/common";
import { JwtTokenResponse } from "@/types/Auth";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Models";
import { RoleEnum } from "@/types/Role";

export interface RegisterFormProps {
  fullName: string;
  role: RoleEnum;
  email: string;
  idNumber: string;
  password: string;
}

export default function Register() {
  const [requestState, setRequestState] = useState<
    RequestState<JwtTokenResponse>
  >({
    loading: false,
    data: null,
    error: null,
  });
  const { performRegister } = useAuth();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormProps>();

  const onSubmit: SubmitHandler<RegisterFormProps> = async (data) => {
    setRequestState({ data: null, loading: true, error: null });
    await ADMIN_API.post("/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<JwtTokenResponse>) => {
        const { accessToken } = response.data;
        performRegister(accessToken);
        setRequestState({ data: response.data, loading: false, error: null });
        navigation("/auth/verify-email", { replace: true });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setRequestState({
          data: null,
          loading: false,
          error: error.response?.data.message,
        });
      });
  };

  const roles = [
    { value: RoleEnum.STUDENT, label: "Student Council" },
    { value: RoleEnum.PROFESSOR, label: "Teacher" },
  ];
  return (
    <main className="w-full h-screen flex">
      <div
        className={
          "lg:w-[50vw] w-full h-full p-5 lg:p-20 md:p-10 flex justify-center bg-white items-center"
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-fit font-sans h-fit bg-gray-50 p-4 flex shadow-md border-solid border-2 border-primary rounded-lg flex-col items-center gap-5"
        >
          {requestState.loading && (
            <div className="w-full h-full z-10 top-0 left-0 absolute bg-white/50"></div>
          )}
          <h1 className="text-black text-2xl w-full text-center">Register</h1>
          {requestState.error !== null && (
            <Alert variant={"danger"}>
              <DangerIcon />
              {requestState.error ?? "Invalid Registration"}
            </Alert>
          )}
          <div className="w-full">
            {errors.fullName && (
              <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                {errors.fullName.message}
              </p>
            )}
            <Input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
              })}
              placeholder="Enter full name"
              variantSize={"full"}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-5 md:justify-between md:items-end">
            <div className="flex-1">
              {errors.idNumber && (
                <p className="text-xs text-red-600 mb-1">
                  {errors.idNumber.message}
                </p>
              )}
              <Input
                type="text"
                {...register("idNumber", {
                  required: "ID number is required",
                  minLength: 8,
                })}
                placeholder="Enter ID number"
                variantSize="full"
              />
            </div>

            <div className="flex-1">
              {errors.role && (
                <p className="text-xs text-red-600 mb-1">
                  {errors.role.message}
                </p>
              )}
              <Select
                items={roles}
                {...register("role", {
                  required: "Role is required",
                })}
              />
            </div>
          </div>
          <div className="w-full">
            {errors.email && (
              <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                {errors.email.message}
              </p>
            )}
            <div className="w-full">
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    return (
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Invalid email address"
                    );
                  },
                })}
                placeholder="Enter email"
                variantSize={"full"}
              />
            </div>
          </div>
          <div className="w-full">
            {errors.password && (
              <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                {errors.password.message}
              </p>
            )}
            <Input
              type="password"
              {...register("password", {
                min: 8,
                required: "Password is required",
              })}
              placeholder="Enter password"
              variantSize={"full"}
            />
          </div>

          <div className="w-full mt-5">
            <Button
              type={"submit"}
              variant={"primary"}
              size={"full"}
              rounded={"default"}
              loading={requestState.loading || isSubmitting}
            >
              Register
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
