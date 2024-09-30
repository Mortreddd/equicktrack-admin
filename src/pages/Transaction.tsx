import Drawer from "../components/Drawer";
import TransactionLayout from "../layouts/TransactionLayout";

export default function Transaction() {
  return (
    <Drawer>
      <div className="w-full md:px-10 md:py-5 px-5 py-2  h-full">
        <TransactionLayout />
      </div>
    </Drawer>
  );
}
