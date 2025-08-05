import type { UserViewStatusType } from "../types/user-type"

const storage_profile_access = "https://dpjzdzhdhqgackpxojdi.supabase.co/storage/v1/object/public/social-plataform-storage/profile/default" 

const profile_image_select = [
    storage_profile_access+"/big/cube/cubo.webp",
    storage_profile_access+"/big/octahedron/octaedro.webp",
    storage_profile_access+"/big/pyramid/piramide.webp",
    storage_profile_access+"/big/star/star.webp",
    storage_profile_access+"/big/dodecahedron/dodecaedro.webp",
]

const profile_image_type = [
    {
        type:'cube',
        image:profile_image_select[0]
    },
    {
        type:'octahedron',
        image:profile_image_select[1]
    },
    {
        type:'pyramid',
        image:profile_image_select[2]
    },
    {
        type:'star',
        image:profile_image_select[3]
    },
    {
        type:'dodecahedron',
        image:profile_image_select[4]
    }
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
    profile_image_select,
    profile_image_type
}