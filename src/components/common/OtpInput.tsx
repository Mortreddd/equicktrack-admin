import { forwardRef, HTMLAttributes, Ref } from "react";

interface OtpInputProps extends HTMLAttributes<HTMLInputElement> {
  ref: Ref<HTMLInputElement>;
  value?: string;
}

const OtpInput = () =>
  forwardRef<HTMLInputElement, OtpInputProps>(({ value }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={"number"}
          value={value}
          className="h-fit input-bordered border-primary w-fit rounded"
        />
      </>
    );
  });

export default OtpInput;
