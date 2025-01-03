import { User } from "@/types/User";
import { parseEnum } from "@/utils/String";
import { Button } from "../Button";
import { formatDate } from "@/utils/Dates";
import { isAdmin, isSuperAdmin } from "@/types/Role";
import AlertModal, { AlertModalRef } from "../AlertModal";
import { useRef, useState } from "react";
import { ADMIN_API } from "@/utils/Api";
import { AxiosResponse } from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertContext";
import { ErrorResponse } from "@/types/Models.ts";
import Badge from "@/components/Badge";
import EditUserModal from "@/components/modals/EditUserModal";
import { ModalRef } from "../Modal";

interface UserTableProps {
  users: User[];
  onDelete: (user: User) => void;
  onUpdate: (user: User) => void;
}
export default function UserTable({
  users,
  onDelete,
  onUpdate,
}: UserTableProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);
  const updateUserModalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();

  const deleteModalRef = useRef<AlertModalRef>(null);
  const { currentUser } = useAuth();
  const { showAlert } = useAlert();

  if (!isAdmin(currentUser?.roles)) {
    navigate("/profile", { replace: true });
  }

  function handleClickDelete(user: User) {
    setSelectedUser(user);
    deleteModalRef.current?.open();
  }

  async function handleDeleteUser(user: User) {
    setLoading(true);
    await ADMIN_API.delete(`/users/${user.id}/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<User>) => {
        onDelete(response.data);
        deleteModalRef.current?.close();
        showAlert("Successfully deleted", "success");
      })
      .catch((error: AxiosResponse<ErrorResponse>) => {
        showAlert(error.data.message ?? "Something went wrong", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateUser(user: User) {
    // onUpdate(user);
    setSelectedUser(user);
    updateUserModalRef.current?.open();
  }

  function onUpdateUser(user: User) {
    onUpdate(user);
    updateUserModalRef.current?.close();
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID Number</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Verified Emaill</th>
            <th>Role</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="h-20 text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, key) => (
              <tr key={key} className="hover even:bg-gray-100">
                <th>{user.id}</th>
                <th>{user.idNumber ?? "Didn't provide ID number"}</th>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td className={"flex-1 truncate"}>
                  {user.emailVerifiedAt ? (
                    <Badge variant={"sm"} color={"success"}>
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant={"sm"} color={"danger"}>
                      Not Verified
                    </Badge>
                  )}
                </td>
                <td>
                  {user.roles?.map((role) => parseEnum(role.name)).join(", ")}
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td className="flex-1">
                  <div className="w-full flex gap-2">
                    {!isSuperAdmin(user.roles) && (
                      <Button
                        variant={"warning"}
                        rounded={"default"}
                        onClick={() => handleUpdateUser(user)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </Button>
                    )}
                    {!isAdmin(user.roles) && (
                      <Button
                        variant={"danger"}
                        rounded={"default"}
                        onClick={() => handleClickDelete(user)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <AlertModal
        type={"danger"}
        ref={deleteModalRef}
        loading={loading}
        onConfirm={() => handleDeleteUser(selectedUser)}
      >
        <div className="w-full py-3 flex justify-center flex-col">
          <div className="flex w-full gap-2 items-center-center flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <h1 className="text-xl text-black font-semibold mx-auto">
              Notice!
            </h1>
          </div>
          <div className="w-full h-fit mt-2 text-center">
            Are you sure to delete {selectedUser?.fullName}?
          </div>
        </div>
      </AlertModal>
      {selectedUser && (
        <EditUserModal
          onUpdate={onUpdateUser}
          user={selectedUser}
          ref={updateUserModalRef}
        />
      )}
    </div>
  );
}
