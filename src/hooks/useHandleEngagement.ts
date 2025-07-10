import { useEffect, useState } from "react";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import api_endpoints from "../config/api";
import type { QueryStateType, QueryTreatmentType } from "../types/query-type";
import useHandleQuery from "./useHandleQuery"
import type { TableLikeType } from "../types/like-type";

const useHandleEngagement = ()=>{

    const {onQuery,queryState,treatmentProvider} = useHandleQuery();
    const [engagementQueryState,setEngagementQueryState] = useState<QueryStateType>(queryState);

    useEffect(()=>{

        setEngagementQueryState(queryState)

    },[queryState])

    const onPostEngagement = (type:TableLikeType,table_id:string,treatment?:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.like.post+"?type="+type+"&table_id="+table_id,
            method:'post',
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

        
    }

    return {
        onPostEngagement,
        engagementQueryState
    }

}

export default useHandleEngagement