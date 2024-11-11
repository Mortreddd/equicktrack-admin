import { RequestState } from "@/api/common";
import ApplicationLogo from "@/components/ApplicationLogo";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAlert } from "@/contexts/AlertContext";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorResponse, Response } from "@/types/Models";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function VerifyPhone() {
  const [formState, setFormState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });
  const navigate = useNavigate();
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(""));
  const { currentUser } = useAuth();
  const [attempt, setAttempt] = useState<number>(0);
  const { showAlert } = useAlert();
  const [phone, setPhone] = useState<string | undefined>(
    currentUser?.contactNumber
  );
  const ids = [0, 1, 2, 3, 4, 5];

  function onChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  useEffect(() => {
    if (currentUser?.contactNumber) {
      setPhone(currentUser?.contactNumber);
    }
  }, [currentUser]);

  const onVerifyOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      otpCode: otpCode.join(""),
    };
    setFormState({ ...formState, loading: true });
    await ADMIN_API.post("/auth/verify-otp", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<Response>) => {
        setFormState({
          ...formState,
          data: response.data,
          error: null,
        });
        setAttempt(attempt + 1);
        showAlert("Phone number is successfully verified", "success");
        navigate("/", { replace: true });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setFormState({
          ...formState,
          data: null,
          error: error.response?.data.message,
        });
        showAlert(formState.error ?? "Invalid otp code", "error");
      })
      .finally(() => {
        setFormState({ ...formState, loading: false });
      });
  };

  async function sendPhoneVerification() {
    const formData = {
      userId: currentUser?.id,
      contactNumber: phone,
    };

    setAttempt(attempt + 1);
    setFormState({ ...formState, loading: true });
    await ADMIN_API.post("/auth/verify-phone", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<Response>) => {
        setFormState({
          ...formState,
          data: response.data,
          error: null,
        });
        console.log(response);
        setAttempt(attempt + 1);
        showAlert(`Sms verification has been sent`, "success");
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setFormState({
          ...formState,
          data: null,
          error: error.response?.data.message,
        });
        showAlert(`${formState.error}`, "error");
      })
      .finally(() => {
        setFormState({ ...formState, loading: false });
      });
  }

  async function onVerifyPhoneSubmit(e: FormEvent) {
    e.preventDefault();

    sendPhoneVerification();
  }

  return (
    <main className="flex w-full h-screen">
      <div className="lg:w-[50vw] w-full h-full p-20 flex justify-center bg-white items-center">
        <div className="w-full max-w-lg font-sans h-fit bg-gray-50 p-4 flex shadow-md border-solid border-2 border-primary rounded-lg flex-col justify-start">
          <div className="flex items-center gap-5">
            <ApplicationLogo />
            <p className="text-xl md:text-3xl font-sans">Equicktrack</p>
          </div>
          <h1 className="text-lg md:text-2xl font-bold mt-5">
            Phone Verification
          </h1>
          {attempt >= 1 ? (
            <form onSubmit={onVerifyOtpSubmit} className="mt-5 block ">
              <p className="text-gray-500 mt-2">
                The sms verication has been sent in {phone}, the sms
                verification will expire in 5 minutes
              </p>
              <div className="w-full flex gap-2 md:gap-4 items-center justify-center mt-4">
                {ids.map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    value={otpCode[index]}
                    onChange={(e) => onChange(e, index)}
                    onKeyDown={(e) => onKeyDown(e, index)}
                    maxLength={1}
                    className="h-12 w-10 md:w-8 border-gray-400 text-center text-lg md:text-md border-solid border-2 focus:outline-primary focus:outline-2 rounded"
                  />
                ))}
              </div>
              <div className="w-full mt-5">
                <Button
                  type="submit"
                  variant="primary"
                  size="full"
                  loading={formState.loading}
                  rounded="default"
                >
                  Submit
                </Button>
              </div>

              <div className="w-full mt-5">
                <Button
                  type="button"
                  variant="muted"
                  size="full"
                  loading={formState.loading}
                  onClick={() => sendPhoneVerification()}
                  rounded="default"
                >
                  Resend
                </Button>
              </div>

              <div className="w-full flex justify-center mt-5">
                <span
                  onClick={() => setAttempt(0)}
                  className="text-warning text-center hover:text-warning/80 duration-200 ease-in-out transition-all py-1 px-3 md:py-2 md:px-5 hover:bg-gray-100"
                >
                  Change phone number
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={onVerifyPhoneSubmit}>
              <p className="text-gray-500 mt-2">
                We need to verify the phone number {phone} to avoid fraud
              </p>
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 09123456789"
                  defaultValue={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone(value);
                  }}
                  variantSize={"full"}
                  className="mt-1 block"
                />
              </div>
              <div className="w-full mt-5">
                <Button
                  type="submit"
                  variant="primary"
                  size="full"
                  rounded="default"
                  loading={formState.loading}
                >
                  Send
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="h-full w-[50vw] p-20 lg:flex hidden justify-center items-center bg-primary">
        <div className="flex items-center gap-5">
          <ApplicationLogo />
          <p className="text-3xl font-sans text-white">Equicktrack</p>
        </div>
      </div>
    </main>
  );
}
