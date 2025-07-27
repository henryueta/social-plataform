import ProfileList from "../components/profile/ProfileList"
import { useHandleScreen } from "../context/ScreenContext"
import "../styles/layout/social-layout.css"

const SocialLayout = ({children}:{children:React.ReactNode}) => {
  
  const {isMobile} = useHandleScreen();

  return (
    <>
        <section className="socialContentContainer">
            {children}
            {
              !isMobile
              &&
              <ProfileList identifier_type="user" type="following" redirect/>
            }
        </section>
    </>
  )
}

export default SocialLayout
