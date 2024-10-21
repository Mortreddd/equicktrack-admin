import { Button } from "@/components/common/Button";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";

export default function VerifyPhoneStep() {
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  let otpCode = "";
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  const ids = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    function render() {
      console.log("Otp code length: " + otpCode.length);
      console.log("Otp code: " + otpCode);
    }

    render();
  }, [otpCode]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 1) {
      otpCode += e.target.value;
    }
    otpRefs.current[otpCode.length]?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-fit font-sans h-fit bg-gray-50 p-4 flex shadow-md border-solid border-2 border-primary rounded-lg flex-col items-center gap-5"
    >
      <h1 className="text-black text-2xl w-full text-center">
        Verify Contact Number
      </h1>

      <p className="w-full h-fit text-center my-5">
        The verification email and the otp code for the contact number has been
        sent
      </p>

      <div className="w-full h-full">
        <div className="w-full flex gap-2 md:gap-4 items-center justify-center">
          {ids.map((data, key) => (
            <input
              key={key}
              id={String(data)}
              ref={(el) => (otpRefs.current[data] = el)}
              type={"number"}
              onChange={onChange}
              minLength={1}
              className="h-12 w-8 border-gray-400 text-center text-lg md:text-md border-solid border-2 focus:border-0 focus:outline-primary focus:outline-2 rounded"
            />
          ))}
        </div>
      </div>

      <div className="w-full mt-5">
        <Button
          type={"submit"}
          variant={"primary"}
          size={"full"}
          rounded={"default"}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
