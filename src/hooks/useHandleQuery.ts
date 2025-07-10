import { useReducer } from "react"
import type { HttpDataType } from "../types/http-type"
import type { QueryActionType, QueryStateType, QueryTreatmentType } from "../types/query-type"
import { AxiosHttpClientFactory } from "../adapters/axios-adapter"



const initialQueryState:QueryStateType = {

    isLoading:null,
    hasError:null,
    hasSuccess:null

}

const handleQueryState = (state:QueryStateType,action:QueryActionType)=>{

    switch (action.type) {
        case "loading":
            return {...state,isLoading:action.value}
        case "error":
            return {...state,...{
                hasError:action.value,
                hasSuccess:false
            }}
        case "success":
            return {...state,...{
                hasSuccess:action.value,
                hasError:false
            }}
        default:
            return {...state}
    }

}

const useHandleQuery = ()=>{

    const [queryState,setQueryState] = useReducer(handleQueryState,initialQueryState);
    
    const treatmentProvider = (treatment:QueryTreatmentType|undefined)=>{
        return {
            onThen(result:any) {
                !!treatment?.onThen
                &&
                treatment.onThen(result)
            },
            onCatch(error:unknown) {
                !!treatment?.onCatch
                &&
                treatment.onCatch(error)
            },
            onFinally(){
                !!treatment?.onFinally
                && 
                treatment.onFinally()
            }
        }
    }

    const onQuery  = (data:HttpDataType,treatment?:QueryTreatmentType) =>{

        setQueryState({
            type:"loading",
            value:true
        })

        AxiosHttpClientFactory
            .request(data)
            .then((result)=>{

                !!treatment
                &&
                !!treatment.onThen
                && 
                treatment.onThen(result)


                setQueryState({
                    type:"success",
                    value:true
                })
            })
            .catch((error)=>{

                !!treatment
                &&
                !!treatment.onCatch
                && 
                treatment.onCatch(error)



                setQueryState({
                    type:"error",
                    value:true
                })
            })
            .finally(()=>{

                !!treatment
                &&
                !!treatment.onFinally
                && 
                treatment.onFinally()

                setQueryState({
                    type:"loading",
                    value:false
                })
            })
    }

    return {
        queryState,
        onQuery,
        treatmentProvider
    }

}

export default useHandleQuery