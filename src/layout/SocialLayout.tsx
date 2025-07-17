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
              <ProfileList/>
            }
        </section>
    </>
  )
}

export default SocialLayout
