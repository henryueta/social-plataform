import ProfileList from "../components/profile/ProfileList"
import "../styles/layout/social-layout.css"

const SocialLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <section className="socialContentContainer">
            {children}
            <ProfileList/>
        </section>
    </>
  )
}

export default SocialLayout
