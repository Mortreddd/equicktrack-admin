import InventoryLayout from "@/layouts/InventoryLayout";
import Drawer from "@/components/Drawer";
import { useAlert } from "@/contexts/AlertContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const navigate = useNavigate();
  const { currentUser, authToken } = useAuth();
  const { showAlert } = useAlert();
  if (currentUser === null || authToken === null) {
    navigate("/", { replace: true });
    showAlert("Session expired", "error");
    return;
  }

  return (
    <Drawer>
      <div className="w-full md:px-10 md:py-5 px-5 py-2 h-full">
        <InventoryLayout />
      </div>
    </Drawer>
  );
}
