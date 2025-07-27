import { useParams } from "react-router-dom"
import ProfileList from "../../components/profile/ProfileList";
import SocialLayout from "../../layout/SocialLayout";


const ProfileListPage = () => {

  const {identifier,identifier_type,type} = useParams();

  return (
    <SocialLayout>
      {/* <section className="profileListPageSection"> */}
        <ProfileList
        isForPage
        type={type as 'following'|'followers'}
        identifier={identifier}
        identifier_type={identifier_type as string}
        />
      {/* </section> */}
    </SocialLayout>
  )
}

export default ProfileListPage
