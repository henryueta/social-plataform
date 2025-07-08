import "../../styles/post.css"
import PostList from "../../components/PostList"
import SocialLayout from "../../layout/SocialLayout"

const PostListPage = () => {

  return (
        <SocialLayout>
          <PostList key={Date.now()}/>
        </SocialLayout>
  )
}

export default PostListPage
