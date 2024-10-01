import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from "react";
import Modal from "../../common/Modal";
import { cn } from "@/utils/StyleUtil";
import Input from "../../common/Input";
import { Button } from "../../common/Button";
import { ADMIN_API } from "@/utils/Api";
import { Equipment } from "@/types/Equipment";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosResponse } from "axios";
import Alert from "../../Alert";
import DangerIcon from "../../common/icons/DangerIcon";

interface AddEquipmentModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  ref: Ref<HTMLDialogElement>;
  onSuccess: (equipment: Equipment) => void;
}

interface AddEquipmentFormProps {
  name: string;
  description: string;
  serialNumber?: string;
  equipmentImage: FileList | null;
}

const AddEquipmentModal = forwardRef<HTMLDialogElement, AddEquipmentModalProps>(
  ({ id, className, onSuccess, ...props }, ref) => {
    const {
      register,
      handleSubmit,
      reset,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<AddEquipmentFormProps>();

    const onSubmit: SubmitHandler<AddEquipmentFormProps> = async (data) => {
      console.log(data);

      const equipmentData = new FormData();
      equipmentData.append("name", data.name);
      equipmentData.append("description", data.description);
      equipmentData.append("serialNumber", data.serialNumber ?? "");

      if (data.equipmentImage && data.equipmentImage[0]) {
        equipmentData.append("equipmentImage", data.equipmentImage[0] as Blob);
      }

      try {
        const response = await ADMIN_API.post<
          FormData,
          AxiosResponse<Equipment>
        >("/equipments/create", equipmentData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          onSuccess(response.data);
          reset();
        } else if (response.status === 403) {
          throw new Error("Unable to creae equipment");
        }
      } catch (error: any) {
        console.log(error);
        setError("root", error);
      }
    };

    return (
      <Modal ref={ref} className={cn(className)} id={id} {...props}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
        >
          <h1 className="text-black text-2xl w-full text-center">
            Add Equipment
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
              {...register("name", { required: "Equipment name is required" })}
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
              {...register("equipmentImage", {
                required: "Equipment image is required",
              })}
              name="equipmentImage"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <Button
            loading={isSubmitting}
            type={"submit"}
            className="w-full"
            variant={"success"}
            rounded={"default"}
          >
            Create
          </Button>
        </form>
      </Modal>
    );
  }
);

export default AddEquipmentModal;
