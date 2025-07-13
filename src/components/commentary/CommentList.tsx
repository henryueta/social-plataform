import { useEffect, useRef } from "react";
import useHandleComment from "../../hooks/useHandleComment"
import CommentCard from "./CommentCard"
import useHandleList from "../../hooks/useHandleList";
import type { CommentCardComponentProps } from "../../types/commentary-type";
import DataFetcher from "../data/DataFetcher";
import Load from "../Load";
import "../../styles/commentary.css"

const CommentList = (
  {table_id,type,listDataContainerRef,mode,pushElement}
  :{table_id:string,
    type:'post'|'commentary',
    listDataContainerRef?:React.RefObject<HTMLDivElement | null>,
    mode:'automatic'|'manual',
    pushElement:CommentCardComponentProps | null
}
) => {

  const commentaryListDataRef = useRef<HTMLDivElement>(null);
  const commentaryListExpansionRef = useRef<HTMLButtonElement>(null) 



  const onQueryCommentaryList = ()=>{
    onGetCommentaryList(type,table_id,listState.filter.limit,{
      onThen(result) {
        const current_result = result.response.data;
        setListState({
          type:"data",
          value:{
            remaining:current_result.commentary_list_count_remaining,
            value:current_result.commentary_list,
            liked:current_result.commentary_list.filter((commentary:CommentCardComponentProps)=>{
                return current_result.liked_commentary_list.includes(commentary.commentary_id)
            })
          }
        })
      },
      onCatch(error) {
        console.log(error)
      },
    })
  }

  

  const {onGetCommentaryList,commentQueryState} = useHandleComment();
  const {setListState,listState} = useHandleList<CommentCardComponentProps>({
    config:{
      limit:2,
      page:1,
      mode:mode
    },
    identifier:table_id,
    functions:{
      query:onQueryCommentaryList
    },
    references:{
      listContainerRef:!listDataContainerRef
      ?
      commentaryListDataRef
      : listDataContainerRef,
      listExpansionContainerRef:commentaryListExpansionRef
    }
  });
  

  useEffect(()=>{

    !!(!!pushElement
    &&
    !!listState.data.value)
    &&
    setListState({
      type:'data',
      value:{...listState.data,value:(()=>{
        const currentList = listState.data.value;
        currentList?.unshift(pushElement)
        return currentList
      })()}
    })
  },[pushElement])

  return (
    <div className="commentaryListContainer"
    ref={
      !listDataContainerRef
      ?
      commentaryListDataRef
      : null
      }>

          <DataFetcher
            data={{
            type:'array',
            value:listState.data.value as object[],
            title:'Comentário',
            word_gender:"m"
            }}
            isLoading={!!commentQueryState.isLoading}
          >
            {
            !!listState.data.value
              &&
              listState.data.value.map((commentary,index)=>
              <CommentCard
              key={index+Date.now()}
              commentaryData={commentary}
              isLiked={!!(listState.data.liked?.includes(commentary))}
              />
              )
            }
          </DataFetcher>
            {
              mode === 'automatic'
              ? <div className="loadListContainer">
                <Load
                isLoading={!!commentQueryState.isLoading}
                />
              </div>
              : 
              !!listState.data.remaining
              ? <button ref={commentaryListExpansionRef}>
                  Mostrar mais respostas
                </button>
              : <></>
            }
  </div>
  )
}

export default CommentList
