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

const post_action_list  = [
    {
        title:"Editar",
        type:'put'
    },
    {
        title:'Excluir',
        type:'delete'
    }
]

export {
    post_list_filter,
    post_action_list
}