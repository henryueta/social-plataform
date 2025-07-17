import { useParams } from "react-router-dom"
import PostList from "../../components/post/PostList"
import SocialLayout from "../../layout/SocialLayout"
import "../../styles/profile.css"

const ProfilePage = () => {
  const {username} = useParams();
  return (
    <SocialLayout>
        {
          !!username
          &&
          <PostList user_username={username}/>
        }
    </SocialLayout>
  )
}

export default ProfilePage
