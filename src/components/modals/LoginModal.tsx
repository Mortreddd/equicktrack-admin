import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useState,
} from "react";
import Input from "../common/Input";
import Modal, { ModalRef } from "../common/Modal";
import { cn } from "@/utils/StyleUtil";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "../Alert";
import DangerIcon from "../common/icons/DangerIcon";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "@/contexts/AlertContext";
import { RequestState } from "@/api/common";
import { JwtTokenResponse } from "@/types/Auth";

interface LoginModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {}

interface LoginFormProps {
  email: string;
  password: string;
}

function LoginModal(
  { id, className, ...props }: LoginModalProps,
  ref: Ref<ModalRef>
) {
  const [requestState, setRequestState] = useState<
    RequestState<JwtTokenResponse>
  >({
    loading: false,
    data: null,
    error: null,
  });
  const { performLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormProps>();

  const { showAlert } = useAlert();
  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    try {
      await performLogin(data);
      showAlert("Successfully login", "success");
    } catch (error) {
      setRequestState({
        loading: false,
        data: null,
        error: "Credentials do not match our records",
      });
    }
  };

  return (
    <Modal ref={ref} id={id} className={cn(className)} {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
      >
        <h1 className="text-black text-2xl w-full text-center">Login</h1>
        {requestState.error && (
          <Alert variant={"danger"}>
            <DangerIcon />
            {requestState.error}
          </Alert>
        )}
        <div className="w-full">
          {errors.email && (
            <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
              {errors.email.message}
            </p>
          )}
          <Input
            type="email"
            placeholder="Enter username"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                "Invalid email address",
            })}
            variantSize={"full"}
          />
        </div>
        <div className="w-full">
          {errors.password && (
            <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
              {errors.password.message}
            </p>
          )}
          <Input
            type="password"
            // onChange={handleOnChangePassword}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter password"
            variantSize={"full"}
          />
        </div>
        <div className="w-full justify-end flex items-center">
          <Link to="/auth/forgot-password" target="_blank">
            <p className="text-black hover:text-gray-600 duration-200 ease-in-out transition-colors font-sans text-sm">
              Forgot password?
            </p>
          </Link>
        </div>
        <div className="w-full mt-5">
          <Button
            variant={"primary"}
            size={"full"}
            type={"submit"}
            rounded={"default"}
            loading={isSubmitting}
          >
            Login
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default forwardRef(LoginModal);
