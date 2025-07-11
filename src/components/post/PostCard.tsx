import "../../styles/post.css"
import type { PostCardComponentProps } from "../../types/post-type"
import CommentAction from "../commentary/CommentAction"
import CommentInputCard from "../commentary/CommentInputCard"
import LikeAction from "../like/LikeAction"
import ProfileCard from "../profile/ProfileCard"

const PostCard = ({postData,liked,detailedView}:{postData:PostCardComponentProps,liked:boolean,detailedView:boolean}) => {
  return (
    <article className="postCardArticle" key={postData.post_id}>
        <ProfileCard
        userData={{
          username:postData.username,
          image:postData.user_small_photo
        }}
        intervalDate={postData.creation_date_interval}
        />
        <div className="descriptionContainer">
            <p>
              {
              postData.description
              } 
            </p>
        </div>
        {/* <div className="mediaContainer"
        style={{
          backgroundImage:"url(https://img.freepik.com/fotos-gratis/cidade-da-noite-brilhante_1127-8.jpg)"
        }}
        >
        </div> */}

        <div className="actionsContainer">
          <LikeAction
          type="post"
          id={postData.post_id}
          isLiked={liked}
          quantity={postData.like_qnt}
          />
          {
            !detailedView
            &&
            <CommentAction
          id={postData.post_id}
          quantity={postData.commentary_qnt}
          />
          }
        </div>
        
        {
          !detailedView
          &&
          <CommentInputCard/>
        }
    </article>
  )
}

export default PostCard
