import { forwardRef, HTMLAttributes, Ref } from "react";
import Modal, { ModalRef } from "../common/Modal";
import { Button } from "../common/Button";
import { Equipment } from "@/types/Equipment";
// import { downloadFile } from "@/utils/Files";

interface QrcodeImageModalProps extends HTMLAttributes<HTMLDialogElement> {
  equipment: Equipment | null;
}

function QrcodeImageModal(
  { equipment }: QrcodeImageModalProps,
  ref: Ref<ModalRef>
) {
  // async function handleDownload() {
  //   if (equipment?.qrcodeImage) {
  //     const fileName = `${equipment.name}-qrcode.png`;
  //     await downloadFile(equipment.qrcodeImage, fileName);
  //   }
  // }

  async function handleDownload() {
    const qrcodeImageUrl = equipment?.qrcodeImage;
    if (qrcodeImageUrl) {
      const fileName = `${equipment?.name}-qrcode.png`;
      try {
        const response = await fetch(qrcodeImageUrl);
        const blob = await response.blob();
        const createdObject = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = createdObject;
        link.download = `${fileName}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(createdObject);
      } catch (error) {
        console.log("Something went wrong. Please try again later.", "error");
      }
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
