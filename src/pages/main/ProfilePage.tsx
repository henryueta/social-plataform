import { useParams } from "react-router-dom"
import PostList from "../../components/post/PostList"
import SocialLayout from "../../layout/SocialLayout"
import "../../styles/social/profile.css"

const ProfilePage = () => {
  const {username} = useParams();
  return (
    <SocialLayout>
        {
          <PostList user_username={username}/>
        }
    </SocialLayout>
  )
}

export default ProfilePage
