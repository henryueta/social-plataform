import { useState } from "react"
import type { CommentCardComponentProps } from "../../types/commentary-type"
import LikeAction from "../like/LikeAction"
import ProfileCard from "../profile/ProfileCard"
import CommentInputCard from "./CommentInputCard"
import useHandleComment from "../../hooks/useHandleComment"
import type { UserNamertagType } from "../../types/user-type"

const CommentCard = ({commentaryData,isLiked,onDelete,isSameUser}:
    {
        commentaryData:CommentCardComponentProps,
        isLiked:boolean,
        type:'commentary'|'response',
        onDelete:(forDelete:string)=>void,
        isSameUser:boolean
    }) => {
        const [expandResponseInput,setExpandResponseInput] = useState(false);
        const {currentCommentary,setCurrentCommentary,onDeleteCommentary} = useHandleComment();

    return (
    <article className="commentCardArticle">
        
        <ProfileCard
        userData={{
            namertag:commentaryData.namertag as UserNamertagType,
            username:commentaryData.username,
            image:commentaryData.user_small_photo
        }}
        intervalDate={commentaryData.creation_date_interval}
        />
        <div className="commentaryInfoContainer">
            <div className="descriptionContainer">
                <p>
                    {commentaryData.description}
                </p>
            </div>
            <div className="actionsContainer">
                <LikeAction
                type="commentary"
                id={commentaryData.commentary_id}
                isLiked={isLiked}
                quantity={commentaryData.like_qnt}
                />
                {/* <button 
                className="respondCommentaryButton"
                onClick={()=>{
                    setExpandResponseInput((prev)=>!prev);
                }}
                >
                    {
                        !!expandResponseInput
                        ? "Cancelar"
                        : "Responder"
                    }
                </button> */}
                {
                isSameUser
                &&
                <button
                onClick={()=>{
                    onDeleteCommentary(commentaryData.commentary_id,{
                        onThen(result) {
                            onDelete(result.response.data.commentary_id)
                        },
                        onCatch(error) {
                            console.log(error)
                        },
                    })
                }}
                >
                    Deletar
                </button>
                }
            </div>
            
        </div>
        {
            (!!expandResponseInput
            &&
            !currentCommentary
            )
            &&
            <CommentInputCard
            type="commentary"
            data={{
                post_id:commentaryData.post_id,
                for_respond_id:commentaryData.commentary_id,
                thread_id:(
                    !!commentaryData.thread_id 
                    ? commentaryData.thread_id
                    : commentaryData.commentary_id
                )
            }}
            onComment={(commentary)=>{
                setCurrentCommentary(commentary)
                setExpandResponseInput(false);
            }}
            isResponse={true}
            />
        }
        {
            // (!!commentaryData.response_quantity
            // &&
            // type !== 'response'
            // )
            // &&
            // <button 
            // className="responseExpansionButton"
            // onClick={()=>{setExpandResponse((prev)=>!prev)}}
            // >
            //     <div
            //     style={{
            //         fontWeight:"bold",
            //         fontFamily:"initial",
            //         fontSize:"1rem",
            //          transform: `${!!expandResponse ? "rotate(180deg)" : ""} scaleX(-1)`
            //     }}
            //     >^</div>
            //     <span>
            //         {` ${commentaryData.response_quantity}
            //         resposta${(commentaryData.response_quantity > 1 
            //             ? "s"
            //             : ""
            //         )}`}
            //     </span>
            // </button>
        }
        
        {
        
            // (
            // (!!expandResponse && !!commentaryData.response_quantity)
            // ||
            // !commentaryData.response_quantity 
            // || 
            // type === 'response' 
            // || 
            // !!currentCommentary)
            // &&
            // <CommentList
            // deleteElement={
            //     commentaryForDelete
            // }
            // pushElement={
            //     currentCommentary
            // }
            // mode="manual"
            // table_id={commentaryData.commentary_id}
            // type={"response"}
            // />
        }

    </article>
  )
}

export default CommentCard