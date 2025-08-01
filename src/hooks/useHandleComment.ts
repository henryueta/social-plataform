import { useEffect, useState } from "react"
import { AxiosHttpClientFactory } from "../adapters/axios-adapter"
import api_endpoints from "../config/api"
import type { QueryStateType, QueryTreatmentType } from "../types/query-type"
import useHandleQuery from "./useHandleQuery"
import type { CommentCardComponentProps, CommentPostType } from "../types/commentary-type"

const useHandleComment = ()=>{

    const {onQuery,treatmentProvider,queryState} = useHandleQuery();

    const [commentQueryState,setCommentQueryState] = useState<QueryStateType>(queryState);
    const [currentCommentary,setCurrentCommentary] = useState<CommentCardComponentProps | null>(null);
    
    useEffect(()=>{

        setCommentQueryState(queryState)

    },[queryState])

    const onPostCommentary = (
        type:"post"|"commentary",
        body:CommentPostType,
        treatment?:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.commentary.post+"?type="+type,
            method:'post',
            body:{
                description:body.description,
                post_id:body.post_id,
                thread_id:body.thread_id,
                for_respond_id:body.for_respond_id
            },
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    const onDeleteCommentary = (id:string,treatment?:QueryTreatmentType)=>{

        onQuery({
            method:"delete",
            url:api_endpoints.commentary.delete+"?commentary_id="+id,
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    const onGetCommentaryList = (type:'post'|'commentary',treatment?:QueryTreatmentType,params?:{
        table_id:string,
        limit:number,
        page:number
    })=>{

        onQuery({
            url:api_endpoints.commentary.get
            +"?type="+type
            +"&table_id="+params?.table_id
            +"&limit="+params?.limit
            +"&page="+params?.page,
            method:'get',
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    return {
        onGetCommentaryList,
        onPostCommentary,
        onDeleteCommentary,
        commentQueryState,
        currentCommentary,
        setCurrentCommentary
    }

}

export default useHandleComment