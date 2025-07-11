import { useEffect, useReducer } from "react"
import type { ListDataHookType } from "../types/lits-type"

interface ListStateType<T> {
    data:{
        value:T[] | null,
        liked:T[] | null,
        remaining:number | null
    },
    filter:{
        dataType:'following'|'recent',
        limit:number,
    }
}

 type ListActionType<T> = 
{
    type:"data",
    value:{
        value:T[] | null,
        liked:T[] | null,
        remaining:number | null
    }
}
|
{
    type:"filter",
    value:{
        dataType:'following'|'recent',
        limit:number,
    }
}
|
{
    type:"reset",
    value:{
      data:{
      value:null,
      remaining:null,
      liked:null
    },
    filter:{
      dataType:"recent",
      limit:5 | number
    }
    }
}

const useHandleList = <C>({
    identifier,
    config,
    functions,
    references
}:ListDataHookType)=>{

    const initialListState:ListStateType<C> = {
    data:{
      value:null,
      remaining:null,
      liked:null
    },
    filter:{
      dataType:"recent",
      limit:!!config.limit ? config.limit : 5
    }
}

const handleListState = (state:ListStateType<C>,action:ListActionType<C>)=>{
  switch (action.type) {
    case "data":
      return {...state,data:action.value}
    case "filter":
      return {...state,filter:action.value}
    case "reset":
      return {...state,...{
        data:action.value.data,
        filter:action.value.filter
      }}
    default:
      return state
  }
}

    const [listState,setListState] = useReducer(handleListState,initialListState);



    useEffect(()=>{
      !!(listState.data.remaining === null || !!(listState.data.remaining > 0))
      &&
      (()=>{
        functions.query()
      })()

    },[listState.filter.limit,identifier,listState.data.remaining])

    useEffect(()=>{

      setListState({
        type:"reset",
        value:{
          data:{
            liked:null,
            remaining:null,
            value:null
          },
          filter:{
            dataType:"recent",
            limit:!!config.limit ? config.limit : 5
          }
        }
      })

    },[identifier])

    useEffect(()=>{

    !!(config.mode === 'automatic' && !!references.listContainerRef)
    &&
    (()=>{

      const handleListScroll = ()=>{
        
        if(!!references.listContainerRef && references.listContainerRef.current){
          references.listContainerRef.current.scrollTop + references.listContainerRef.current.clientHeight >= references.listContainerRef.current.scrollHeight - 1
        &&
        !!(listState.data.remaining === null || !!(listState.data.remaining > 0))
        &&
        setListState({
          type:"filter",
          value:{
            limit:listState.filter.limit+=(!!config.limit ? config.limit : 5),
            dataType:"recent"
          }
        })
        }
      }

      references.listContainerRef.current?.addEventListener('scrollend',handleListScroll)
      
      return ()=>{
        if(!!references.listContainerRef && references.listContainerRef.current){
          references.listContainerRef.current.removeEventListener('scroll',handleListScroll)
        }
      }
    })()

    },[references.listContainerRef])

    return {
        listState,
        setListState
    }

}

export default useHandleList