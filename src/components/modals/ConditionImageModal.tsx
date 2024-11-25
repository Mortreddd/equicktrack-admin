import { Transaction } from "@/types/Transactions";
import { forwardRef, HTMLAttributes, Ref } from "react";
import Modal, { ModalRef } from "../common/Modal";
import { Button } from "../common/Button";
import { downloadFile } from "@/utils/Files";

interface ConditionImageModalProps extends HTMLAttributes<HTMLDialogElement> {
  transaction: Transaction | null;
}
function ConditionImageModal(
  { transaction }: ConditionImageModalProps,
  ref: Ref<ModalRef>
) {
  async function handleDownload() {
    if (transaction?.conditionImage) {
      const fileName = `${transaction.equipment?.name}-condition.png`;
      await downloadFile(transaction?.conditionImage, fileName);
    }
  }

  return (
    <Modal ref={ref}>
      <div className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5">
        <div className="w-full flex justify-center">
          <img
            src={transaction?.conditionImage || undefined}
            alt="Condition Image"
            className="md:size-52 size-32 aspect-square object-contain, object-center"
          />
        </div>
        <div className="w-full">
          <Button
            onClick={handleDownload}
            variant={"success"}
            rounded={"default"}
            className="w-full"
          >
            Download
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(ConditionImageModal);
