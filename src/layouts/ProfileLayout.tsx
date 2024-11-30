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
  idNumber: string;
  email: string;
}

interface PasswordFormProps {
  password: string;
  confirmPassword: string;
}

export default function ProfileLayout() {
  const { currentUser, loadUser } = useAuth();
  const { showAlert } = useAlert();

  const [requestStateProfile, setRequestStateProfile] = useState<
    RequestState<User>
  >({
    loading: false,
    data: null,
    error: null,
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile, isSubmitting: isSubmittingProfile },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      fullName: currentUser?.fullName,
      email: currentUser?.email,
    },
  });

  const onSubmitProfile: SubmitHandler<ProfileFormProps> = async (data) => {
    setRequestStateProfile({ loading: true, data: null, error: null });
    await ADMIN_API.put(`/users/${currentUser?.id}/profile/edit`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<User>) => {
        showAlert("Profile updated successfully", "success");
        loadUser();
        setRequestStateProfile({
          loading: false,
          data: response.data,
          error: null,
        });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        showAlert(error.response?.data.message ?? "An error occurred", "error");
        setRequestStateProfile({
          loading: false,
          data: null,
          error: error.response?.data.message,
        });
      });
  };

  const [requestStatePassword, setRequestStatePassword] = useState<
    RequestState<User>
  >({
    loading: false,
    data: null,
    error: null,
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    formState: { errors: errorPassword, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm<PasswordFormProps>();

  const onSubmitPassword: SubmitHandler<PasswordFormProps> = async (data) => {
    setRequestStatePassword({ loading: true, data: null, error: null });
    await ADMIN_API.patch(
      `/users/${currentUser?.id}/profile/edit/password`,
      {
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response: AxiosResponse<User>) => {
        showAlert("Password updated successfully", "success");
        loadUser();
        setRequestStatePassword({
          loading: false,
          data: response.data,
          error: null,
        });
        resetPassword();
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        showAlert(error.response?.data.message ?? "An error occurred", "error");
        setRequestStatePassword({
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
          <h6 className="lg:text-lg text-md text-center font-sans text-gray-500">
            {currentUser?.idNumber}
          </h6>
        </div>
        <div className="w-full md:w-fit flex-1 h-fit p-5 md:p-8 gap-3">
          <form
            onSubmit={handleSubmitProfile(onSubmitProfile)}
            className="p-5 w-full bg-gray-100 md:p-8 rounded-lg border-2 border-gray-200"
          >
            <h3 className="block lg:text-2xl md:text-xl text-lg text-gray-800 font-sans font-semibold text-left">
              Personal Information
            </h3>

            <div className="mt-5">
              {requestStateProfile.error && (
                <Alert variant={"danger"}>
                  <DangerIcon />
                  {requestStateProfile.error ?? "Invalid Update"}
                </Alert>
              )}
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                Full Name
              </label>
              {errorsProfile.fullName && (
                <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                  {errorsProfile.fullName.message}
                </p>
              )}
              <Input
                type="text"
                {...registerProfile("fullName", {
                  required: "Full name is required",
                })}
                defaultValue={currentUser?.fullName}
                variantSize={"full"}
                className="mt-1 block"
              />
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                ID Number
              </label>
              {errorsProfile.idNumber && (
                <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                  {errorsProfile.idNumber.message}
                </p>
              )}
              <Input
                type="text"
                {...registerProfile("idNumber", {
                  required: "ID number is required",
                  minLength: {
                    value: 8,
                    message: "ID number must be at least 8 characters",
                  },
                })}
                defaultValue={currentUser?.idNumber ?? ""}
                variantSize={"full"}
                className="mt-1 block"
              />
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                Email Address
              </label>
              {errorsProfile.email && (
                <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                  {errorsProfile.email.message}
                </p>
              )}
              <Input
                type="email"
                {...registerProfile("email", {
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

            <div className="md:mt-10 mt-8 w-full flex justify-end">
              <Button
                variant={"warning"}
                size={"default"}
                rounded={"default"}
                loading={requestStateProfile.loading || isSubmittingProfile}
              >
                Update Profile
              </Button>
            </div>
          </form>

          <form
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="p-5 w-full bg-gray-100 md:p-8 rounded-lg mt-10 md:mt-8 border-2 border-gray-200"
          >
            <h3 className="block lg:text-2xl md:text-xl text-lg text-gray-800 font-sans font-semibold text-left">
              Edit Password
            </h3>

            <div className="mt-5">
              {requestStatePassword.error && (
                <Alert variant={"danger"}>
                  <DangerIcon />
                  {requestStatePassword.error ?? "Invalid Password"}
                </Alert>
              )}
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                Password
              </label>
              {errorPassword.password && (
                <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                  {errorPassword.password.message}
                </p>
              )}
              <Input
                type="password"
                {...registerPassword("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    value === watchPassword("confirmPassword") ||
                    "Confirm password do not match",
                })}
                variantSize={"full"}
                className="mt-1 block"
              />
            </div>
            <div className="mt-5">
              <label className="block md:text-md text-sm  font-medium text-gray-700">
                ConfirmPassword
              </label>
              {errorPassword.confirmPassword && (
                <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                  {errorPassword.confirmPassword.message}
                </p>
              )}
              <Input
                type="password"
                {...registerPassword("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 8,
                    message: "Confirm password at least 8 characters",
                  },

                  validate: (value) =>
                    value === watchPassword("password") ||
                    "Passwords do not match",
                })}
                variantSize={"full"}
                className="mt-1 block"
              />
            </div>

            <div className="md:mt-10 mt-8 w-full flex justify-end">
              <Button
                variant={"warning"}
                size={"default"}
                rounded={"default"}
                loading={requestStatePassword.loading || isSubmittingPassword}
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
