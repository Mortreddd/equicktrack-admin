import { useGetUsers } from "@/api/users/useGetUsers";
import UserTable from "@/components/common/tables/UserTable";
import LoadingSection from "@/components/LoadingSection";
import { User } from "@/types/User";
import { useEffect, useState } from "react";

export default function UserManagementLayout() {
  const { isLoading, result } = useGetUsers({ pageNo: 0, pageSize: 10 });
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    if (result?.content) {
      setUsers(result.content);
    }
  }, [result]);
  /**
   * When the equipment is deleted, the equipments table will be updated causing it to rerender
   * @param equipment
   */
  function deleteUser(user: User) {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  }

  /**
   * When the equipment is updated, the equipments table will be updated causing it to rerender
   * @param equipment
   */
  function updateUser(updatedUser: User) {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  }

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <LoadingSection />
      ) : (
        <UserTable onDelete={deleteUser} onUpdate={updateUser} users={users} />
      )}
    </div>
  );
}
