import { useEffect, useRef, useState } from "react";
import useHandlePost from "../../hooks/useHandlePost"
import "../../styles/post.css"
import type { PostCardComponentProps } from "../../types/post-type";
import PostCard from "./PostCard";
import CommentList from "../commentary/CommentList";
import CommentInputCard from "../commentary/CommentInputCard";
import useHandleComment from "../../hooks/useHandleComment";

const PostView = ({id}:{id:string}) => {

  const {onGetPost} = useHandlePost();
  const postViewRef = useRef<HTMLDivElement>(null)
  const {currentCommentary,setCurrentCommentary} = useHandleComment();
  const [postViewState,setPostViewState] = useState<{
    data:PostCardComponentProps | null,
    isLiked:boolean | null,
  }>();

  useEffect(()=>{

    onGetPost({
      mode:'single',
      type:'especific'
    },{
      onThen(result) {
        console.log("resultado")
        setPostViewState({
          data:result.response.data.post,
          isLiked:result.response.data.liked_post,
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
    <div className="postInfoContainer" ref={postViewRef}>
      
      {
      !!postViewState
      &&
      !!postViewState.data
      &&
      <>
      <PostCard
      detailedView={true}
        postData={postViewState.data}
        liked={!!postViewState.isLiked}
      />
      <div className="commentaryQuantityContainer">
        {
        postViewState.data.commentary_qnt
        +" Comentário"+(postViewState.data.commentary_qnt > 1 ? "s" : "")
        }
      </div>
      <CommentInputCard 
      type="post"
      table_id={id}
      onComment={(commentary)=>{
          setCurrentCommentary(commentary)
      }}
      isResponse={false}/>
      <CommentList
      pushElement={currentCommentary}
      mode="automatic"
      listDataContainerRef={postViewRef}
      table_id={id}
      type="post"
      />
      </>
      }
    </div>
  )
}

export default PostView
