import { useEffect, useState } from "react"
import { AxiosHttpClientFactory } from "../adapters/axios-adapter"
import api_endpoints from "../config/api"
import type { QueryStateType, QueryTreatmentType } from "../types/query-type"
import useHandleQuery from "./useHandleQuery"

const useHandleComment = ()=>{

    const {onQuery,treatmentProvider,queryState} = useHandleQuery();

    const [commentQueryState,setCommentQueryState] = useState<QueryStateType>(queryState);

    useEffect(()=>{

        setCommentQueryState(queryState)

    },[queryState])

    const onGetCommentaryList = (type:'post'|'commentary',table_id:string,limit:number,treatment?:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.commentary.get+"?type="+type+"&table_id="+table_id+"&limit="+limit,
            method:'get',
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    return {
        onGetCommentaryList,
        commentQueryState
    }

}

export default useHandleComment