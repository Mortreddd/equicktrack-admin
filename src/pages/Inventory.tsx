import InventoryLayout from "@/layouts/InventoryLayout";
import Drawer from "@/components/Drawer";

export default function Inventory() {
  return (
    <Drawer>
      <div className="w-full md:px-10 md:py-5 px-5 py-2 h-full">
        <InventoryLayout />
      </div>
    </Drawer>
  );
}
