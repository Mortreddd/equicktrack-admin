import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
} from "react";
import Input from "../common/Input";
import Modal from "../common/Modal";
import { cn } from "../../utils/StyleUtil";
import { Button } from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { parseContactNumber } from "@/utils/String";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../common/Select";

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
    const { loading } = useAuth();
    const { performRegister } = useAuth();

    const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    } = useForm<RegisterFormProps>();

    const onSubmit: SubmitHandler<RegisterFormProps> = async (data) => {
      setTimeout(() => {}, 1000);
      data.contactNumber = parseContactNumber(data.contactNumber);
      alert(JSON.stringify(data));
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
            <h1 className="text-3xl text-red-600">{errors.root.message}</h1>
          )}
          <div className="w-full">
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

            <Select {...register("roleId")} items={items} className="flex-1" />
          </div>
          <div className="w-full">
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
