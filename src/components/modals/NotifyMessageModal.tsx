import { Transaction } from "@/types/Transactions";
import { forwardRef, Ref } from "react";
import Modal, { ModalRef } from "../common/Modal";
import { Button } from "../common/Button";

interface NotifyMessageModalProps {
  transaction: Transaction | null;
  onConfirm: () => void;
}

function NotifyMessageModal(
  { transaction, onConfirm }: NotifyMessageModalProps,
  ref: Ref<ModalRef>
) {
  return (
    <Modal ref={ref}>
      <div className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5">
        <div className="w-full flex justify-center">
          <h1 className="md:text-2xl text-xl font-sans text-gray-700">
            Notify {transaction?.user?.fullName}
          </h1>
        </div>
        <div className="w-full my-5">
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            placeholder="Enter your message here..."
          ></textarea>
        </div>
        <div className="w-full">
          <Button
            onClick={onConfirm}
            variant={"success"}
            rounded={"default"}
            className="w-full"
          >
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(NotifyMessageModal);
