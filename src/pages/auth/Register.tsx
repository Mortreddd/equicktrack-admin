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

export interface RegisterFormProps {
  fullName: string;
  roleId: number;
  email: string;
  idNumber: string;
  password: string;
}

export default function Register() {
  const { performRegister } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormProps>();

  const onSubmit: SubmitHandler<RegisterFormProps> = async (data) => {
    try {
      const response = await performRegister(data);

      if (response.status === 201) {
        navigation("/auth/verify-email", { replace: true });
        setIsSuccess(true);
        return;
      } else if (response.status === 422) {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const items: { value: number; label: string }[] = [
    { value: 4, label: "Student Council" },
    { value: 3, label: "Teacher" },
  ];
  return (
    <main className="w-full h-screen flex">
      <div
        className={
          "lg:w-[50vw] w-full h-full p-20 flex justify-center bg-white items-center"
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-fit font-sans h-fit bg-gray-50 p-4 flex shadow-md border-solid border-2 border-primary rounded-lg flex-col items-center gap-5"
        >
          {loading && (
            <div className="w-full h-full z-10 top-0 left-0 absolute bg-white/50"></div>
          )}
          <h1 className="text-black text-2xl w-full text-center">Register</h1>
          {(errors.root || isSuccess !== null) && (
            <Alert variant={"danger"}>
              <DangerIcon />
              {errors.root?.message ?? "Invalid Registration"}
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
                    minLength: 8

                  })}
                  placeholder="Enter ID number"
                  variantSize="auto"
              />
            </div>

            <div className="flex-1">
              {errors.roleId && (
                  <p className="text-xs text-red-600 mb-1">
                    {errors.roleId.message}
                  </p>
              )}
              <Select
                  items={items}
                  {...register("roleId", {
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
              loading={loading || isSubmitting}
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
