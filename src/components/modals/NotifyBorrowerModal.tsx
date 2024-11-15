import { forwardRef, Ref } from "react";
import Modal, { ModalRef } from "../common/Modal";
import { useGetTransactionById } from "@/api/transactions/useGetTransactionById";

interface NotifyBorrowerModalProps {
  transactionId: number;
}

function NotifyBorrowerModal(
  { transactionId }: NotifyBorrowerModalProps,
  ref: Ref<ModalRef>
) {
  const {
    loading,
    error,
    data: transaction,
  } = useGetTransactionById(transactionId);

  return <Modal ref={ref}></Modal>;
}

export default forwardRef(NotifyBorrowerModal);
