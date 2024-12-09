import { Transaction } from "@/types/Transactions";
import { formatDate, formatTime } from "@/utils/Dates";

interface ActivitiesTableProps {
  transactions: Transaction[];
}

export default function RecentActivityTable({
  transactions,
}: ActivitiesTableProps) {
  const recentActivities = transactions.filter((_, key) => key <= 10);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className={"text-center"}>Transaction No.</th>
            <th className={"text-center"}>Date</th>
            <th className={"text-center"}>Time</th>
            <th className={"text-center"}>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="h-20 text-center">
                No activity found yet
              </td>
            </tr>
          ) : (
            recentActivities.map((t, key) => (
              <tr key={key} className="hover even:bg-gray-100">
                <td>{t.id}</td>
                <td className="text-center">{formatDate(t.createdAt)}</td>
                <td className="text-center">{formatTime(t.createdAt)}</td>
                <td className="text-center">
                  Equipment <strong>`{t.equipment?.name ?? "N/A"}`</strong>{" "}
                  checked out by user <strong>`{t.user?.fullName}`</strong>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
