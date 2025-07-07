import "../styles/post.css"
import CommentCard from "./CommentCard"
import TitleHeader from "./TitleHeader"
import {} from "react"

const PostCard = () => {

  

  return (
    <article className="postCardArticle">
        <div className="headerContainer">
             <div className="profileImageContainer">
                <img src="" alt="" />
            </div>
            <TitleHeader
            title={
                "guest_"+(Math.random()*10).toFixed(5).replace(".","")
            }
            subtitle={
              (Math.random()*10).toFixed()+" horas atrás"
            }
            />   
        </div>
        <div className="descriptionContainer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere libero, reiciendis voluptate quaerat nisi sunt ea cumque beatae voluptatem inventore quidem vitae tenetur voluptatibus eos repudiandae amet eius nesciunt magni.
        </div>
        {/* <div className="mediaContainer"
        style={{
          backgroundImage:"url(https://img.freepik.com/fotos-gratis/cidade-da-noite-brilhante_1127-8.jpg)"
        }}
        >
        </div> */}
        <div className="actionsContainer">
          <div className="likeContainer">
            <img src={"https://img.icons8.com/?size=100&id=82788&format=png&color=000000"} alt="" />
            <span>
              {(Math.random()*10).toFixed()}
            </span>
          </div>
          <div className="commentContainer">
            <img src="https://img.icons8.com/?size=100&id=rtz2obYzAaeZ&format=png&color=000000" alt="" />
            <span>
              {(Math.random()*10).toFixed()}
            </span>
          </div>
        </div>
        <CommentCard/>
    </article>
  )
}

export default PostCard
