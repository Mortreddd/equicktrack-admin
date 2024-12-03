import { Button } from "../common/Button";
import Select from "../common/Select";
import Modal, { ModalRef } from "../common/Modal";
import { forwardRef, Ref, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { isSuperAdmin, RoleEnum } from "@/types/Role";
import { User } from "@/types/User";
import { ADMIN_API } from "@/utils/Api";
import { RequestState } from "@/api/common";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Models";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "@/contexts/AlertContext";

interface EditUserFormProps {
  role: RoleEnum;
}

interface EditUserModalProps {
  user: User;
  onUpdate: (User: User) => void;
}

function EditUserModal(
  { user, onUpdate }: EditUserModalProps,
  ref: Ref<ModalRef>
) {
  const [formState, setFormState] = useState<RequestState<User>>({
    loading: false,
    error: null,
    data: null,
  });
  const { showAlert } = useAlert();
  const { currentUser } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<EditUserFormProps>({
    defaultValues: {
      role: user.roles?.at(0)?.name || RoleEnum.STUDENT,
    },
  });
  const roles = isSuperAdmin(currentUser?.roles)
    ? [
        { value: RoleEnum.STUDENT, label: "Student" },
        { value: RoleEnum.PROFESSOR, label: "Teacher" },
        { value: RoleEnum.ADMIN, label: "Admin" },
        { value: RoleEnum.SUPER_ADMIN, label: "Super Admin" },
      ]
    : [
        { value: RoleEnum.STUDENT, label: "Student" },
        { value: RoleEnum.PROFESSOR, label: "Teacher" },
        { value: RoleEnum.ADMIN, label: "Admin" },
      ];

  const onSubmit: SubmitHandler<EditUserFormProps> = async (data) => {
    // alert(JSON.stringify(data));
    setFormState({ data: null, error: null, loading: true });
    await ADMIN_API.put(`/dashboard/users/${user.id}/edit`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<User>) => {
        setFormState({ data: response.data, error: null, loading: false });
        showAlert("Role updated successfully", "success");
        onUpdate(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setFormState({
          data: null,
          error: error.response?.data.message,
          loading: false,
        });
        showAlert(
          error.response?.data.message ?? "Unable to update the role",
          "error"
        );
      });
  };

  return (
    <Modal ref={ref}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full font-sans h-fit bg-white flex flex-col items-center gap-5"
      >
        <h1 className="text-black text-2xl w-full text-center">
          Edit Role of {user.fullName}
        </h1>

        <div className="w-full h-fit mt-2 text-center">
          The current role of {user.fullName} is{" "}
          {user.roles?.at(0)?.name.toLowerCase() || null}
        </div>
        <div className="w-full">
          <Select {...register("role")} items={roles} />
        </div>

        <Button
          loading={isSubmitting || formState.loading}
          type={"submit"}
          className="w-full"
          variant={"warning"}
          rounded={"default"}
        >
          Update Role
        </Button>
      </form>
    </Modal>
  );
}

export default forwardRef(EditUserModal);
