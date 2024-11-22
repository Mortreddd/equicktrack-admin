import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useImperativeHandle,
  useRef,
} from "react";
import { Button } from "./Button";
import { cn } from "@/utils/StyleUtil";

export interface AlertModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  onConfirm: () => void;
  type: "danger" | "success" | "warning";
  loading?: boolean;
}

export interface AlertModalRef {
  confirm: () => void;
  open: () => void;
  close: () => void;
}
function AlertModal(
  { className, type, children, loading, onConfirm }: AlertModalProps,
  ref: Ref<AlertModalRef>
) {
  const alertModalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      confirm() {
        onConfirm();
      },
      open() {
        alertModalRef.current?.showModal();
      },
      close() {
        alertModalRef.current?.close();
      },
    };
  });

  return (
    <dialog ref={alertModalRef} className="modal modal-middle">
      <div className="modal-box">
        <div className={cn("w-full h-fit", className)}>{children}</div>
        <div className="modal-action">
          <form
            method="dialog"
            className={"w-full justify-center items-center flex gap-4 md:gap-8"}
          >
            {/* if there is a button in form, it will close the modal */}
            <Button variant={"muted"} rounded={"default"}>
              Cancel
            </Button>

            <Button
              type={"button"}
              variant={type}
              loading={loading}
              rounded={"default"}
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default forwardRef(AlertModal);
