import { Equipment } from "@/types/Equipment";
import { Button } from "../Button";
import { useRef, useState } from "react";
import { parseRemark } from "@/utils/String";
import Badge from "@/components/Badge";
import EditInventoryModal from "@/components/modals/partials/EditInventoryModal";
import { ModalRef } from "../Modal";

interface InventoryTableProps {
  equipments: Equipment[];
  onUpdate: (equipment: Equipment) => void;
}

export default function InventoryTable({
  equipments,
  onUpdate,
}: InventoryTableProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(
    equipments[0]
  );

  const editInventoryModalRef = useRef<ModalRef>(null);

  function handleClickUpdate(equipment: Equipment) {
    setSelectedEquipment(equipment);
    editInventoryModalRef.current?.open();
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Equipment No.</th>
            <th>Equipment Image</th>
            <th>Equipment Name</th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipments.length === 0 ? (
            <tr>
              <td colSpan={7} className="h-20 text-center">
                No equipments found
              </td>
            </tr>
          ) : (
            equipments.map((equipment, key) => (
              <tr key={key} className="hover even:bg-gray-100">
                <th>{equipment.id}</th>
                <td className="flex-1">
                  <img
                    src={equipment.equipmentImage}
                    alt={equipment.name}
                    className="w-fit h-16 aspect-video object-cover object-center"
                  />
                </td>
                <td>{equipment.name}</td>
                <td className="flex-1 truncate">
                  {parseRemark(equipment.remark)}
                </td>

                <td>
                  {equipment.available ? (
                    <Badge color={"success"}>Available</Badge>
                  ) : (
                    <Badge color={"danger"}>Not Available</Badge>
                  )}
                </td>
                <td className="flex-1">
                  <div className="w-full flex gap-2">
                    <Button
                      variant={"warning"}
                      rounded={"default"}
                      onClick={() => handleClickUpdate(equipment)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <EditInventoryModal
        ref={editInventoryModalRef}
        onSuccess={onUpdate}
        equipment={selectedEquipment}
      />
    </div>
  );
}
