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

    const onEditUser = (body:{
        username?:string,
        type?:string
    },treatment?:QueryTreatmentType)=>{

        onQuery({
            method:'put',
            url:api_endpoints.user.put,
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true,
            body:body
        },treatmentProvider(treatment))

    }

    const onGetUser = (query:UserQueryGetType,params:{
        limit?:number,
        page?:number,
        username?:string,
        search?:string,
        post_id?:string
    },treatment?:QueryTreatmentType)=>{


        const optional_params = {
            username:(
                params?.username ? "&username="+params.username : ""
            ),
            search:(
                params.search ? "&search="+params.search : ""
            ),
            post_id:(
                params.post_id ? "&post_id="+params.post_id : ""
            )
        }

        onQuery({
            url:api_endpoints.user.get
            +"/"+query.mode
            +"?type="+query.type
            +"&hasImage="+query.hasImage
            +"&limit="+params.limit
            +"&page="+params.page
            +optional_params.username
            +optional_params.search
            +optional_params.post_id,
            method:'get',
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }


    return {
        onGetUser,
        onPostFollow,
        onEditUser,
        profileQueryState
    }

}

export default useHandleProfile