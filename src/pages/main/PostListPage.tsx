import "../../styles/post.css"
import ProfileList from "../../components/ProfileList"
import PostList from "../../components/PostList"

const PostListPage = () => {

  return (
      <section className="postListSection">
          <PostList/>
          <ProfileList/>
      </section>
  )
}

export default PostListPage
