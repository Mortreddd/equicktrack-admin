import {forwardRef, HTMLAttributes, PropsWithChildren, Ref, useImperativeHandle, useRef} from "react";
import { cn } from "@/utils/StyleUtil";

interface ModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
}


export interface ModalRef {
    open : () => void;
    close : () => void;
}

function Modal({ id, className, children, ...props } : ModalProps, ref : Ref<ModalRef>) {
    const modalRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, ()=>({

            open() {
                modalRef.current?.showModal();
            },
            close() {
                modalRef.current?.close()
            }
        })

    )

    return (
        <dialog ref={modalRef} id={id} className={cn(className, "modal")} {...props}>
            <div className="modal-box">{children}</div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default forwardRef(Modal);
