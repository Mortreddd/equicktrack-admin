import { forwardRef, HTMLAttributes, Ref } from "react";
import Modal from "../common/Modal";
import { Button } from "../common/Button";
import { Equipment } from "@/types/Equipment";
import { downloadFile } from "@/utils/Files";

interface QrcodeImageModalProps extends HTMLAttributes<HTMLDialogElement> {
  ref: Ref<HTMLDialogElement>;
  equipment: Equipment | null;
}

const QrcodeImageModal = forwardRef<HTMLDialogElement, QrcodeImageModalProps>(
  ({ equipment }, ref) => {
    async function handleDownload() {
      if (equipment?.qrcodeImage) {
        const fileName = `${equipment.name}-qrcode.png`;
        downloadFile(equipment.qrcodeImage, fileName);
      }
    }

    return (
      <Modal ref={ref}>
        <div className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5">
          <div className="w-full flex justify-center">
            <img
              src={equipment?.qrcodeImage}
              alt="QR Code"
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
              Download Qrcode
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default QrcodeImageModal;
