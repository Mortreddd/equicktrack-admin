import { useGetEquipments } from "@/api/equipments/useGetEquipments";
import InventoryTable from "@/components/common/tables/InventoryTable";
import LoadingSection from "@/components/LoadingSection";
import { Equipment } from "@/types/Equipment";
import { useEffect, useState } from "react";

export default function InventoryLayout() {
  const { isLoading, result } = useGetEquipments({ pageNo: 0, pageSize: 10 });
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);

  const equipments = result?.content ?? [];
  useEffect(() => {
    if (result?.content) {
      setFilteredEquipments(equipments);
    }
  }, [result]);

  function updateEquipment(updatedEquipment: Equipment) {
    setFilteredEquipments((prev) =>
      prev.map((eq) => (eq.id === updatedEquipment.id ? updatedEquipment : eq))
    );
  }

  return (
    <div className="w-full h-full">
      <div className="py-4 bg-gray-100 rounded-xl w-full h-full">
        {isLoading ? (
          <LoadingSection />
        ) : (
          <InventoryTable
            onUpdate={updateEquipment}
            equipments={filteredEquipments}
          />
        )}
      </div>
    </div>
  );
}
