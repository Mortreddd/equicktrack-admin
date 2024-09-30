import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useState,
} from "react";
import Modal from "../common/Modal";
import { cn } from "@/utils/StyleUtil";
import Input from "../common/Input";
import { Button } from "../common/Button";
import { ADMIN_API } from "@/utils/Api";
import { Equipment } from "@/types/Equipment";

interface AddEquipmentModalProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  ref: Ref<HTMLDialogElement>;
  onSuccess: (equipment: Equipment) => void;
}

interface AddEquipmentFormProps {
  name: string;
  description: string;
  serialNumber: string;
  equipmentImage: File | null;
}

const AddEquipmentModal = forwardRef<HTMLDialogElement, AddEquipmentModalProps>(
  ({ id, className, onSuccess, ...props }, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [formData, setFormData] = useState<AddEquipmentFormProps>({
      name: "",
      description: "",
      serialNumber: "",
      equipmentImage: null as File | null, // for handling the file input
    });

    function resetForm() {
      setFormData({
        name: "",
        description: "",
        serialNumber: "",

        equipmentImage: null,
      });
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, files, value } = e.target;
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      console.log(formData);
      const equipmentData = new FormData();
      equipmentData.append("name", formData.name);
      equipmentData.append("description", formData.description);
      if (formData.equipmentImage) {
        equipmentData.append("equipmentImage", formData.equipmentImage as Blob);
      }

      try {
        setLoading(true);
        const response = await ADMIN_API.post(
          "/equipments/create",
          equipmentData
        );
        setEquipment(response.data);
        resetForm();
        onSuccess(response.data);
      } catch (error) {
        console.log(error);
        setEquipment(null);
      } finally {
        setLoading(false);
      }
    }
    return (
      <Modal ref={ref} className={cn(className)} id={id} {...props}>
        <form
          onSubmit={handleSubmit}
          className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
        >
          <h1 className="text-black text-2xl w-full text-center">
            Add Equipment
          </h1>
          <div className="w-full">
            <Input
              type="text"
              name="name"
              autoCapitalize="on"
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Equipment name"
              variantSize={"full"}
            />
          </div>

          <div className="w-full">
            <Input
              type="text"
              name="description"
              autoCapitalize="on"
              onChange={handleInputChange}
              autoComplete="off"
              value={formData.description}
              placeholder="Equipment description"
              variantSize={"full"}
            />
          </div>

          <div className="w-full">
            <Input
              type="text"
              name="serialNumber"
              onChange={handleInputChange}
              autoComplete="off"
              value={formData.serialNumber}
              placeholder="Serial Number (Optional)"
              variantSize={"full"}
            />
          </div>

          <div className="w-full">
            <input
              type="file"
              onChange={handleInputChange}
              name="equipmentImage"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <Button
            loading={loading}
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
