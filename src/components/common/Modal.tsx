import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from "react";
import { cn } from "@/utils/StyleUtil";

interface ModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  ref: Ref<HTMLDialogElement>;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ id, className, children, ...props }, ref) => {
    return (
      <dialog ref={ref} id={id} className={cn(className, "modal")} {...props}>
        <div className="modal-box">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  }
);

export default Modal;
