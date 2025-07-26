import { useParams } from "react-router-dom"
import ProfileList from "../../components/profile/ProfileList";
import SocialLayout from "../../layout/SocialLayout";


const ProfileListPage = () => {

  const {username,type} = useParams();

  return (
    <SocialLayout>
      {/* <section className="profileListPageSection"> */}
        <ProfileList
        isForPage
        type={type as 'following'|'followers'}
        username={username}
        />
      {/* </section> */}
    </SocialLayout>
  )
}

export default ProfileListPage
