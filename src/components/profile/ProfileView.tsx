import { useEffect, useState } from "react";
import { profile_social_status } from "../../constants/profile-constant";
import useHandleProfile from "../../hooks/useHandleProfile"
import CountView from "../CountView"
import TitleHeader from "../TitleHeader"
import type { ProfileViewState } from "../../types/user-type";
import DataFetcher from "../data/DataFetcher";
import useHandlePath from "../../hooks/useHandlePath";


const ProfileView = ({username}:{username:string}) => {

    const {pathname} = useHandlePath();
    const {onGetUser,profileQueryState,onPostFollow} = useHandleProfile();
    const [profileViewState,setProfileViewState] = useState<ProfileViewState|null>(null);
    
    const onFollow = ()=>{

        !!profileViewState?.data
        &&
        onPostFollow(profileViewState.data.username,{
            onThen(result) {
                console.log(result)
                const current_result = result.response.data; 
                setProfileViewState((prev)=>{
                    const social_status = prev?.data?.social_status
                    return !!social_status
                    ?
                        ({...prev,...{
                            isFollowing:current_result.isFollowing,
                            data:{
                                    ...prev.data,
                                    ...{
                                    social_status:{
                                        ...social_status,
                                        followers_qnt: 
                                        !!current_result.isFollowing
                                        ? social_status?.followers_qnt+1
                                        : social_status?.followers_qnt-1
                                    }
                                }
                            }
                        }} as ProfileViewState)
                    : prev
                })
            },
            onCatch(error) {
                console.log(error)
            },
        })

    }

    useEffect(()=>{

        setProfileViewState({
            data:null,
            isFollowing:null,
            isSameUser:null
        })
        
    },[pathname])

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
        !!profileViewState.data
        &&
        <>
      <div className="profileImageContainer">
                <img src={profileViewState.data.image} alt={profileViewState.data.username+"s image"} />
      </div>
      <div className="socialInfoContainer">
            <DataFetcher 
            noDataMessage
            data={{
                type:'object',
                value:profileViewState.data,
                title:"Informação",
                word_gender:'f'
            }}
            isLoading={!!profileQueryState.isLoading}
            >
            {
            
            <>
            <div className="usernameContainer">
                <TitleHeader
                title={profileViewState.data.username}
                />
                <div className="actionsContainer">
                    <button 
                    className="profileActionButton"
                    onClick={()=>{
                        return !profileViewState.isSameUser
                        ? onFollow()
                        : ()=>{}
                    }}
                    >
                        {
                            profileViewState.isSameUser
                            ? "Editar Perfil"
                            : 
                            profileViewState.isFollowing
                            ? "Seguindo"
                            : "Seguir"
                        }
                    </button>
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
                            !!profileViewState.data
                            ?
                            (social_info.type === 'post_qnt'
                            ? profileViewState.data.social_status.post_qnt
                            : 
                            social_info.type === 'followers_qnt'
                            ? profileViewState.data.social_status.followers_qnt
                            :
                            social_info.type === 'following_qnt'
                            ? profileViewState.data.social_status.following_qnt
                            : 0)
                            : 0
                        }
                        />
                    )
                }
            </div>
            </>
            } 
        </DataFetcher>
        </div>
        </>
        }
    </div>
  )
}

export default ProfileView
