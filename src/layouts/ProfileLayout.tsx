import { RequestState } from "@/api/common";
import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import Input from "@/components/common/Input";
import { useAlert } from "@/contexts/AlertContext";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorResponse } from "@/types/Models";
import { User } from "@/types/User";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProfileFormProps {
  fullName: string;
  contactNumber: string;
  email: string;
}

export default function ProfileLayout() {
  const { currentUser, loadUser } = useAuth();
  const [formState, setFormState] = useState<RequestState<User>>({
    loading: false,
    data: null,
    error: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      fullName: currentUser?.fullName,
      contactNumber: currentUser?.contactNumber,
      email: currentUser?.email,
    },
  });

  const { showAlert } = useAlert();

  const onSubmit: SubmitHandler<ProfileFormProps> = async (data) => {
    setFormState({ loading: true, data: null, error: null });
    await ADMIN_API.put(`/users/${currentUser?.id}/profile/edit`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<User>) => {
        showAlert("Profile updated successfully", "success");
        loadUser();
        setFormState({ loading: false, data: response.data, error: null });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        showAlert(error.response?.data.message ?? "An error occurred", "error");
        setFormState({
          loading: false,
          data: null,
          error: error.response?.data.message,
        });
      });
  };

  return (
    <div className="w-full h-full pt-5 md:pt-10">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-sans text-gray-800 block">
        Profile
      </h1>
      <div className="mt-2 md:mt-5 w-full h-full flex flex-col md:flex-row md:items-start items-center">
        <div className="w-fit h-fit p-5 md:p-8">
          <h1 className="lg:text-xl text-lg text-center font-sans font-semibold text-black">
            {currentUser?.fullName}
          </h1>
          <h6 className="lg:text-lg text-md text-center font-sans text-gray-500">
            {currentUser?.email}
          </h6>
        </div>
        <div className="w-full md:w-fit flex-1 h-fit p-5 md:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 w-full bg-gray-100 md:p-8 rounded-lg border-2 border-gray-200"
          >
            <h3 className="block lg:text-2xl md:text-xl text-lg text-gray-800 font-sans font-semibold text-left">
              Personal Information
            </h3>

            <div className="mt-5">
              {errors.root && (
                <Alert variant={"danger"}>
                  <DangerIcon />
                  {errors.root?.message ?? "Invalid Registration"}
                </Alert>
              )}
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                Full Name
              </label>
              <Input
                type="text"
                {...register("fullName", {
                  required: "Full name is required",
                })}
                defaultValue={currentUser?.fullName}
                variantSize={"full"}
                className="mt-1 block"
              />
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                Email Address
              </label>
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
                defaultValue={currentUser?.email}
                variantSize={"full"}
                className="mt-1 block"
              />
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                type="tel"
                id="phone"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  validate: {
                    isLengthValid: (value) =>
                      value.length === 11 || "Contact number must be 11 digits",
                    startsWith09: (value) =>
                      value.startsWith("09") ||
                      "Contact number must start with '09'",
                  },
                })}
                defaultValue={currentUser?.contactNumber}
                variantSize={"full"}
                className="flex-1"
              />
            </div>

            <div className="md:mt-10 mt-8 w-full flex justify-end">
              <Button
                variant={"warning"}
                size={"default"}
                rounded={"default"}
                loading={formState.loading || isSubmitting}
              >
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
