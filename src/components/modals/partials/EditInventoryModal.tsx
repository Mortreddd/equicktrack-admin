import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import Modal, { ModalRef } from "@/components/common/Modal";
import Select from "@/components/common/Select";
import { Equipment, Remark } from "@/types/Equipment";
import { ADMIN_API } from "@/utils/Api";
import { parseRemark } from "@/utils/String";
import { cn } from "@/utils/StyleUtil";
import { AxiosError, AxiosResponse } from "axios";
import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorResponse } from "react-router-dom";

interface EditInventoryModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  equipment?: Equipment;
  onSuccess: (equipment: Equipment) => void;
}

interface EditInventoryFormProps {
  remark: Remark;
  available: boolean;
}

function EditInventoryModal(
  { className, equipment, onSuccess }: EditInventoryModalProps,
  ref: Ref<ModalRef>
) {
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<EditInventoryFormProps>({
    defaultValues: {
      remark: equipment?.remark,
      available: equipment?.available,
    },
  });
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

  const onSubmit: SubmitHandler<EditInventoryFormProps> = async (data) => {
    await ADMIN_API.patch(`/equipments/${equipment?.id}/update/status`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<Equipment>) => {
        onSuccess(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setError("root", {
          type: "manual",
          message: error.message ?? "Something went wrong",
        });
      });
  };
  return (
    <Modal ref={ref} className={cn(className)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
      >
        <h1 className="text-black text-2xl w-full text-center">
          Edit Equipment Status
        </h1>
        {errors.root && (
          <Alert variant={"danger"}>
            <DangerIcon />
            {errors.root.message}
          </Alert>
        )}

        <div className="w-full">
          <Select {...register("remark")} items={remarks} />
        </div>

        <div className="w-full flex items-center">
          <input
            type="checkbox"
            defaultChecked={equipment?.available}
            {...register("available")}
            className="checkbox checkbox-primary"
          />
          <label className="ml-2">Availability</label>
        </div>

        <Button
          loading={isSubmitting}
          type={"submit"}
          className="w-full"
          variant={"warning"}
          rounded={"default"}
        >
          Update Status
        </Button>
      </form>
    </Modal>
  );
}

export default forwardRef(EditInventoryModal);
