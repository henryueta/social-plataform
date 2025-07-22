import { useEffect, useState } from "react";
import { profile_social_status } from "../../constants/profile-constant";
import useHandleProfile from "../../hooks/useHandleProfile"
import CountView from "../CountView"
import TitleHeader from "../TitleHeader"
import type { ProfileViewState } from "../../types/user-type";
import DataFetcher from "../data/DataFetcher";
import useHandlePath from "../../hooks/useHandlePath";
import Load from "../Load";
import useHandleAuth from "../../hooks/useHandleAuth";
import useHandleDialog from "../../hooks/useHandleDialog";


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
            username:username
        },{
            onThen(result) {
                console.log(result)
                setProfileViewState({
                    data:{
                        image:result.response.data.user.image,
                        username:result.response.data.user.username,
                        namertag:result.response.data.user.namertag,
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
        })

    },[username])

    const {onTransition} = useHandlePath()
    const {onLogout} = useHandleAuth();
    const {showDialog} = useHandleDialog();

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
            <div className="socialIndentifierContainer">
                <TitleHeader
                title={profileViewState.data.username}
                />
                <div 
                className="namertagContainer"
                style={{
                    color:
                    profileViewState.data.namertag === 'cube'
                    ? "deepskyblue"
                    : 
                    profileViewState.data.namertag === 'pyramid'
                    ? "orangered"
                    : 
                    profileViewState.data.namertag === 'star'
                    ? 'greenyellow'
                    :
                    profileViewState.data.namertag === 'dodecahedron'
                    ? 'red'
                    :
                    profileViewState.data.namertag === 'octahedron'
                    ? 'gray'
                    : 'black'
                }}
                >
                    {"( "+profileViewState.data.namertag+" )"}
                </div>  
            </div>
            <div className="activityContainer">
                {
                    !!profileViewState.data
                    &&
                    profile_social_status.map((social_info)=>
                        <CountView
                        onClick={()=>{
                            social_info.type !== 'post_qnt'
                            &&
                            onTransition(
                                '/profiles/'
                                +username+"/"
                                +(
                                    social_info.type === 'followers_qnt'
                                    ? 'followers'
                                    : 'following'
                                )
                            )
                        }}
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
            <div className="actionsContainer">
                    <button 
                    className={
                        profileViewState.isSameUser
                        ? "filled_button"
                        : profileViewState.isFollowing
                            ? "filled_button"
                            : "unfilled_button"
                    }
                    onClick={()=>{
                        return !profileViewState.isSameUser
                        ? onFollow()
                        : ()=>{}
                    }}
                    >
                    <Load
                    isLoading={!!profileQueryState.isLoading}
                    />
                        {
                            profileViewState.isSameUser
                            ? "Editar Perfil"
                            : 
                            profileViewState.isFollowing
                            ? "Seguindo"
                            : "Seguir"
                        }
                    </button>
                    {
                        profileViewState.isSameUser
                        &&
                        <button 
                        className="filled_button"
                        onClick={()=>{
                            showDialog({
                                message:"Deseja fazer logout?",
                                onConfirm() {
                                    onLogout()
                                },
                                onCancel:null,
                                onFinally:null,
                            })
                        }}
                        >
                            Logout
                        </button>
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
