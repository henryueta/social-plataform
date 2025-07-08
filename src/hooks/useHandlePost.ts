import { useEffect, useReducer, useState } from "react";
import type { PostCardComponentProps, PostListActionType, PostListStateType } from "../types/post-type";
import api_endpoints from "../config/api";
import useHandleQuery from "./useHandleQuery";
import type { QueryStateType } from "../types/query-type";

const initialPostListState:PostListStateType = {
    data:{
      value:null,
      remaining:null,
      liked:null
    },
    filter:{
      dataType:"recent",
      limit:5
    }
}

const handlePostListState = (state:PostListStateType,action:PostListActionType)=>{
  switch (action.type) {
    case "data":
      return {...state,data:action.value}
    case "filter":
        console.log("limite",action.value.limit)
      return {...state,filter:action.value}    
    default:
      return state
  }
}


const useHandlePost = ()=>{

    const [postListState,setPostListState] = useReducer(handlePostListState,initialPostListState);
    const {onQuery,queryState} = useHandleQuery();
    const [postQueryState,setPostQueryState] = useState<QueryStateType>(queryState);

    
    useEffect(()=>{

        setPostQueryState(queryState)

    },[queryState])

    const onQueryPostList = (user_id?:string)=>{
        onQuery({
        url:api_endpoints.post.get
        +"/group?limit="
        +postListState.filter.limit
        +"&type="
        +(!!user_id
          ? "especific"
          : "all"
        ),
        method:"get",
        withCredentials:true
      },{
        onThen(result) {
            console.log(result.response)
        const current_response = result.response.data;
        setPostListState({
          type:"data",
          value:{
            value:current_response.post_list,
            remaining:current_response.post_list_count_remaining,
            liked:current_response.post_list.filter((post:PostCardComponentProps)=>{
              return current_response.liked_posts.includes(post.post_id)
            })
          }
        })
        },
        onCatch(error) {
        console.log(error)
            
        },
      })

    }

    console.log(postListState.filter.limit)

    return {
        postListState,
        setPostListState,
        onQueryPostList,
        postQueryState
    }
}

export default useHandlePost