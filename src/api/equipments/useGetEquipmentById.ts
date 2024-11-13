import {useEffect, useState} from "react";
import {RequestState} from "@/api/common.ts";
import {Equipment} from "@/types/Equipment.ts";
import {ADMIN_API} from "@/utils/Api.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Models.ts";


export function useGetEquipmentById(equipmentId: number) {
    const [ state, setState ] = useState<RequestState<Equipment>>({
        loading : false,
        error : null,
        data : null
    })

    useEffect(() => {
        async function getEquipmentById() {
            setState({...state, loading : true})
            await ADMIN_API.get(`/equipments/${equipmentId}`, {
                headers : {
                    "Content-Type": "application/json",
                }
            }).then((response: AxiosResponse<Equipment>) => {
                setState({...state, data : response.data, error: null})
            }).catch((error : AxiosError<ErrorResponse>) => {
                setState({...state, error : error?.message, data: null})
            }).finally(() => {
                setState({ ...state, loading : false})
            })
        }

        getEquipmentById()
    }, [equipmentId])



    return state;

}