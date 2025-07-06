import { Link } from "react-router-dom"
import useHandlePath from "../hooks/useHandlePath"
import PostCard from "./PostCard"

const PostList = () => {
    const {onMatch,pathname} = useHandlePath()
  return (
    <div className="postListContainer">
            <div className="postListFilter">
              <Link 
              to={"/posts/all"}
              style={{
                borderBottom:
                  onMatch("/posts/all" as string,pathname)
                  ? "0.1rem solid gray"
                  : "none"
              }}
              >
              Recentes
              </Link>
              <Link 
              to={"/posts/friends"}
              style={{
                borderBottom:
                  onMatch("/posts/friends" as string,pathname)
                  ? "0.1rem solid gray"
                  : "none"
              }}
              >
              Seguindo
              </Link>
            </div>
            <div className="postList">
              <PostCard/>
              <PostCard/>
              <PostCard/>
            </div>
    </div>
  )
}

export default PostList
