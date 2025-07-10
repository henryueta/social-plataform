import { useParams } from "react-router-dom"
import SocialLayout from "../../layout/SocialLayout"
import PostView from "../../components/post/PostView";

const PostPage = () => {
  const {id} = useParams();
  return (
    <SocialLayout>
      {
        !!id
        &&
        <PostView id={id}/>
      }
    </SocialLayout>
  )
}

export default PostPage
