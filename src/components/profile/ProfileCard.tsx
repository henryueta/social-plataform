import useHandlePath from "../../hooks/useHandlePath"
import type { ProfileCardComponentProps } from "../../types/user-type"
import TitleHeader from "../TitleHeader"

const ProfileCard = ({userData,intervalDate,noRedirect}
  :{userData:ProfileCardComponentProps,intervalDate?:string,noRedirect?:boolean}) => {
  const {onTransition} = useHandlePath()
  return (
    <article className="profileCardArticle" onClick={()=>{
      !noRedirect
      &&
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
              ? userData.namertag
              : ""
            }
            /> 
            <div className="intervalDateContainer">
              {  !!intervalDate
              ? intervalDate
              : ""}
            </div>
    </article>
  )
}

export default ProfileCard
