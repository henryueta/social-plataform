import { useEffect, useState } from "react";
import useHandlePost from "../../hooks/useHandlePost"
import "../../styles/post.css"
import type { PostCardComponentProps } from "../../types/post-type";
import type { CommentCardComponentProps } from "../../types/commentary-type";
import PostCard from "./PostCard";
import CommentList from "../commentary/CommentList";

const PostView = ({id}:{id:string}) => {

  const {onGetPost} = useHandlePost();
  const [postViewState,setPostViewState] = useState<{
    data:PostCardComponentProps | null,
    isLiked:boolean | null,
    commentary_list:CommentCardComponentProps[]
  }>();

  useEffect(()=>{

    onGetPost({
      mode:'single',
      type:'especific'
    },{
      onThen(result) {
        setPostViewState({
          data:result.response.data.post,
          commentary_list:result.response.data.commentary_list,
          isLiked:result.response.data.liked_post
        })
      },
      onCatch(error) {
        console.log(error)
      },
    },{
      id:id
    })

  },[])

  return (
    <div className="postInfoContainer">
      
      {
      !!postViewState
      &&
      !!postViewState.data
      &&
      <>
      <PostCard
        postData={postViewState.data}
        liked={!!postViewState.isLiked}
      />
      <CommentList
      commentaryList={postViewState.commentary_list}
      />
      </>
      
      }
      
    </div>
  )
}

export default PostView
