import type { UserViewStatusType } from "../types/user-type"



const profile_social_status:{
    title:string,
    type:UserViewStatusType
}[] = [
    {   
        title:"Publicações",
        type:"post_qnt"
    },
    {
        title:"Seguidores",
        type:"followers_qnt"
    },
    {
        title:"Seguindo",
        type:"following_qnt"
    }
]

export {
    profile_social_status
}