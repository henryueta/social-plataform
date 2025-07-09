import { useEffect, useState } from "react";
import { profile_social_status } from "../../constants/profile-constant";
import useHandleProfile from "../../hooks/useHandleProfile"
import CountView from "../CountView"
import TitleHeader from "../TitleHeader"
import type { ProfileViewState } from "../../types/user-type";


const ProfileView = ({username}:{username:string}) => {

    const {onGetUser} = useHandleProfile();
    const [profileViewState,setProfileViewState] = useState<ProfileViewState|null>(null);

    useEffect(()=>{
        console.log("state",profileViewState)
    },[profileViewState])

    useEffect(()=>{

        onGetUser({
            mode:'single',
            type:'social',
            hasImage:true
        },{
            onThen(result) {
                console.log(result)
                setProfileViewState({
                    data:{
                        image:result.response.data.user.image,
                        username:result.response.data.user.username,
                        social_status:{
                            post_qnt:result.response.data.user.post_qnt,
                            followers_qnt:result.response.data.user.followers_qnt,
                            following_qnt:result.response.data.user.following_qnt
                        }
                    },
                    isFollowing:result.response.data.following,
                    isSameUser:result.response.data.same_user
                })
            },
            onCatch(error) {
                console.log(error)
            },
        },username)

    },[username])

  return (
    <div className="profileInfoContainer">
        {!!profileViewState
        &&
        <>
      <div className="profileImageContainer">
                <img src={profileViewState.data.image} alt={profileViewState.data.username+"s image"} />
      </div>
      <div className="socialInfoContainer">
            <div className="usernameContainer">
                <TitleHeader
                title={profileViewState.data.username}
                />
                <div className="actionsContainer">
                    {
                        profileViewState.isSameUser
                        ? <button>Editar</button>
                        : 
                        profileViewState.isFollowing
                        ? <button>Amigos</button>
                        : <button>Seguir</button>
                    }
                </div>
            </div>
            <div className="activityContainer">
                {
                    !!profileViewState.data
                    &&
                    profile_social_status.map((social_info)=>
                        <CountView
                        label={{
                            type:'text',
                            source:social_info.title
                        }}
                        value={
                            social_info.type === 'post_qnt'
                            ? profileViewState.data.social_status.post_qnt
                            : 
                            social_info.type === 'followers_qnt'
                            ? profileViewState.data.social_status.followers_qnt
                            :
                            social_info.type === 'following_qnt'
                            ? profileViewState.data.social_status.following_qnt
                            : 0
                        }
                        />
                    )
                }
            </div>
        </div>
        </>
        }
    </div>
  )
}

export default ProfileView
