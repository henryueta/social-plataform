import { useEffect, useState } from "react";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import api_endpoints from "../config/api";
import type { QueryStateType, QueryTreatmentType } from "../types/query-type";
import useHandleQuery from "./useHandleQuery"
import type { TableLikeType } from "../types/like-type";

const useHandleLike = ()=>{

    const {onQuery,queryState,treatmentProvider} = useHandleQuery();
    const [likeQueryState,setLikeQueryState] = useState<QueryStateType>(queryState);

    useEffect(()=>{

        setLikeQueryState(queryState)

    },[queryState])

    const onPostLike = (type:TableLikeType,table_id:string,treatment?:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.like.post+"?type="+type+"&table_id="+table_id,
            method:'post',
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    return {
        onPostLike,
        likeQueryState
    }

}

export default useHandleLike