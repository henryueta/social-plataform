import "../../styles/post.css"
import type { PostCardComponentProps } from "../../types/post-type"
import CommentCard from "../CommentCard"
import Like from "../Like"
import TitleHeader from "../TitleHeader"

const PostCard = ({postData,liked}:{postData:PostCardComponentProps,liked:boolean}) => {
  return (
    <article className="postCardArticle" key={postData.post_id}>
        <div className="headerContainer">
             <div className="profileImageContainer">
                <img src={postData.user_small_photo} alt={postData.username+"s image"} />
            </div>
            <TitleHeader
            title={
                postData.username
            }
            subtitle={
              postData.creation_date_interval
            }
            />   
        </div>
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
          <Like
          isLiked={liked}
          quantity={postData.like_qnt}
          />
          <div className="commentContainer">
            <img src="https://img.icons8.com/?size=100&id=rtz2obYzAaeZ&format=png&color=000000" alt="" />
            <span>
              {postData.commentary_qnt}
            </span>
          </div>
        </div>
        <CommentCard/>
    </article>
  )
}

export default PostCard
