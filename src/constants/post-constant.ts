import type { PostListType } from "../types/post-type"

const post_list_filter:{
    title:string,
    type:PostListType
}[] = [
    {
        title:"Recentes",
        type:'all'
    },
    {
        title:'Seguindo',
        type:'following'
    }
]

export {
    post_list_filter
}