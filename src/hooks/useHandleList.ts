import { useEffect, useReducer } from "react"
import type { ListDataHookType } from "../types/lits-type"

interface ListStateType<T> {
    data:{
        value:T[],
        liked:T[] | null,
        remaining:boolean | null
    },
    filter:{
        dataType:'following'|'recent',
        limit:number,
        page:number
    }
}

 type ListActionType<T> = 
{
    type:"data",
    value:{
        value:T[],
        liked:T[] | null,
        remaining:boolean | null
    }
}
|
{
    type:"filter",
    value:{
        dataType:'following'|'recent',
        limit:number,
        page:number
    }
}
|
{
    type:"reset",
    value:{
      data:{
      value:[],
      remaining:true,
      liked:null
    },
    filter:{
      dataType:"recent",
      limit:5 | number,
      page:1 | number
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
      value:[],
      remaining:true,
      liked:null
    },
    filter:{
      dataType:"recent",
      limit:!!config.limit ? config.limit : 5,
      page:!!config.page ? config.page : 1
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

  const handleListScroll = ()=>{

        if(!!references.listContainerRef && references.listContainerRef.current){
          console.log("remain",!!listState.data.remaining)
          references.listContainerRef.current.scrollTop + references.listContainerRef.current.clientHeight >= references.listContainerRef.current.scrollHeight - 1
        ?
        (()=>{
            setListState({
            type:"filter",
            value:{
              limit:listState.filter.limit,
              page:listState.filter.page++,
              dataType:"recent"
            }
            })
        })()
        :
        (()=>{
          console.error(listState.data)
        })()
        }
      }

  useEffect(()=>{
    console.log("page",listState.filter.page)
  },[listState.filter.page])


    useEffect(()=>{
      !!(listState.data.remaining)
      &&
      (()=>{
        console.log("QUERY")
        functions.query()
      })()

    },[listState.filter.page,identifier,listState.data.remaining])

    useEffect(()=>{

      console.log("state",listState.data)

    },[listState])

    useEffect(()=>{

      setListState({
        type:"reset",
        value:{
          data:{
            liked:null,
            remaining:true,
            value:[]
          },
          filter:{
            dataType:"recent",
            limit:!!config.limit ? config.limit : 5,
            page:!!config.page ? config.page : 1
          }
        }
      })
    },[identifier])

    useEffect(()=>{

    !!(config.mode === 'manual' && !!references.listExpansionContainerRef)
    &&
    (()=>{
        if(!!references.listExpansionContainerRef && references.listExpansionContainerRef.current){
          references.listExpansionContainerRef.current.addEventListener('click',()=>{
            !!(listState.data.remaining)
            &&
            (()=>{
                setListState({
                type:"filter",
                value:{
                  limit:listState.filter.limit,
                  page:listState.filter.page++,
                  dataType:"recent"
                }
                })
            })()
          })
        }
    })()

    

    !!(config.mode === 'automatic' && !!references.listContainerRef)
    &&
    (()=>{
      references.listContainerRef.current?.addEventListener('scrollend',
        !!listState.data.remaining
        ? handleListScroll
        : ()=>console.log("NAO")
      )
    })()

      return ()=>{
        if(!!references.listContainerRef && references.listContainerRef.current){
          references.listContainerRef.current.removeEventListener('scrollend',handleListScroll)
        }
      }

    },[listState.data.remaining,references.listContainerRef])

    return {
        listState,
        setListState
    }

}

export default useHandleList