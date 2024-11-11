import { useGetEquipments } from "@/api/equipments/useGetEquipments";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import EquipmentTable from "@/components/common/tables/EquipmentTable";
import LoadingSection from "@/components/LoadingSection";
import AddEquipmentModal from "@/components/modals/partials/AddEquipmentModal";
import { useAuth } from "@/contexts/AuthContext";
import { Equipment } from "@/types/Equipment";
import { isSuperAdmin } from "@/types/Role";
import { useEffect, useRef, useState } from "react";

export default function EquipmentLayout() {
  const { isLoading, result } = useGetEquipments({ pageNo: 0, pageSize: 10 });
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const addEquipmentRef = useRef<HTMLDialogElement>(null);
  const { currentUser } = useAuth();
  const equipments = result?.content ?? [];
  useEffect(() => {
    if (result?.content) {
      setFilteredEquipments(equipments);
    }
  }, [result]);

  function handleAddEquipment() {
    addEquipmentRef.current?.showModal();
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value.toLowerCase();
    const filtered = equipments.filter((equipment) =>
      equipment.name.toLowerCase().includes(query)
    );
    setFilteredEquipments(filtered ?? []);
  }

  /**
   * When the equipment is created, the equipments table will be updated causing it to rerender
   * @param equipment
   */
  function addEquipment(equipment: Equipment) {
    if (!filteredEquipments.find((_e) => _e.id === equipment.id)) {
      setFilteredEquipments([...filteredEquipments, equipment]);
      addEquipmentRef.current?.close();
    }
  }

  /**
   * When the equipment is deleted, the equipments table will be updated causing it to rerender
   * @param equipment
   */
  function deleteEquipment(equipment: Equipment) {
    setFilteredEquipments((prevEquipments) =>
      prevEquipments.filter((eq) => eq.id !== equipment.id)
    );
  }

  /**
   * When the equipment is updated, the equipments table will be updated causing it to rerender
   * @param equipment
   */
  function updateEquipment(updatedEquipment: Equipment) {
    setFilteredEquipments((prev) =>
      prev.map((eq) => (eq.id === updatedEquipment.id ? updatedEquipment : eq))
    );
  }

  return (
    <div className="w-full h-full">
      <div className="py-4 bg-gray-100 rounded-xl w-full h-full">
        <div className="w-full px-4">
          <div className="w-full justify-between flex items-center py-3">
            <h1 className="text-sm md:text-2xl sm:text-md font-semibold">
              List of Equipments
            </h1>
            {isSuperAdmin(currentUser?.roles) && (
              <Button
                variant={"success"}
                rounded={"default"}
                onClick={handleAddEquipment}
              >
                Add equipment
              </Button>
            )}
            <AddEquipmentModal ref={addEquipmentRef} onSuccess={addEquipment} />
          </div>
          <div className="w-full justify-between flex items-center">
            <Input placeholder="Search ..." onChange={handleSearch} />
            <Button>Filters</Button>
          </div>
        </div>
        {isLoading ? (
          <LoadingSection />
        ) : (
          <EquipmentTable
            equipments={filteredEquipments}
            onDelete={deleteEquipment}
            onUpdate={updateEquipment}
          />
        )}
      </div>
    </div>
  );
}
