import { useEffect, useReducer, useRef } from "react"
import TitleHeader from "../TitleHeader"
import ProfileCard from "./ProfileCard"
import type { ProfileCardActionType, ProfileCardComponentProps, ProfileCardStateType } from "../../types/user-type"
import useHandleProfile from "../../hooks/useHandleProfile"
import useHandleList from "../../hooks/useHandleList"
import DataFetcher from "../data/DataFetcher"

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

const ProfileList = ({type,username,search}:{type:'followers'|'following'|'search',username?:string,search?:string}) => {

      const [profileListState,setProfileListState] = 
      useReducer(handleProfileListState,initialProfileListState);
      const {onGetUser,profileQueryState} = useHandleProfile();

      const getUserList = ()=>{
        
        onGetUser({
          mode:'group',
          type:type,
          hasImage:true,
        },{
          limit:8,
          page:1,
          username:username,
          search:search
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
        identifier:
        !!username
        ? username
        : search
        ,
        references:{
        }
      });


  return (
    <div className="profileListContainer" ref={profileListRef}>
      {
        !username
        &&
        type !== "search"
        &&
        <TitleHeader
        title="Sua conta"
        />

        }
        {
          !username
          &&
          type !== 'search'
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
        
        <div className="profileSocialListContainer">
            {
              type !== 'search'
              &&
              <TitleHeader
              title={
              !!username
              ? !!(type === 'following')
                ? "Seguidores de "+username
                : username+ " está seguindo"
              : "Você está seguindo"
            }
            />
            }
            <div className="profileSocialList">

              <DataFetcher 
              data={{
                type:"array",
                title:"Usuário",
                value:listState.data.value,
                word_gender:"m"
              }}
              isLoading={!!profileQueryState.isLoading}
              noDataMessage={false}
              >
                {
                  !!listState.data.value.length
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
              </DataFetcher>


            </div>
        </div>
    </div>
  )
}

export default ProfileList
