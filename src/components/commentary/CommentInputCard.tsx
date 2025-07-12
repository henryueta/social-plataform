import { useState } from "react"
import useHandleComment from "../../hooks/useHandleComment";
import type { CommentCardComponentProps } from "../../types/commentary-type";

const CommentInputCard = (
  {type,table_id,isResponse,onComment}:
  {type:"post"|"commentary",table_id:string,isResponse:boolean,onComment:(commentary:CommentCardComponentProps)=>void}) => {

  const [isWriting,setIsWriting] = useState(false);
  const [descriptionValue,setDescriptionValue] = useState("");
  const {onPostCommentary} = useHandleComment();
  const onQueryPostCommentary = (post_id:string,description:string)=>{
        onPostCommentary(type,table_id,{
          description:description,
          post_id:post_id
        },{
          onThen(result) {
            console.log(result)
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
              onQueryPostCommentary(table_id,descriptionValue)
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
