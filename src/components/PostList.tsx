import { Link } from "react-router-dom"
import useHandlePath from "../hooks/useHandlePath"
import PostCard from "./PostCard"
import { useEffect, useReducer, useRef, useState } from "react";
import Load from "./Load";
import type { PostCardComponentProps, PostListActionType, PostListStateType } from "../types/post-type";
import useHandleQuery from "../hooks/useHandleQuery";
import api_endpoints from "../config/api";
import type { QueryStateType } from "../types/query-type";



const PostList = ({user_id}:{user_id?:string}) => {

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
    default:
      return state
  }
}



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


    const {onMatch,pathname} = useHandlePath();
    const postListDataRef = useRef<HTMLDivElement>(null);

    console.log("page",postListState.filter.limit)

    useEffect(()=>{

      !!(postListState.data.remaining === null || !!(postListState.data.remaining > 0))
      &&
      (()=>{
        console.log("limite",postListState.filter.limit)
        onQueryPostList(user_id)
      })()

    },[postListState.filter.limit])



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
        console.log("AAA")
        if(postListDataRef.current){
          console.log("BBB")
          postListDataRef.current.removeEventListener('scroll',handleListScroll)
        }
      }

    },[postListDataRef.current])


  return (
    <div className="postListContainer" ref={postListDataRef}>
            <div className="postListFilter">
              
              <Link 
              to={"/posts/all"}
              style={{
                borderBottom:
                  onMatch("/posts/all" as string,pathname)
                  ? "0.1rem solid gray"
                  : "none"
              }}
              >
              Recentes
              </Link>
              <Link 
              to={"/posts/friends"}
              style={{
                borderBottom:
                  onMatch("/posts/friends" as string,pathname)
                  ? "0.1rem solid gray"
                  : "none"
              }}
              >
              Seguindo
              </Link>
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
