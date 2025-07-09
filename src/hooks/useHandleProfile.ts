import { useEffect, useState } from "react";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import api_endpoints from "../config/api";
import type { QueryStateType, QueryTreatmentType } from "../types/query-type"
import type { UserQueryGetType } from "../types/user-type"
import useHandleQuery from "./useHandleQuery"

const useHandleProfile = ()=>{
    const {onQuery,queryState} = useHandleQuery();

    const [profileQueryState,setProfileQueryState] = useState<QueryStateType>(queryState);

    useEffect(()=>{

        setProfileQueryState(queryState)

    },[queryState])

    const onGetUser = (query:UserQueryGetType,treatment?:QueryTreatmentType,username?:string)=>{

        onQuery({
            url:api_endpoints.user.get+`/${query.mode}?type=${query.type}&hasImage=${query.hasImage}${(!!username ? '&username='+username : '')}`,
            method:'get',
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },{
            onThen(result) {
                !!treatment?.onThen
                &&
                treatment.onThen(result)
            },
            onCatch(error) {
                !!treatment?.onCatch
                &&
                treatment.onCatch(error)
            },
        })

    }


    return {
        onGetUser
    }

}

export default useHandleProfile