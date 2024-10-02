import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useEffect,
  useState,
} from "react";
import Input from "../common/Input";
import Modal from "../common/Modal";
import { cn } from "../../utils/StyleUtil";
import { Button } from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../common/Select";
import Alert from "../Alert";
import DangerIcon from "../common/icons/DangerIcon";
import SuccessIcon from "../common/icons/SuccessIcon";

interface RegisterModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  ref: Ref<HTMLDialogElement>;
}

interface RegisterFormProps {
  fullName: string;
  contactNumber: string;
  roleId: number;
  email: string;
  password: string;
}

export const RegisterModal = forwardRef<HTMLDialogElement, RegisterModalProps>(
  ({ id, className, ...props }, ref) => {
    const { performRegister } = useAuth();
    const [isSubmitSuccessful, setIsSubmitSuccessful] =
      useState<boolean>(false);
    const {
      register,
      handleSubmit,
      setError,
      formState: { isSubmitting, errors },
    } = useForm<RegisterFormProps>();

    useEffect(() => {
      if (isSubmitSuccessful) {
        const handler = setTimeout(() => {
          setIsSubmitSuccessful(false);
        }, 3000);

        return clearTimeout(handler);
      }
    }, [isSubmitSuccessful]);

    const onSubmit: SubmitHandler<RegisterFormProps> = async (data) => {
      try {
        const response = await performRegister(data);
        if (response.status === 201 || response.status === 200) {
          setIsSubmitSuccessful(true);
        } else if (response.status === 400) {
          setError("root", { type: "manual", message: response.data.message });
        }
      } catch (error) {
        console.log(error);
        setError("root", { type: "manual", message: "Something went wrong" });
      }
    };

    const items: { value: number; label: string }[] = [
      { value: 4, label: "Student Council" },
      { value: 3, label: "Teacher" },
    ];

    return (
      <Modal ref={ref} id={id} className={cn(className)} {...props}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
        >
          <h1 className="text-black text-2xl w-full text-center">Register</h1>
          {errors.root && (
            <Alert variant={"danger"}>
              <DangerIcon />
              {errors.root.message}
            </Alert>
          )}

          {isSubmitSuccessful && (
            <Alert variant={"success"}>
              <SuccessIcon />
              The verification email has been sent
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
          <div className="w-full flex gap-5 justify-between">
            <div className="flex-1 w-auto">
              {errors.contactNumber && (
                <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                  {errors.contactNumber.message}
                </p>
              )}
              <Input
                type="tel"
                id="phone"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  validate: (value) => value !== null,
                })}
                placeholder="Enter contact number"
                variantSize={"auto"}
                className="flex-1"
              />
            </div>

            <div className="flex-1 w-auto">
              {errors.roleId && (
                <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
                  {errors.roleId.message}
                </p>
              )}
              <Select
                {...register("roleId")}
                items={items}
                className="flex-1"
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
              loading={isSubmitting}
            >
              Register
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
);
