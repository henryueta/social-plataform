import { useEffect, useReducer, useRef } from "react"
import TitleHeader from "../visual/TitleHeader"
import ProfileCard from "./ProfileCard"
import type { ProfileCardActionType, ProfileCardComponentProps, ProfileCardStateType } from "../../types/user-type"
import useHandleProfile from "../../hooks/useHandleProfile"
import useHandleList from "../../hooks/useHandleList"
import DataFetcher from "../data/DataFetcher"
import useHandlePath from "../../hooks/useHandlePath"
import Rewind from "../navigation/Rewind"

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

const ProfileList = ({type,identifier,identifier_type,isForSearch,search,redirect}
  :{
    type:'followers'|'following'|'search'|'like',
    identifier?:string,
    identifier_type:string,
    search?:string,
    isForSearch?:boolean,
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
          username:(
            identifier_type === 'user'
            ? identifier
            : ""
          ),
          search:search,
          post_id:(
            identifier_type === 'post'
            ? identifier
            : ""
          )
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
        
        !(identifier_type == 'user' && identifier)
        &&
        type !== "search"
        &&
        type !== 'like'
        &&
        onGetUser({
          mode:'single',
          type:'small',
          hasImage:true
        },{
          username:""
        },{
          onThen(result) {
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
        !!identifier
        ? identifier
        : search,
        references:{
        }
      });

  return (
    <div 
    className={"profileListContainer "
    +(
      isForSearch
      &&
      " page"
    )} 
    ref={profileListRef}>
      {
        !(identifier_type === 'user' && identifier)
        &&
        type !== "search"
        &&
        type !== 'like'
        &&
        <TitleHeader
        title="Sua conta"
        />
      }
        {
          !(identifier_type === 'user' && identifier)
          &&
          type !== 'search'
          &&
          type !== "like"
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
        style={{
          marginTop:(type === 'search'
          ? "12rem"
          : "")
        }}
         >
            {
              (isForSearch && type !== 'search')
              &&
              <Rewind/>
            }
            {
              type !== 'search'
              &&
              <TitleHeader
              title={
              !!(identifier_type === 'user' && identifier)
              ? 
                !!(type === 'followers')
                ? "Seguidores de "+identifier
                : identifier+ " está seguindo"
              : 
                !!(identifier_type === 'post' && identifier)
                ? "Curtidas"
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
                      +"following/user/"
                      +(!!profileListState.user
                        ? profileListState.user.username
                        : ""
                      )
                    )
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
