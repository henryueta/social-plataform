import { useEffect, useState } from "react";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import api_endpoints from "../config/api";
import type { PostQueryGetType, PostQueryPutType } from "../types/post-type";
import type { QueryStateType, QueryTreatmentType } from "../types/query-type";
import useHandleQuery from "./useHandleQuery"

const useHandlePost = ()=>{

  const {onQuery,queryState,treatmentProvider} = useHandleQuery();
  const [postQueryState,setPostQueryState] = useState<QueryStateType>(queryState);


  useEffect(()=>{
    setPostQueryState(queryState)
  },[queryState])

  const onGetPost = (query:PostQueryGetType,treatment?:QueryTreatmentType,params?:{
    id?:string,
    username?:string,
    search?:string
    limit?:number,
    page?:number
  })=>{


    const postGetUrlParams = {
      username:!!params?.username 
    ? "&username="+params.username
    : "",
      id:!!params?.id
    ? "&id="+params.id
    : "",
      limit:!!params?.limit
    ? "&limit="+params.limit+"&page="+params.page
    : "",
      search:!!params?.search
    ? "&search="+params.search
    : ""
    }


    onQuery({
      url:api_endpoints.post.get
      +"/"+query.mode
      +"?type="+query.type
      +postGetUrlParams.limit
      +postGetUrlParams.username
      +postGetUrlParams.search
      +postGetUrlParams.id,
      method:"get",
      cancelToken:AxiosHttpClientFactory.createCancelToken(),
      withCredentials:true
    },treatmentProvider(treatment))

  }

  const onDeletePost = (id:string,treatment?:QueryTreatmentType)=>{

    onQuery({
      url:api_endpoints.post.delete+"?post_id="+id,
      method:'put',
      cancelToken:AxiosHttpClientFactory.createCancelToken(),
      withCredentials:true
    },treatmentProvider(treatment))

  }

  const onPutPost = (query:PostQueryPutType,post_id:string,treatment?:QueryTreatmentType,body?:{
    description:string
  })=>{

    onQuery({
      url:api_endpoints.post.put+"/"+query.mode+"?type="+query.type+"&post_id="+post_id,
      method:'put',
      cancelToken:AxiosHttpClientFactory.createCancelToken(),
      withCredentials:true,
      body:!!body?.description
      ? {description:body.description}
      : {}
    },
    treatmentProvider(treatment))

  }
  return {
    onGetPost,
    onPutPost,
    postQueryState,
    onDeletePost
  }

}

export default useHandlePost