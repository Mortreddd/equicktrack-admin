import { useGetEquipments } from "@/api/equipments/useGetEquipments";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import EquipmentTable from "@/components/common/tables/EquipmentTable";
import LoadingSection from "@/components/LoadingSection";
import AddEquipmentModal from "@/components/modals/partials/AddEquipmentModal";
import { useAuth } from "@/contexts/AuthContext";
import { Equipment } from "@/types/Equipment";
import { isSuperAdmin } from "@/types/Role";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ModalRef } from "@/components/common/Modal.tsx";
import { PaginateParams } from "@/types/Paginate.ts";
import useDebounce from "@/hooks/useDebounce.ts";

export default function EquipmentLayout() {
  const [filterState, setFilterState] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const { loading, data: result } = useGetEquipments(filterState);
  const [filteredEquipments, setFilteredEquipments] =
    useState<Array<Equipment> | null>(null);
  const addEquipmentRef = useRef<ModalRef>(null);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (result?.content) {
      const filtered = debounceSearch
        ? result.content.filter((equipment) =>
            equipment.name.toLowerCase().includes(debounceSearch.toLowerCase())
          )
        : result.content;
      setFilteredEquipments(filtered);
    }
  }, [result, debounceSearch]);

  function handleAddEquipment() {
    addEquipmentRef.current?.open();
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function addEquipment(equipment: Equipment) {
    if (
      filteredEquipments &&
      !filteredEquipments.find((_e) => _e.id === equipment.id)
    ) {
      setFilteredEquipments([...filteredEquipments, equipment]);
      addEquipmentRef.current?.close();
    }
  }

  function deleteEquipment(equipment: Equipment) {
    setFilteredEquipments((prevEquipments) =>
      prevEquipments
        ? prevEquipments.filter((eq) => eq.id !== equipment.id)
        : []
    );
  }

  function updateEquipment(updatedEquipment: Equipment) {
    setFilteredEquipments((prev) =>
      prev
        ? prev.map((eq) =>
            eq.id === updatedEquipment.id ? updatedEquipment : eq
          )
        : []
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
            <div className={"flex gap-5 items-center"}>
              <select
                defaultValue={filterState.pageSize}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilterState({
                    ...filterState,
                    pageSize: Number(e.target.value),
                  })
                }
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option disabled selected>
                  Limit {filterState.pageSize}
                </option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
        {loading ? (
          <LoadingSection />
        ) : (
          <EquipmentTable
            equipments={filteredEquipments || []}
            onDelete={deleteEquipment}
            onUpdate={updateEquipment}
          />
        )}
      </div>
    </div>
  );
}
