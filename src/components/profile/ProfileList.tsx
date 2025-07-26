import { useEffect, useReducer, useRef } from "react"
import TitleHeader from "../TitleHeader"
import ProfileCard from "./ProfileCard"
import type { ProfileCardActionType, ProfileCardComponentProps, ProfileCardStateType } from "../../types/user-type"
import useHandleProfile from "../../hooks/useHandleProfile"
import useHandleList from "../../hooks/useHandleList"
import DataFetcher from "../data/DataFetcher"
import useHandlePath from "../../hooks/useHandlePath"
import Rewind from "../Rewind"

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

const ProfileList = ({type,username,isForPage,search,redirect}
  :{
    type:'followers'|'following'|'search'|'like',
    username?:string,
    search?:string,
    isForPage?:boolean,
    redirect?:boolean
  }) => {

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
      const {onTransition} = useHandlePath();

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
    <div 
    className={"profileListContainer "
    +(
      isForPage
      &&
      " page"
    )} 
    ref={profileListRef}>
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
        
        <div
         className="profileSocialListContainer"
        // style={{
        //   marginTop:(type === 'search'
        //   ? "6rem"
        //   : "")
        // }}
         >
            {
              (isForPage && type !== 'search')
              &&
              <Rewind/>
            }
            {
              type !== 'search'
              &&
              <TitleHeader
              title={
              !!username
              ? !!(type === 'followers')
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
                  listState.data.value.map((following,following_index)=>
                    <ProfileCard
                    key={following_index}
                    userData={{
                      image:following.image,
                    username:following.username,
                    namertag:following.namertag
                    }}
                    />
                  )
                }
              </DataFetcher>
              {
                
                !!redirect
                &&
                !!listState.data.value.length
                &&
                <div className="redirectListContainer">
                  <button 
                  className="unfilled_button"
                  onClick={()=>{
                    onTransition("/profiles/"
                      +(!!profileListState.user
                        ? profileListState.user.username
                        : ""
                      )
                      +"/following")
                  }}
                  >
                    Ver todos
                  </button>
                </div>
              }
            </div>
        </div>
    </div>
  )
}

export default ProfileList
