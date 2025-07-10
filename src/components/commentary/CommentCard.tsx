import type { CommentCardComponentProps } from "../../types/commentary-type"
import LikeAction from "../like/LikeAction"
import ProfileCard from "../profile/ProfileCard"

const CommentCard = ({commentaryData}:{commentaryData:CommentCardComponentProps}) => {
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
                <span>Responder</span>
                <LikeAction
                type="commentary"
                id={commentaryData.commentary_id}
                isLiked={false}
                quantity={commentaryData.like_qnt}
                />
            </div>
        </div>
    </article>
  )
}

export default CommentCard
