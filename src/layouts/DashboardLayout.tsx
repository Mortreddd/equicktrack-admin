import { useGetEquipments } from "@/api/equipments/useGetEquipments";
import LoadingCircle from "@/components/common/LoadingCircle";
import { Equipment } from "@/types/Equipment";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const { result, isLoading } = useGetEquipments({ pageNo: 0, pageSize: 10 });

  const [equipments, setEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    if (result?.content) {
      setEquipments(result.content);
    }
  }, [result]);

  const totalEquipments = equipments.reduce((prev, _) => prev + 1, 0);
  return (
    <div className={"w-full h-full"}>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingCircle />
        </div>
      ) : (
        <section className="w-full grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-2">
          <article className="flex items-center md:gap-5 gap-2 bg-gray-100 md:p-3 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>

            <div className="w-auto">
              <h3 className="md:text-lg text-md font-medium text-black">
                Total Equipments
              </h3>
              <p className="text-gray-700 font-sans md:text-lg text-md">
                {totalEquipments}
              </p>
            </div>
          </article>
        </section>
      )}
    </div>
  );
}
