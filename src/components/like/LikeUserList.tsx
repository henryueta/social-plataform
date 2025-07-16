import { useEffect, useRef } from "react"
import useHandleLike from "../../hooks/useHandleLike"
import useHandleList from "../../hooks/useHandleList";
import type { ProfileCardComponentProps } from "../../types/user-type";

const LikeUserList = ({post_id,hasImage}:{post_id:string,hasImage:boolean}) => {

  const {onGetUserLikeList} = useHandleLike();

  const onGetUserList = ()=>{

   return onGetUserLikeList(post_id,hasImage,{
      limit:listState.filter.limit,
      page:listState.filter.page
    },{
      onThen(result) {
        const current_result = result.response.data
        setListState({
          type:"data",
          value:{
            liked:current_result.like_following_list,
            remaining:current_result.like_list_count_remaining,
            value:current_result.like_user_list
          }
        })
        console.log(result)
      },
      onCatch(error) {
        console.log(error)
      },
    })

  }

  const likeUserListDataRef = useRef<HTMLDivElement>(null);
  const {listState,setListState} = useHandleList<ProfileCardComponentProps>({
    config:{
      limit:
      !!(hasImage)
      ? 10
      : 1,
      page:
      !!(hasImage)
      ? 1
      : 1,
      mode:'automatic'
    },
    functions:{
      query:onGetUserList
    },
    identifier:post_id,
    references:{
      listContainerRef:likeUserListDataRef
    }
  });

  useEffect(()=>{



  },[post_id])

  return (
    <div className="likeUserListContainer" ref={likeUserListDataRef}>

      {
        !!listState.data
        &&
        !!listState.data.value[0]
        &&
        (!!hasImage
        ? <></>
        : <span>
          Curtido por
          <b style={{
            cursor:"pointer"
          }}>{` ${listState.data.value[0].username} `}</b>
          {
            listState.data.value.length > 1
            &&
            <span>
             e
            <b style={{
              cursor:"pointer"
            }}>{` outras pessoas`}</b>
            </span>
          }
        </span>)
      }

    </div>
  )
}

export default LikeUserList
