import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface RegisterFormProps {
  fullName: string;
  contactNumber: string;
  roleId: number;
  email: string;
  password: string;
}

interface RegisterStepProps {
  nextStep: () => void;
}
export default function RegisterStep({ nextStep }: RegisterStepProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    // handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormProps>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep();
    }, 3000);
  }

  const items: { value: number; label: string }[] = [
    { value: 4, label: "Student Council" },
    { value: 3, label: "Teacher" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-fit font-sans h-fit bg-gray-50 p-4 flex shadow-md border-solid border-2 border-primary rounded-lg flex-col items-center gap-5"
    >
      {loading && (
        <div className="w-full h-full z-10 top-0 left-0 absolute bg-white/50"></div>
      )}
      <h1 className="text-black text-2xl w-full text-center">Register</h1>
      {errors.root && (
        <Alert variant={"danger"}>
          <DangerIcon />
          {errors.root.message}
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
          // {...register("fullName", {
          //   required: "Full name is required",
          // })}
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
            // {...register("contactNumber", {
            //   required: "Contact number is required",
            //   validate: (value) => value !== null,
            // })}
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
          <Select {...register("roleId")} items={items} className="flex-1" />
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
            // {...register("email", {
            //   required: "Email is required",
            //   validate: (value) => {
            //     return (
            //       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            //       "Invalid email address"
            //     );
            //   },
            // })}
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
          // {...register("password", {
          //   min: 8,
          //   required: "Password is required",
          // })}
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
          loading={loading}
        >
          Register
        </Button>
      </div>
    </form>
  );
}
