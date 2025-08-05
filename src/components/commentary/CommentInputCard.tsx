import { useState } from "react"
import useHandleComment from "../../hooks/useHandleComment";
import type { CommentCardComponentProps, CommentPostType } from "../../types/commentary-type";

const CommentInputCard = (
  {type,data,isResponse,onComment}:
  {type:"post"|"commentary",data:Omit<CommentPostType,"description">,isResponse:boolean,onComment:(commentary:CommentCardComponentProps)=>void}) => {

  const [descriptionValue,setDescriptionValue] = useState("");
  const {onPostCommentary} = useHandleComment();
  const onQueryPostCommentary = ()=>{
        onPostCommentary(type,{
          description:descriptionValue,
          post_id:data.post_id,
          for_respond_id:data.for_respond_id,
          thread_id:data.thread_id
        },{
          onThen(result) {
            onComment(result.response.data.commentary)
            setDescriptionValue("")
          },
          onCatch(error) {
            console.log(error)
          },
        })
  }

  return (
    <article className="commentInputCardArticle">
        <div className="fieldContainer">
            <input
            value={descriptionValue}
            onChange={(e)=>{
              setDescriptionValue(e.target.value)
            }}
            placeholder="Adicione um comentário"
             type="text" />
        </div>
        <div className="responseActionButtonContainer" id="sendButtonContainer">
            <button 
            className="unfilled_button commentary"
            onClick={()=>{
              onQueryPostCommentary()
            }}>
              {
                isResponse
                ? "Enviar"
                : "Enviar"
              }
            </button>
        </div>
    </article>
  )
}

export default CommentInputCard
