import type { UserViewStatusType } from "../types/user-type"

const profile_image_select = [
    "https://dpjzdzhdhqgackpxojdi.supabase.co/storage/v1/object/public/social-plataform-storage/profile/default/big/cube/cubo.webp",
    "https://dpjzdzhdhqgackpxojdi.supabase.co/storage/v1/object/public/social-plataform-storage/profile/default/big/octahedron/octaedro.webp"
]

const profile_social_status:{
    title:string,
    type:UserViewStatusType
}[] = [
    {   
        title:"Posts",
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
    profile_social_status,
    profile_image_select
}