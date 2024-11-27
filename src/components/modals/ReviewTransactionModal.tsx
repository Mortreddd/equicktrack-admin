import { Transaction } from "@/types/Transactions";
import { forwardRef, Ref, useState } from "react";
import Modal, { ModalRef } from "../common/Modal";
import { Button } from "../common/Button";
import { useAlert } from "@/contexts/AlertContext";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse, AxiosError } from "axios";
import { ErrorResponse, Response } from "@/types/Models";
import { Remark } from "@/types/Equipment";
import { SubmitHandler, useForm } from "react-hook-form";
import { RequestState } from "@/api/common";
import Select from "../common/Select";
import { parseRemark } from "@/utils/String";
import Alert from "../Alert";
import DangerIcon from "../common/icons/DangerIcon";
interface ReviewTransactionModalProps {
  transaction: Transaction | null;
}

interface ReviewTransactionForm {
  available: boolean;
  remark: Remark;
  message?: string;
}

function ReviewTransactionModal(
  { transaction }: ReviewTransactionModalProps,
  ref: Ref<ModalRef>
) {
  const { showAlert } = useAlert();
  const [state, setState] = useState<RequestState<Response>>({
    data: null,
    error: null,
    loading: false,
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ReviewTransactionForm>();

  const onSubmit: SubmitHandler<ReviewTransactionForm> = async (data) => {
    console.log(data.remark);
    setState({ loading: true, data: null, error: null });
    await ADMIN_API.put(
      `/dashboard/transactions/${transaction?.id}/approved`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response: AxiosResponse<Response>) => {
        setState({ loading: false, data: response.data, error: null });
        showAlert(
          response.data.message ?? "User notified successfully",
          "success"
        );
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setState({
          loading: false,
          data: null,
          error: error.response?.data.message,
        });
        showAlert(
          error.response?.data.message ?? "Something went wrong",
          "error"
        );
      });
  };

  const remarks = [
    { value: Remark.GOOD_CONDITION, label: parseRemark(Remark.GOOD_CONDITION) },
    {
      value: Remark.SLIGHTLY_DAMAGED,
      label: parseRemark(Remark.SLIGHTLY_DAMAGED),
    },
    {
      value: Remark.SEVERELY_DAMAGED,
      label: parseRemark(Remark.SEVERELY_DAMAGED),
    },
    {
      value: Remark.MODERATELY_DAMAGED,
      label: parseRemark(Remark.MODERATELY_DAMAGED),
    },
  ];

  return (
    <Modal ref={ref}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
      >
        <div className="w-full flex justify-center">
          <h1 className="md:text-2xl text-xl font-sans text-gray-700">
            Review Return Equipment
          </h1>
        </div>
        {errors.root && (
          <div className="w-full flex justify-center">
            <Alert variant={"danger"}>
              <DangerIcon />
              {errors.root?.message}
            </Alert>
          </div>
        )}

        <div className="w-full flex my-5 justify-center">
          <img
            src={transaction?.conditionImage || undefined}
            alt="Condition Image"
            className="md:size-52 size-32 aspect-square object-contain, object-center"
          />
        </div>
        <div className="w-full">
          {errors.remark && (
            <div className="text-red-500 text-sm">{errors.remark.message}</div>
          )}

          <Select {...register("remark")} items={remarks} />
        </div>
        <div className="w-full flex items-center">
          <input
            type="checkbox"
            defaultChecked={transaction?.equipment?.available}
            {...register("available")}
            className="checkbox checkbox-primary"
          />
          <label className="ml-2">Does equipment still available?</label>
        </div>
        <div className="w-full mt-5 mb-2">
          <h2 className="text-lg text-gray-700 font-sans">
            Leave a message to the borrower?
          </h2>
        </div>
        <div className="w-full">
          <textarea
            {...register("message")}
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            placeholder="Enter your message here..."
          >
            {watch("message")}
          </textarea>
        </div>
        <div className="w-full">
          <Button
            type={"submit"}
            variant={"success"}
            rounded={"default"}
            loading={state.loading || isSubmitting}
            className="w-full"
          >
            Send
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default forwardRef(ReviewTransactionModal);
