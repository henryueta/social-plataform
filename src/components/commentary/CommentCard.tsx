import type { CommentCardComponentProps } from "../../types/commentary-type"
import LikeAction from "../like/LikeAction"
import ProfileCard from "../profile/ProfileCard"

const CommentCard = ({commentaryData,isLiked}:{commentaryData:CommentCardComponentProps,isLiked:boolean}) => {
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
                <span>Responder</span>
            </div>
        </div>
        <div className="responseContainer">
            4 Respostas 
        </div>
    </article>
  )
}

export default CommentCard
