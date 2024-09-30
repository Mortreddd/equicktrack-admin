import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useState,
} from "react";
import Input from "../common/Input";
import Modal from "../common/Modal";
import { cn } from "../../utils/StyleUtil";
import { Button } from "../common/Button";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  ref: Ref<HTMLDialogElement>;
}

interface LoginFormProps {
  email: string;
  password: string;
}
export const LoginModal = forwardRef<HTMLDialogElement, LoginModalProps>(
  ({ id, className, ...props }, ref) => {
    // const { performLogin, loading } = useAuth();
    // const [email, setEmail] = useState<string>("");
    // const [password, setPassword] = useState<string>("");

    const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    } = useForm<LoginFormProps>();

    // function handleLogin() {
    //   performLogin({ email, password });
    //   return redirect("/dashboard");
    // }

    const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
      alert(JSON.stringify(data));
      console.log(data.email);
      console.log(data.password);
    };

    // function handleOnChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    //   setEmail(e.target.value);
    // }
    // function handleOnChangePassword(e: ChangeEvent<HTMLInputElement>) {
    //   setPassword(e.target.value);
    // }

    return (
      <Modal ref={ref} id={id} className={cn(className)} {...props}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
        >
          <h1 className="text-black text-2xl w-full text-center">Login</h1>
          {errors.root && (
            <h1 className="text-3xl text-red-500">{errors.root.message}</h1>
          )}
          <div className="w-full">
            <Input
              type="email"
              placeholder="Enter username"
              {...register("email", { required: true })}
              variantSize={"full"}
            />
          </div>
          <div className="w-full">
            <Input
              type="password"
              // onChange={handleOnChangePassword}
              {...register("password", { required: true })}
              placeholder="Enter password"
              variantSize={"full"}
            />
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="gap-5 flex items-center">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <label>Remember me</label>
            </div>

            <Link to="/">
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
);
