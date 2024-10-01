import Alert from "@/components/Alert";
import { Button } from "@/components/common/Button";
import DangerIcon from "@/components/common/icons/DangerIcon";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { Equipment, Remark } from "@/types/Equipment";
import { ADMIN_API } from "@/utils/Api";
import { cn } from "@/utils/StyleUtil";
import { AxiosResponse } from "axios";
import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateEquipmentModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  equipment: Equipment;
  ref: Ref<HTMLDialogElement>;

  onSuccess: (equipment: Equipment) => void;
}

export interface UpdateEquipmentModalRef {
  showModa: (equipment: Equipment) => void;
  closeModal: (equipment: Equipment) => void;
}

interface UpdateEquipentFormProps {
  name: string;
  description: string | null;
  serialNumber?: string | null;
  equipmentImage?: FileList | string;
  remark: Remark;
}

const UpdateEquipmentModal = forwardRef<
  HTMLDialogElement,
  UpdateEquipmentModalProps
>(({ equipment, className, onSuccess }, ref) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm<UpdateEquipentFormProps>({
    defaultValues: {
      name: equipment.name,
      description: equipment.description,
      serialNumber: equipment.serialNumber,
      equipmentImage: equipment.equipmentImage,
      remark: equipment.remark,
    },
  });

  const onSubmit: SubmitHandler<UpdateEquipentFormProps> = async (data) => {
    const equipmentData = new FormData();
    equipmentData.append("name", data.name);
    if (data.description != null) {
      equipmentData.append("description", data.description);
    }
    if (data.serialNumber != null) {
      equipmentData.append("serialNumber", data.serialNumber ?? "");
    }
    if (data.remark != null) {
      equipmentData.append("remark", data.remark);
    }
    if (dirtyFields.equipmentImage && data.equipmentImage) {
      equipmentData.append("equipmentImage", data.equipmentImage[0] as Blob);
    }

    try {
      const response = await ADMIN_API.patch<
        FormData,
        AxiosResponse<Equipment>
      >(`/equipments/${equipment.id}/update`, equipmentData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        onSuccess(response.data);
      }
    } catch (error: any) {
      setError("root", error);
    }

    // equipmentData.append("description", data.description)
  };
  return (
    <Modal ref={ref} className={cn(className)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
      >
        <h1 className="text-black text-2xl w-full text-center">
          Update Equipment
        </h1>
        {errors.root && (
          <Alert variant={"danger"}>
            <DangerIcon />
            {errors.root.message}
          </Alert>
        )}

        <div className="w-full">
          {errors.name && (
            <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
              {errors.name.message}
            </p>
          )}
          <Input
            type="text"
            {...register("name", {
              value: equipment.name,
              required: "Equipment name is required",
            })}
            autoCapitalize="on"
            autoComplete="off"
            placeholder="Equipment name"
            variantSize={"full"}
          />
        </div>

        <div className="w-full">
          <Input
            type="text"
            autoCapitalize="on"
            {...register("description", {
              value: equipment.description,
              required: false,
            })}
            autoComplete="off"
            placeholder="Equipment description"
            variantSize={"full"}
          />
        </div>

        <div className="w-full">
          <Input
            type="text"
            {...register("serialNumber", {
              value: equipment.serialNumber,
              required: false,
            })}
            autoComplete="off"
            placeholder="Serial Number (Optional)"
            variantSize={"full"}
          />
        </div>

        <div className="w-full">
          {errors.equipmentImage && (
            <p className="md:text-sm text-xs text-red-600 font-sans md:mb-2 mb-1">
              {errors.equipmentImage.message}
            </p>
          )}
          <input
            type="file"
            {...register("equipmentImage")}
            name="equipmentImage"
            className="file-input file-input-bordered w-full"
          />
        </div>

        <Button
          loading={isSubmitting}
          type={"submit"}
          className="w-full"
          variant={"warning"}
          rounded={"default"}
        >
          Update
        </Button>
      </form>
    </Modal>
  );
});

export default UpdateEquipmentModal;
