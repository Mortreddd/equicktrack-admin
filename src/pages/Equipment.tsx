import Drawer from "@/components/Drawer";
import EquipmentLayout from "@/layouts/EquipmentLayout";

export default function Equipment() {
  return (
    <Drawer>
      <div className="w-full md:px-10 md:py-5 px-5 py-2 h-full">
        <EquipmentLayout />
      </div>
    </Drawer>
  );
}
