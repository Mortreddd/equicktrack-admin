import { useGetDashboardData } from "@/api/dashboard/useGetDashboardData";
import LoadingCircle from "@/components/common/LoadingCircle";
import RecentActivityTable from "@/components/common/tables/RecentActivityTable";
import TotalCountCard from "@/components/TotalCountCard";
import { ChangeEvent, useState } from "react";
import Chart from "react-google-charts";

export default function DashboardLayout() {
  const { data, loading } = useGetDashboardData();
  const [dayLimit, setDayLimit] = useState<number>(7);
  const dates = Array.from(Array(dayLimit)).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString("en-US", {
      timeZone: "Asia/Manila",
    });
  });

  const transactionsByDay = data?.transactions.reduce((acc, curr) => {
    const date = new Date(curr.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      timeZone: "Asia/Manila",
    });

    if (!acc[formattedDate]) {
      acc[formattedDate] = 0;
    }

    acc[formattedDate] += 1;

    return acc;
  }, {} as Record<string, number>);

  // Ensure all dates have a count, even if zero
  const result = dates.reduce((acc, date) => {
    if (!transactionsByDay) {
      return acc;
    }
    acc[date] = transactionsByDay[date] || 0;
    return acc;
  }, {} as Record<string, number>);

  const transactions = [
    ["Date", "Transactions"],
    ...Object.entries(result).map(([date, count]) => [date, count]),
  ];

  const options = {
    chart: {
      title: "Overall Transactions",
      curveType: "function",
      legend: { position: "bottom" },
    },
    hAxis: {
      title: "Date",
    },
    vAxis: {
      title: "Transactions",
    },
  };

  return (
    <div className="w-full h-full">
      <div className={"w-full h-full"}>
        {loading ? (
          <div className="w-full h-[100dvh] flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : (
          /**
           * Total Equipments
           */
          <section className="w-full grid md:grid-cols-3 grid-cols-3 md:gap-5 gap-2">
            <TotalCountCard
              title={"Total Equipments"}
              className="bg-info"
              count={data?.equipments.length || 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                />
              </svg>
            </TotalCountCard>

            {/**
             * Total Transactions
             */}
            <TotalCountCard
              title={"Total Transactions"}
              className="bg-green-500"
              count={data?.transactions.length || 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </TotalCountCard>

            {/**
             * Total Users
             */}
            <TotalCountCard
              title={"Total Users"}
              className="bg-warning"
              count={data?.users.length || 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </TotalCountCard>
          </section>
        )}
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full md:mt-10 mt-3 bg-gray-100 rounded p-3 md:p-6">
          <select
            defaultValue={dayLimit}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setDayLimit(parseInt(e.target.value))
            }
            className="select select-bordered select-sm w-auto max-w-xs mb-3 md:mb-6"
          >
            <option value={7} selected>
              7 Days
            </option>
            <option value={14}>14 Days</option>
            <option value={21}>21 Days</option>
            <option value={30}>30 Days</option>
          </select>
          <Chart
            // Note the usage of Bar and not BarChart for the material version
            chartType="Line"
            data={transactions}
            options={options}
          />
        </div>

        <div className="w-full h-full md:mt-10 mt-3 bg-gray-100 rounded p-2">
          <h2 className="text-2xl font-semibold text-black text-center mb-2">
            Recent Activity
          </h2>
          <div className="w-full h-full">
            <RecentActivityTable transactions={data?.transactions || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
