import { useAuth } from "@/contexts/AuthContext";
import { useState, FormEvent } from "react";
import RegisterStep from "./RegisterStep";
import VerifyEmail from "./VerifyEmail";
import VerifyPhoneStep from "./VerifyPhoneStep";

export interface RegisterFormProps {
  fullName: string;
  contactNumber: string;
  roleId: number;
  email: string;
  password: string;
}

export default function Register() {
  const { performRegister } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);

  //   useEffect(() => {
  //     if (isSubmitSuccessful) {
  //       const handler = setTimeout(() => {
  //         setIsSubmitSuccessful(false);
  //       }, 3000);

  //       return clearTimeout(handler);
  //     }
  //   }, [isSubmitSuccessful]);

  //   const onSubmit: SubmitHandler<RegisterFormProps> = async (data) => {
  //     try {
  //       const response = await performRegister(data);
  //       if (response.status === 201 || response.status === 200) {
  //         setIsSubmitSuccessful(true);
  //       } else if (response.status === 400) {
  //         setError("root", { type: "manual", message: response.data.message });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setError("root", { type: "manual", message: "Something went wrong" });
  //     }
  //   };

  function nextStep() {
    setStep(step + 1);
  }

  switch (step) {
    case 1:
      return (
        <div
          className={
            "w-full h-full p-20 flex justify-center bg-white items-start"
          }
        >
          <RegisterStep nextStep={nextStep} />
        </div>
      );
    case 2:
      return (
        <div
          className={
            "w-full h-full p-20 flex justify-center bg-white items-start"
          }
        >
          <VerifyPhoneStep />
        </div>
      );
  }
}
