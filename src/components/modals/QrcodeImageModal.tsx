import { forwardRef, HTMLAttributes, Ref } from "react";
import Modal, {ModalRef} from "../common/Modal";
import { Button } from "../common/Button";
import { Equipment } from "@/types/Equipment";
import { downloadFile } from "@/utils/Files";

interface QrcodeImageModalProps extends HTMLAttributes<HTMLDialogElement> {
  equipment: Equipment | null;
}

function QrcodeImageModal({equipment} : QrcodeImageModalProps, ref : Ref<ModalRef>) {
    async function handleDownload() {
      if (equipment?.qrcodeImage) {
        const fileName = `${equipment.name}-qrcode.png`;
        await downloadFile(equipment.qrcodeImage, fileName);
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


export default forwardRef(QrcodeImageModal);
