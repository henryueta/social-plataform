import useHandlePath from "../../hooks/useHandlePath"
import "../../styles/post.css"
import type { PostCardComponentProps } from "../../types/post-type"
import CommentAction from "../commentary/CommentAction"
import CommentInputCard from "../commentary/CommentInputCard"
import LikeAction from "../like/LikeAction"
import LikeUserList from "../like/LikeUserList"
import ProfileCard from "../profile/ProfileCard"
import CopyUrlAction from "../copyUrl/CopyUrlAction"
import PostAction from "./PostAction"

const PostCard = ({postData,liked,detailedView,isSameUser}:
  {
    postData:PostCardComponentProps,
    liked:boolean,
    detailedView:boolean,
    isSameUser:boolean
  }) => {

  const {onTransition} = useHandlePath();

  return (
    <article 
    className="postCardArticle"
    key={postData.post_id}
    >
        <div className="headerPostContainer">
          <ProfileCard
            userData={{
              namertag:postData.namertag,
              username:postData.username,
              image:postData.user_small_photo
            }}
            intervalDate={postData.creation_date_interval}
          />
          {
            detailedView 
            &&
            <PostAction
            isSameUser={isSameUser}
            id={postData.post_id}
            />
          }
        </div>
        <div className="descriptionContainer"
        onClick={()=>{
          onTransition("/post/view/"+postData.post_id)
        }}
        >
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
          {!detailedView
          &&
          <CopyUrlAction
          hasIcon
          url={"/post/view/"+postData.post_id}
          />}
        </div>
        <LikeUserList
        hasImage={false}
        post_id={postData.post_id}        
        />
        
        {/* {
          !detailedView
          &&
          <CommentInputCard isResponse={false}/>
        } */}
    </article>
  )
}

export default PostCard
