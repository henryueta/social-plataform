import { Link } from "react-router-dom"
import useHandlePath from "../../hooks/useHandlePath"
import PostCard from "./PostCard"
import { useEffect, useReducer, useRef, useState } from "react";
import Load from "../Load";
import type { PostCardComponentProps, PostListActionType, PostListStateType } from "../../types/post-type";
import useHandleQuery from "../../hooks/useHandleQuery";
import api_endpoints from "../../config/api";
import type { QueryStateType } from "../../types/query-type";
import type { CancelToken } from "axios";
import { AxiosHttpClientFactory } from "../../adapters/axios-adapter";
import ProfileView from "../profile/ProfileView";
import { post_list_filter } from "../../constants/post-constant";

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
      return {...state,filter:action.value}
    case "reset":
      return {...state,...{
        data:action.value.data,
        filter:action.value.filter
      }}
    default:
      return state
  }
}

const PostList = ({user_username}:{user_username?:string}) => {

    const [postListState,setPostListState] = useReducer(handlePostListState,initialPostListState);
    const {onQuery,queryState} = useHandleQuery();
    const [postQueryState,setPostQueryState] = useState<QueryStateType>(queryState);


    useEffect(()=>{

        setPostQueryState(queryState)

    },[queryState])

    const onQueryPostList = (cancelToken:CancelToken,user_username?:string)=>{
        onQuery({
        url:api_endpoints.post.get
        +"/group?limit="
        +postListState.filter.limit
        +"&type="
        +(!!user_username
          ? "especific"
          : "all"
        )
        +"&username="+user_username,
        method:"get",
        cancelToken:cancelToken,
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


    const {onMatch,pathname} = useHandlePath();
    const postListDataRef = useRef<HTMLDivElement>(null);


    useEffect(()=>{
      console.log("remain",postListState.data.remaining)
      !!(postListState.data.remaining === null || !!(postListState.data.remaining > 0))
      &&
      (()=>{
        console.log("limite",postListState.filter.limit)
        onQueryPostList(AxiosHttpClientFactory.createCancelToken(),user_username)
      })()

    },[postListState.filter.limit,user_username,postListState.data.remaining])

    useEffect(()=>{

      setPostListState({
        type:"reset",
        value:{
          data:{
            liked:null,
            remaining:null,
            value:null
          },
          filter:{
            dataType:"recent",
            limit:5
          }
        }
      })

    },[user_username])

    useEffect(()=>{

      const handleListScroll = ()=>{
        if(postListDataRef.current){
          postListDataRef.current.scrollTop + postListDataRef.current.clientHeight >= postListDataRef.current.scrollHeight - 1
        &&
        !!(postListState.data.remaining === null || !!(postListState.data.remaining > 0))
        &&
        // !postQueryState.isLoading
        // &&
        setPostListState({
          type:"filter",
          value:{
            limit:postListState.filter.limit+=2,
            dataType:"recent"
          }
        })
        }
      }

      postListDataRef.current?.addEventListener('scrollend',handleListScroll)
      
      return ()=>{
        if(postListDataRef.current){
          postListDataRef.current.removeEventListener('scroll',handleListScroll)
        }
      }

    },[postListDataRef.current])


  return (
    <div className="postListContainer" ref={postListDataRef}>
            {
              !!user_username
              &&
              <ProfileView username={user_username}/>
            }
            <div className="postListFilter">
              {
                !user_username
                &&
                post_list_filter.map((post_filter)=>
                
                  <Link 
                  to={'/posts/'+post_filter.type}
                  style={{
                  borderBottom:
                    onMatch('/posts/'+post_filter.type as string,pathname)
                    ? "0.1rem solid gray"
                    : "none"
                  }}
                  >
                  {
                    post_filter.title
                  }
                  </Link>
                )
              }
            </div>
            <div className="postList">
              {
                !!postListState.data.value
                &&
                postListState.data.value.map((post)=>
                  <PostCard
                  key={post.post_id}
                  postData={post}
                  liked={!!postListState.data.liked?.includes(post)}
                  />
                )
              }
                <div className="loadListContainer">
                  <Load
                isLoading={postQueryState.isLoading as boolean}
                />
                </div>
            </div>
    </div>
  )
}

export default PostList
