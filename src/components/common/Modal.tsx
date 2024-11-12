import {forwardRef, HTMLAttributes, PropsWithChildren, Ref, useImperativeHandle, useRef} from "react";
import { cn } from "@/utils/StyleUtil";

interface ModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  ref: Ref<HTMLDialogElement>;
}


export interface ModalRef {
    open : () => void;
    close : () => void;
}


const Modal = forwardRef<ModalRef, ModalProps>(
  ({ id, className, children, ...props }, ref) => {
      const modalRef = useRef<HTMLDialogElement>(null);
      useImperativeHandle(ref, () => {
          return {
              open() {
                modalRef.current?.show()
              },
              close() {
                modalRef.current?.close()
              }
          }
      })
    return (
      <dialog ref={modalRef} id={id} className={cn(className, "modal")} {...props}>
        <div className="modal-box">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  }
);

export default Modal;
