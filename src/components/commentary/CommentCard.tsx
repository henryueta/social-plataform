import { useState } from "react"
import type { CommentCardComponentProps } from "../../types/commentary-type"
import LikeAction from "../like/LikeAction"
import ProfileCard from "../profile/ProfileCard"
import CommentList from "./CommentList"
import CommentInputCard from "./CommentInputCard"
import useHandleComment from "../../hooks/useHandleComment"

const CommentCard = ({commentaryData,isLiked}:{commentaryData:CommentCardComponentProps,isLiked:boolean}) => {
        const [expandResponse,setExpandResponse] = useState(false);
        const [expandResponseInput,setExpandResponseInput] = useState(false);
          const {currentCommentary,setCurrentCommentary} = useHandleComment();
        
    return (
    <article className="commentCardArticle">
        <ProfileCard
        userData={{
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
                <button 
                className="respondCommentaryButton"
                onClick={()=>{
                    setExpandResponseInput((prev)=>!prev)
                }}
                >
                    {
                        !!expandResponseInput
                        ? "Cancelar"
                        : "Responder"
                    }
                </button>
            </div>
            
        </div>
        {
            !!expandResponseInput
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
            onComment={(commentary)=>{setCurrentCommentary(commentary)}}
            isResponse={true}
            />
        }
        {
            !!commentaryData.response_quantity
            &&
            <button 
            className="responseExpansionButton"
            onClick={()=>{setExpandResponse((prev)=>!prev)}}
            >
                <div
                style={{
                    fontWeight:"bold",
                    fontFamily:"initial",
                    fontSize:"1rem",
                     transform: `${!!expandResponse ? "rotate(180deg)" : ""} scaleX(-1)`
                }}
                >^</div>
                <span>
                    {` ${commentaryData.response_quantity}
                    resposta${(commentaryData.response_quantity > 1 
                        ? "s"
                        : ""
                    )}`}
                </span>
            </button>
        }
        {
            !!expandResponse
            &&
            <CommentList
            pushElement={currentCommentary}
            mode="manual"
            table_id={commentaryData.commentary_id}
            type="commentary"
            />
        }

    </article>
  )
}

export default CommentCard
