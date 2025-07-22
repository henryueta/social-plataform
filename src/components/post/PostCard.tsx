import useHandlePath from "../../hooks/useHandlePath"
import "../../styles/post.css"
import type { PostCardComponentProps } from "../../types/post-type"
import CommentAction from "../commentary/CommentAction"
import CommentInputCard from "../commentary/CommentInputCard"
import Form from "../Form"
import LikeAction from "../like/LikeAction"
import LikeUserList from "../like/LikeUserList"
import ProfileCard from "../profile/ProfileCard"
import CopyUrlAction from "../copyUrl/CopyUrlAction"
import PostAction from "./PostAction"
import type { UserNamertagType } from "../../types/user-type"
import { useState } from "react"
import post_model from "../../models/post-model"
import api_endpoints from "../../config/api"
import LockWall from "../LockWall"

const PostCard = ({postData,liked,detailedView,isSameUser}:
  {
    postData:PostCardComponentProps,
    liked:boolean,
    detailedView:boolean,
    isSameUser:boolean
  }) => {
    const [editPost,setEditPost] = useState(false);
    const [currentDescription,setCurrentDescription] = useState(postData.description);
  
  
    const {onTransition} = useHandlePath();

  return (
    <>
    <LockWall 
    isLock={editPost}
    />
    <article 
    style={
      editPost
      ? {
        overflowY:"clip"
      }
      : {}
    }
    className="postCardArticle"
    key={postData.post_id}
    >
        <div className="headerPostContainer">
          <ProfileCard
            userData={{
              namertag:postData.namertag as UserNamertagType,
              username:postData.username,
              image:postData.user_small_photo
            }}
            intervalDate={postData.creation_date_interval}
          />
          {
            !!(detailedView && !editPost )
            &&
            <PostAction
            onSelectEdit={()=>{
              setEditPost(true)
            }}
            isSameUser={isSameUser}
            id={postData.post_id}
            />
          }
        </div>
        {
          !editPost
          ? <div className="descriptionContainer"
            onClick={()=>{
            !detailedView
            &&
            onTransition("/post/view/"+postData.post_id)
          }}
        >
              <p>
                {
                currentDescription
                } 
              </p>
          </div>
          : <section 
          className="postEditFormSection"
          style={editPost
            ? {
              zIndex:101,
              position:"fixed",
              top:"50%",
              left:"50%",
              transform:"translate(-50%,-50%)",
            }
            : {}
          }
          >
            <Form
            method="put"
            treatment={{
              onThen(result) {
                const current_response = result.response.data;
                console.log("result",result)
                setCurrentDescription(current_response.description)
                setEditPost(false)
              },
              onCatch(error) {
                console.log("error",error)
              },
            }}
            cancelButton={{
              onCancel:()=>setEditPost(false)
            }}
            defaultValues={[
              {
                id:"description",
                value:currentDescription
              }
            ]}
              model={post_model}
              submit={{
                url:api_endpoints.post.put+"/structure?post_id="+postData.post_id
              }}
              submitButtonTitle="Editar"
            />
          </section>
        }
        
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
    </article>
    </>
  )
}

export default PostCard
