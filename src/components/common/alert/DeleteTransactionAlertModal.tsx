import {forwardRef, Ref} from "react";
import {Transaction} from "@/types/Transactions.ts";
import AlertModal, {AlertModalProps, AlertModalRef} from "@/components/common/AlertModal.tsx";

interface DeleteTransactionAlertModalProps extends AlertModalProps {
    transaction: Transaction;
}

function DeleteTransactionAlertModal({ type, className, loading, onConfirm, transaction} : DeleteTransactionAlertModalProps, ref : Ref<AlertModalRef>) {

    return (
        <AlertModal
            type={type}
            ref={ref}
            loading={loading}
            onConfirm={() => onConfirm()}
        >
            <div className={`w-full py-3 ${className} flex justify-center flex-col`}>
                <div className="flex w-full gap-2 items-center-center flex-col">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-14 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                    <h1 className="text-xl text-black font-semibold mx-auto">
                        Notice!
                    </h1>
                </div>
                <div className="w-full h-fit mt-2 text-center">
                    Are you sure to delete transaction id {transaction.id}?
                </div>
            </div>
        </AlertModal>
    )
}


export default forwardRef(DeleteTransactionAlertModal)