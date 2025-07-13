import { useState } from "react"
import useHandleComment from "../../hooks/useHandleComment";
import type { CommentCardComponentProps, CommentPostType } from "../../types/commentary-type";

const CommentInputCard = (
  {type,data,isResponse,onComment}:
  {type:"post"|"commentary",data:Omit<CommentPostType,"description">,isResponse:boolean,onComment:(commentary:CommentCardComponentProps)=>void}) => {

  const [isWriting,setIsWriting] = useState(false);
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
            console.log(result.response.data.commentary)
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
              setIsWriting(!!e.target.value.trim().length)
              setDescriptionValue(e.target.value)
            }}
            placeholder="Adicione um comentário"
             type="text" />
        </div>
        {
          !!isWriting
          &&
          <div className="responseActionButtonContainer" id="cancelButtonContainer">
            <button>Cancelar</button>
          </div>
        }
        <div className="responseActionButtonContainer" id="sendButtonContainer">
            <button onClick={()=>{
              onQueryPostCommentary()
            }}>
              {
                isResponse
                ? "Responder"
                : "Comentar"
              }
            </button>
        </div>
    </article>
  )
}

export default CommentInputCard
