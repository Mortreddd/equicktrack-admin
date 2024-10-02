import { Equipment } from "@/types/Equipment";
import { Button } from "../Button";
import { useRef, useState } from "react";
import { ADMIN_API } from "@/utils/Api";
import AlertModal from "../AlertModal";
import { parseRemark } from "@/utils/String";
import Badge from "@/components/Badge";

interface InventoryTableProps {
  equipments: Equipment[];
  onDelete: (equipment: Equipment) => void;
  //   onUpdate: (equipment: Equipment) => void;
}

export default function InventoryTable({
  equipments,
  onDelete,
}: //   onUpdate,
InventoryTableProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(
    equipments[0]
  );

  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleClickDelete(equipment: Equipment) {
    setSelectedEquipment(equipment);
    deleteModalRef.current?.showModal();
  }

  async function handleDeleteEquipment(equipment: Equipment) {
    try {
      setLoading(true);
      const response = await ADMIN_API.delete(
        `/equipments/${equipment.id}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        onDelete(equipment);
        deleteModalRef.current?.close();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
                    className="w-fit h-16 mx-auto aspect-video object-cover object-center"
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
                    <Badge color={"danger"}>Not Availalbe</Badge>
                  )}
                </td>
                <td className="flex-1">
                  <div className="w-full flex gap-2">
                    <Button variant={"warning"} rounded={"default"}>
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
                    <Button
                      variant={"danger"}
                      rounded={"default"}
                      loading={loading}
                      onClick={() => handleClickDelete(equipment)}
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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

      <AlertModal
        type={"danger"}
        ref={deleteModalRef}
        loading={loading}
        onConfirm={() => handleDeleteEquipment(selectedEquipment)}
      >
        <div className="w-full py-3 flex justify-center flex-col">
          <div className="flex w-full gap-2 items-center-center flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <h1 className="text-xl text-black font-semibold mx-auto">
              Notice!
            </h1>
          </div>
          <div className="w-full h-fit mt-2 text-center">
            Are you sure to delete {selectedEquipment?.name}?
          </div>
        </div>
      </AlertModal>
    </div>
  );
}
