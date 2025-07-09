import { useEffect, useReducer } from "react"
import TitleHeader from "../TitleHeader"
import ProfileCard from "./ProfileCard"
import type { ProfileCardActionType, ProfileCardStateType } from "../../types/user-type"
import useHandleProfile from "../../hooks/useHandleProfile"

  const initialProfileListState:ProfileCardStateType = {
      user:null,
      following:null
  }

  const handleProfileListState = (state:ProfileCardStateType,action:ProfileCardActionType)=>{
    switch (action.type) {
      case "user":
        return {...state,user:action.value}
      case "following":
        return {...state,following:action.value}
      default:
        return state
    }
  } 

const ProfileList = () => {

      const [profileListState,setProfileListState] = 
      useReducer(handleProfileListState,initialProfileListState);
      const {onGetUser} = useHandleProfile();

      useEffect(()=>{
        
        onGetUser({
          mode:'single',
          type:'small',
          hasImage:true
        },{
          onThen(result) {
            console.log(result)
            setProfileListState({
            type:"user",
            value:result.response.data.user
            })
          },
          onCatch(error) {
            console.log(error)
          },
        })
        
        onGetUser({
          mode:'group',
          type:'following',
          hasImage:true,
        },{
          onThen(result) {
            console.log(result)
            setProfileListState({
            type:"following",
            value:result.response.data
            })
          },
          onCatch(error) {
            console.log(error)
          },
        })

      },[])

  return (
    <div className="profileListContainer">
      <TitleHeader
        title="Sua conta"
        />
        {
          !!profileListState.user
          &&
          <ProfileCard
          image={profileListState.user.image}
          username={profileListState.user.username}
        />
        }
        <div className="followingListContainer">
            <TitleHeader
            title="Você está seguindo"
            />
            <div className="followingList">
                {
                  !!profileListState.following
                  &&
                  profileListState.following.map((following)=>
                    <ProfileCard
                    image={following.image}
                    username={following.username}
                    />
                  )
                }
            </div>
        </div>
    </div>
  )
}

export default ProfileList
