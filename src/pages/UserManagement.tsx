import UserManagementLayout from "@/layouts/UserManagementLayout";
import Drawer from "../components/Drawer";

export default function UserManagement() {
  return (
    <Drawer>
      <div className="w-full md:px-10 md:py-5 px-5 py-2  h-full">
        <UserManagementLayout />
      </div>
    </Drawer>
  );
}
