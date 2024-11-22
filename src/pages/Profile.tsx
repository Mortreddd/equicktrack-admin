import Drawer from "@/components/Drawer";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Profile() {
  return (
    <Drawer>
      <div className="w-full md:px-10 md:py-5 px-5 py-2  h-full">
        <ProfileLayout />
      </div>
    </Drawer>
  );
}
