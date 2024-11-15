import {forwardRef, HTMLAttributes, PropsWithChildren, Ref, useState} from "react";
import AlertModal from "@/components/common/AlertModal.tsx";
import {cn} from "@/utils/StyleUtil.ts";
import {ADMIN_API} from "@/utils/Api.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse, Response} from "@/types/Models.ts";
import {RequestState} from "@/api/common.ts";
import {useGetEquipmentById} from "@/api/equipments/useGetEquipmentById.ts";
import {useAlert} from "@/contexts/AlertContext.tsx";
import {ModalRef} from "@/components/common/Modal.tsx";

interface DangerAlertModalProps extends
    HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
    equipmentId: number;
}
function DeleteEquipmentAlertModal({equipmentId, className} : DangerAlertModalProps, ref : Ref<ModalRef>) {
    const { data : equipment } = useGetEquipmentById(equipmentId);
    const [state, setState] = useState<RequestState<Response>>({
        loading: false,
        error: null,
        data: null
    })
    const { showAlert } = useAlert();
    async function handleDeleteEquipment() {
        setState({...state, loading : true})
        await ADMIN_API.delete(`/equipments/${equipmentId}/delete`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response: AxiosResponse<Response>) => {
                setState({...state, data : response.data, error : null})
                showAlert(response?.data.message ?? "Successfully added a equipment", "success");
            })

            .catch((error: AxiosError<ErrorResponse>) => {
                setState({...state, data : null, error : error.response?.data.message})
                showAlert(
                    error.response?.data.message ?? "Something went wrong",
                    "error"
                );
            })
            .finally(() => {
                setState({...state, loading : false });
            });
    }
    return (
        <AlertModal type={'danger'} ref={ref} className={cn(className)}
                    confirm={() => handleDeleteEquipment()} loading={state.loading}>
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
                    Are you sure to delete {equipment?.name}?
                </div>
            </div>
        </AlertModal>
    )
}


export default forwardRef(DeleteEquipmentAlertModal)