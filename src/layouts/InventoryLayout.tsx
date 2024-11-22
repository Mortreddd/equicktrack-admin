import { useGetEquipments } from "@/api/equipments/useGetEquipments";
import Input from "@/components/common/Input";
import InventoryTable from "@/components/common/tables/InventoryTable";
import LoadingSection from "@/components/LoadingSection";
import useDebounce from "@/hooks/useDebounce";
import { Equipment } from "@/types/Equipment";
import { PaginateParams } from "@/types/Paginate";
import { ChangeEvent, useEffect, useState } from "react";

export default function InventoryLayout() {
  const [filterState, setFilterState] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const { loading, data: result } = useGetEquipments(filterState);
  const [filteredEquipments, setFilteredEquipments] =
    useState<Array<Equipment> | null>(null);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search);

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

  function updateEquipment(updatedEquipment: Equipment) {
    setFilteredEquipments((prev) =>
      prev
        ? prev.map((eq) =>
            eq.id === updatedEquipment.id ? updatedEquipment : eq
          )
        : []
    );
  }
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
  }
  return (
    <div className="w-full h-full">
      <div className="py-4 bg-gray-100 rounded-xl w-full h-full">
        <div className="w-full px-4">
          <div className="w-full justify-between flex items-center py-3">
            <h1 className="text-sm md:text-2xl sm:text-md font-semibold">
              Inventory
            </h1>
          </div>
          <div className="w-full justify-between flex items-center">
            <Input placeholder="Search ..." onChange={handleSearch} />
            <div className={"flex gap-5 items-center"}>
              <select
                  defaultValue={filterState.pageNo}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setFilterState({
                        ...filterState,
                        pageSize: Number(e.target.value),
                      })
                  }
                  className="select select-bordered select-sm w-full max-w-xs"
              >
                {Array.from(Array(result?.totalPages).keys()).map(( pageNo, key) => (
                    <option key={key} value={pageNo}>{pageNo + 1}</option>
                ))}
              </select>

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
            <LoadingSection/>
        ) : (
            <InventoryTable
                onUpdate={updateEquipment}
                equipments={filteredEquipments || []}
            />
        )}
      </div>
    </div>
  );
}
