import { useEffect, useRef, useState } from "react";
import useHandlePost from "../../hooks/useHandlePost"
import "../../styles/social/post.css"
import type { PostCardComponentProps } from "../../types/post-type";
import PostCard from "./PostCard";
import CommentList from "../commentary/CommentList";
import CommentInputCard from "../commentary/CommentInputCard";
import useHandleComment from "../../hooks/useHandleComment";

const PostView = ({id}:{id:string}) => {

  const {onGetPost} = useHandlePost();
  const postViewRef = useRef<HTMLDivElement>(null)
  const [commentaryListUpdate,setCommentaryListUpdate] = useState<()=>void>(()=>{
    return ()=>console.log("QAQAAA")
  });
  const {currentCommentary,setCurrentCommentary} = useHandleComment();
  const [postViewState,setPostViewState] = useState<{
    data:PostCardComponentProps | null,
    isLiked:boolean | null,
    isSameUser:boolean | null
  }>();

  const updateComentaryList = (action:()=>void)=>{
      setCommentaryListUpdate(()=>{
        return ()=>action()
      })
  }

  useEffect(()=>{

    onGetPost({
      mode:'single',
      type:'especific'
    },{
      onThen(result) {
        console.log("RESULTADOI",result)
        setPostViewState({
          data:result.response.data.post,
          isLiked:result.response.data.liked_post,
          isSameUser:result.response.data.isSameUser
        })
      },
      onCatch(error) {
        console.log(error)
      },
    },{
      id:id
    })

  },[])

  useEffect(()=>{
    console.log("FUNCTION",commentaryListUpdate)
  },[commentaryListUpdate])

  return (
    <div className="postInfoContainer" ref={postViewRef} onScrollEnd={()=>{
      commentaryListUpdate()
    }}>
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
        isSameUser={!!postViewState.isSameUser}
      />
      <div className="commentaryQuantityContainer">
        {
        postViewState.data.commentary_qnt
        +" Comentário"+(postViewState.data.commentary_qnt > 1 ? "s" : "")
        }
      </div>
      <CommentInputCard 
      type="post"
      data={{
        post_id:id
      }}
      onComment={(commentary)=>{
          setCurrentCommentary(commentary)
      }}
      isResponse={false}/>
      <CommentList
      deleteElement={null}
      pushElement={currentCommentary}
      mode="automatic"
      externalReference={{
        ref:postViewRef,
        functionRef:updateComentaryList
      }}
      table_id={id}
      type="post"
      />
      </>
      }
    </div>
  )
}

export default PostView
