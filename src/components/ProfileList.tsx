import { useEffect, useReducer } from "react"
import { AxiosHttpClientFactory } from "../adapters/axios-adapter"
import TitleHeader from "./TitleHeader"
import UserCard from "./UserCard"
import api_endpoints from "../config/api"
import type { UserCardActionType, UserCardStateType } from "../types/user-type"

  const initialProfileListState:UserCardStateType = {
      user:null,
      following:null
  }

  const handleProfileListState = (state:UserCardStateType,action:UserCardActionType)=>{
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


      useEffect(()=>{
    
        AxiosHttpClientFactory.request({
          url:api_endpoints.user.getSingle+"?type=small",
          method:"get",
          withCredentials:true
        })
        .then((result)=>{
          setProfileListState({
            type:"user",
            value:result.response.data
          })
        })
        .catch((error)=>{
          console.log(error)
        })
        
        AxiosHttpClientFactory.request({
          url:api_endpoints.user.getGroup+"?type=following",
          method:"get",
          withCredentials:true
        })
        .then((result)=>{
          console.log(result)
          setProfileListState({
            type:"following",
            value:result.response.data
          })
        })
        .catch((error)=>{
          console.log(error)
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
          <UserCard
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
                    <UserCard
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
