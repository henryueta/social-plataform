import useHandlePath from "../../hooks/useHandlePath"
import type { ProfileCardComponentProps } from "../../types/user-type"
import TitleHeader from "../TitleHeader"

const ProfileCard = ({userData,intervalDate}:{userData:ProfileCardComponentProps,intervalDate?:string}) => {
  const {onTransition} = useHandlePath()
  return (
    <article className="profileCardArticle" onClick={()=>{
        onTransition('/profile/'+userData.username)
    }}>
        <div className="profileImageContainer">
            <img src={userData.image} alt={userData.username+"s image"} />
        </div>
        <TitleHeader
            title={
                userData.username
            }
            subtitle={
              !!intervalDate
              ? intervalDate
              : ""
            }
            /> 
    </article>
  )
}

export default ProfileCard
