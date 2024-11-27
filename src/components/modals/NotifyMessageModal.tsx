import { Transaction } from "@/types/Transactions";
import { FormEvent, forwardRef, Ref, useState } from "react";
import Modal, { ModalRef } from "../common/Modal";
import { Button } from "../common/Button";
import { useAlert } from "@/contexts/AlertContext";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse, AxiosError } from "axios";
import { ErrorResponse, Response } from "@/types/Models";
interface NotifyMessageModalProps {
  transaction: Transaction | null;
  onNotifying: (isLoading: boolean) => void;
}

function NotifyMessageModal(
  { transaction, onNotifying }: NotifyMessageModalProps,
  ref: Ref<ModalRef>
) {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showAlert } = useAlert();

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setMessage(value);
  }

  async function notifyUser(e: FormEvent) {
    e.preventDefault();
    onNotifying(true);
    setIsLoading(true);
    await ADMIN_API.post(
      `/dashboard/transactions/${transaction?.id}/notify`,
      {
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response: AxiosResponse<Response>) => {
        onNotifying(false);
        setIsLoading(false);
        showAlert(
          response.data.message ?? "User notified successfully",
          "success"
        );
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        onNotifying(false);
        setIsLoading(false);
        showAlert(
          error.response?.data.message ?? "Something went wrong",
          "error"
        );
      });
  }

  return (
    <Modal ref={ref}>
      <form
        onSubmit={notifyUser}
        className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
      >
        <div className="w-full flex justify-center">
          <h1 className="md:text-2xl text-xl font-sans text-gray-700">
            Notify {transaction?.user?.fullName}
          </h1>
        </div>
        <div className="w-full my-5">
          <textarea
            onChange={onChange}
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            placeholder="Enter your message here..."
          >
            {message}
          </textarea>
        </div>
        <div className="w-full">
          <Button
            type={"submit"}
            variant={"success"}
            rounded={"default"}
            loading={isLoading}
            className="w-full"
          >
            Send
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default forwardRef(NotifyMessageModal);
