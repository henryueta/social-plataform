import useHandlePath from "../../hooks/useHandlePath"
import type { ProfileCardComponentProps } from "../../types/user-type"

const ProfileCard = ({username,image}:ProfileCardComponentProps) => {
  const {onTransition} = useHandlePath()
  return (
    <article className="profileCardArticle" onClick={()=>{
        onTransition('/profile/'+username)
    }}>
        <div className="profileImageContainer">
            <img src={image} alt={username+"s image"} />
        </div>
        <div className="profileUsernameContainer">
            {
                username
            }
        </div>
    </article>
  )
}

export default ProfileCard
