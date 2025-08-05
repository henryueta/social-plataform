import { useEffect, useRef, useState } from "react";
import useHandleComment from "../../hooks/useHandleComment"
import useHandleList from "../../hooks/useHandleList";
import type { CommentCardComponentProps } from "../../types/commentary-type";
import DataFetcher from "../data/DataFetcher";
import Load from "../ui/Load";
import "../../styles/social/commentary.css"
import CommentCard from "./CommentCard";

const CommentList = (
  {table_id,type,externalReference,mode,pushElement}
  :{table_id:string,
    type:'post'|'commentary'|'response',
    externalReference?:{
      ref:React.RefObject<HTMLDivElement | null>,
      functionRef:(action:()=>void)=>void
    }
    mode:'automatic'|'manual',
    pushElement:CommentCardComponentProps | null,
  }
) => {

  const commentaryListDataRef = useRef<HTMLDivElement>(null);
  const commentaryListExpansionRef = useRef<HTMLButtonElement>(null) 
  const [deleteElement,setDeleteElement] = useState<string|null>(null);

  const onQueryCommentaryList = ()=>{
    onGetCommentaryList(!!(type === 'response' || type === 'commentary')
      ? 'commentary'
      : 'post',{
      onThen(result) {
        const current_result = result.response.data;


        setListState({
          type:"data",
          value:{
            remaining:current_result.commentary_list_count_remaining,
            value:
            (!!current_result.commentary_list.length 
            && 
            !!listState.data.value.length 
            ? [...listState.data.value,...current_result.commentary_list]
            : [...current_result.commentary_list])
            ,
            liked:current_result.commentary_list.filter((commentary:CommentCardComponentProps)=>{
                return current_result.liked_commentary_list.includes(commentary.commentary_id)
            })
          }
        })
      },
      onCatch(error) {
        console.log(error)
      },
    },{
      table_id:table_id,
      limit:listState.filter.limit,
      page:listState.filter.page
    })
  }

  

  const {onGetCommentaryList,commentQueryState} = useHandleComment();
  const {setListState,listState,handleListView} = useHandleList<CommentCardComponentProps>({
    config:{
      limit:2,
      page:1,
      mode:mode
    },
    identifier:!!deleteElement ? deleteElement  : table_id,
    functions:{
      query:onQueryCommentaryList
    },
    references:{
      listContainerRef:externalReference && !externalReference.ref
      ?
      commentaryListDataRef
      : externalReference && externalReference.ref,
    }
  });
  
    useEffect(()=>{
      externalReference
      &&
    externalReference.functionRef(()=>{
      handleListView()
    })

  },[])

  useEffect(()=>{

    !!(deleteElement
      &&
      listState.data.value)
    &&
    setListState({
      type:'data',
      value:{...listState.data,value:(()=>{
        const currentList = listState.data.value;
        const updatedList = currentList.filter((commentary)=>{
          return commentary.commentary_id !== deleteElement
        })
        return updatedList
      })()}
    })

  },[deleteElement])

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
      externalReference
      &&
      !externalReference.ref
      ?
      commentaryListDataRef
      : null
      }>
          <DataFetcher
          noDataMessage={
            !(type !== 'response')
          }
            data={{
            type:'array',
            value:listState.data.value as object[],
            title:'Comentário',
            word_gender:"m"
            }}
            isLoading={!!commentQueryState.isLoading}
          > 

          
            {
              
            (!!listState.data.value)
              &&
              listState.data.value
              .map((commentary)=>
              <CommentCard
              onDelete={(commentary)=>{
                setDeleteElement(commentary)
              }}
              key={commentary.commentary_id}
              type={!!(type === 'post' || type === 'commentary')
                ? 'commentary'
                : 'response'
              }
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
              !!commentQueryState.isLoading
              ? <Load
                isLoading={!!commentQueryState.isLoading}
                />
              :
              (!!listState.data.remaining && !listState.data.value)
              && <button ref={commentaryListExpansionRef}>
                  Mostrar mais respostas
                </button>
            }
  </div>
  )
}

export default CommentList