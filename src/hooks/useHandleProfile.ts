import { useEffect, useState } from "react";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import api_endpoints from "../config/api";
import type { QueryStateType, QueryTreatmentType } from "../types/query-type"
import type { UserQueryGetType } from "../types/user-type"
import useHandleQuery from "./useHandleQuery"

const useHandleProfile = ()=>{
    const {onQuery,queryState,treatmentProvider} = useHandleQuery();

    const [profileQueryState,setProfileQueryState] = useState<QueryStateType>(queryState);

    useEffect(()=>{

        setProfileQueryState(queryState)

    },[queryState])

    const onPostFollow = (username:string,treatment?:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.follow.post,
            method:'post',
            body:{
                username:username
            },
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    const onGetUser = (query:UserQueryGetType,params:{
        limit?:number,
        page?:number,
        username?:string
    },treatment?:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.user.get
            +"/"+query.mode
            +"?type="+query.type
            +"&hasImage="+query.hasImage
            +'&username='+(params?.username ? params.username : "")
            +"&limit="+params.limit
            +"&page="+params.page
            ,
            method:'get',
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }


    return {
        onGetUser,
        onPostFollow,
        profileQueryState
    }

}

export default useHandleProfile