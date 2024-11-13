
import Modal, {ModalRef} from "@/components/common/Modal";
import { Equipment, Remark } from "@/types/Equipment";
import { ADMIN_API } from "@/utils/Api";
import { cn } from "@/utils/StyleUtil";
import {AxiosError, AxiosResponse} from "axios";
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useImperativeHandle,
  useRef,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {useGetEquipmentById} from "@/api/equipments/useGetEquipmentById.ts";
import {Button} from "@/components/common/Button.tsx";
import LoadingSection from "@/components/LoadingSection.tsx";
import Alert from "@/components/Alert.tsx";
import DangerIcon from "@/components/common/icons/DangerIcon.tsx";
import {useAlert} from "@/contexts/AlertContext.tsx";
import {ErrorResponse} from "@/types/Models.ts";
import Input from "@/components/common/Input.tsx";

interface UpdateEquipmentModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  equipmentId: number;
  onSuccess: (equipment: Equipment) => void;
}


interface UpdateEquipmentFormProps {
  name: string | null;
  description: string | null;
  equipmentImage?: FileList | null | string;
  remark: Remark;
}

function UpdateEquipmentModal({ className, equipmentId, onSuccess } : UpdateEquipmentModalProps, ref : Ref<ModalRef>) {

  const { loading, error, data : equipment} = useGetEquipmentById(equipmentId)
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm<UpdateEquipmentFormProps>({
    defaultValues: {
      name: equipment?.name,
      description: equipment?.description,
      equipmentImage: equipment?.equipmentImage,
      remark: equipment?.remark,
    },
  });

  const modalRef = useRef<ModalRef>(null);
  const { showAlert } = useAlert();

  const onSubmit: SubmitHandler<UpdateEquipmentFormProps> = async (data) => {
    const equipmentData = new FormData();
    if(data.name !== null) {
      equipmentData.append("name", data.name);
    }
    if (data.description !== null) {
      equipmentData.append("description", data.description);
    }
    if (dirtyFields.equipmentImage && data.equipmentImage
    ) {
      equipmentData.append("equipmentImage", data.equipmentImage[0] as Blob);
    }

    await ADMIN_API.patch(`/equipments/${equipment?.id}/update`, equipmentData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response : AxiosResponse<Equipment>) => {
        onSuccess(response.data);
        modalRef.current?.close();
        showAlert(`Successfully updated ${response.data.name}`, "success")
    }).catch((error : AxiosError<ErrorResponse>) => {
      showAlert(error.message, "error")
      setError("root", {
        type: "manual",
        message:
            error.response?.data?.message ||
            "An error occurred while updating the equipment",
      });
    });
  };

  useImperativeHandle(ref, () => ({
    open() {
      modalRef.current?.open();
    },
    close() {
      modalRef.current?.close();
    },
  }));
  return (
    <Modal ref={modalRef} className={cn(className)}>
      {loading && <LoadingSection />}
      {error !== null && (
          <div className="w-full h-fullflex flex-col items-center gap-10">
            <Alert variant={'danger'}>
              <DangerIcon iconSize={"size-8"} />
              Unable to get the equipment
            </Alert>
          </div>
      )}
      {equipment !== null && (


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
      )}
    </Modal>
  );
};

export default forwardRef(UpdateEquipmentModal);
