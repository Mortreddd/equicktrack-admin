import Drawer from "@/components/Drawer";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <Drawer>
      <div className="w-full md:px-10 md:py-5 px-5 py-2 h-full">
        <DashboardLayout />
      </div>
    </Drawer>
  );
}
