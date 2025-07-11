import type React from "react"
import type { DataLabelType } from "./data-fetcher-type"

   

interface ListDataComponentProps {
    data:{
        identifier:string | undefined
    } & DataLabelType,
    config:{
        mode:'automatic'|'manual',
        limit:number
    },
    functions:{
        // map:(item:T,index:number)=>T[]
        query:()=>void
    },
    isLoading:boolean
}

type ListDataHookType = 
Omit<ListDataComponentProps,"data"|"isLoading">
& {
    identifier:string | undefined,
    references:{
        listContainerRef?:React.RefObject<HTMLDivElement | null>,
        listExpansionContainerRef?:React.RefObject<HTMLButtonElement | null>
    }

}




export type {
    ListDataComponentProps,
    ListDataHookType
}