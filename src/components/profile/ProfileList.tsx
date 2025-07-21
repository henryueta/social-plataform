import { useEffect, useReducer, useRef } from "react"
import TitleHeader from "../TitleHeader"
import ProfileCard from "./ProfileCard"
import type { ProfileCardActionType, ProfileCardComponentProps, ProfileCardStateType } from "../../types/user-type"
import useHandleProfile from "../../hooks/useHandleProfile"
import useHandleList from "../../hooks/useHandleList"

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

const ProfileList = ({type,username}:{type:'followers'|'following',username?:string}) => {

      const [profileListState,setProfileListState] = 
      useReducer(handleProfileListState,initialProfileListState);
      const {onGetUser} = useHandleProfile();

      const getUserList = ()=>{
        
        onGetUser({
          mode:'group',
          type:type,
          hasImage:true,
        },{
          limit:8,
          page:1,
          username:username
        },
          {
          onThen(result) {
            setListState({
              type:'data',
              value:{
                value:result.response.data.user_list_data,
                liked:[],
                remaining:result.response.data.user_list_count_remaining
              }
            })
          },
          onCatch(error) {
            console.log(error)
          },
        })
      }

      useEffect(()=>{
        
        onGetUser({
          mode:'single',
          type:'small',
          hasImage:true
        },{
          username:""
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


      },[])
      const profileListRef = useRef<HTMLDivElement>(null);

      const {listState,setListState} = useHandleList<ProfileCardComponentProps>({
        config:{
          limit:8,
          mode:"manual",
          page:1
        },
        functions:{
          query:getUserList
        },
        identifier:username,
        references:{
          
        }
      });


  return (
    <div className="profileListContainer" ref={profileListRef}>
      {
        !username
        &&
        <TitleHeader
        title="Sua conta"
        />

        }
        {
          !username
          &&
          !!profileListState.user
          &&
          <ProfileCard
          userData={{
            image:profileListState.user.image,
          username:profileListState.user.username,
          namertag:profileListState.user.namertag
          }}
        />
        }
        
        <div className="followingListContainer">
            <TitleHeader
            title={
              !!username
              ? !!(type === 'following')
                ? "Seguidores de "+username
                : username+ " está seguindo"
              : "Seus seguidores"
            }
            />
            <div className="followingList">
                
                {
                  !!listState.data.value
                  &&
                  listState.data.value.map((following)=>
                    <ProfileCard
                    userData={{
                      image:following.image,
                    username:following.username,
                    namertag:following.namertag
                    }}
                    />
                  )
                }
            </div>
        </div>
    </div>
  )
}

export default ProfileList
