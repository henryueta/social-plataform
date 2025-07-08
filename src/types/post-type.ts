
// interface PostCardComponentProps {

//     commentary_qnt:number
//     like_qnt:number
//     creation_date:string
//     description:string
//     post_id:string
//     user_id:string
//     user_small_photo:string
//     username: string
// }

interface PostListStateType {
    data:{
        value:PostCardComponentProps[] | null,
        liked:PostCardComponentProps[] | null,
        remaining:number | null
    },
    filter:{
        dataType:'following'|'recent',
        limit:number,
    }

}

type PostListActionType = 
{
    type:"data",
    value:{
        value:PostCardComponentProps[] | null,
        liked:PostCardComponentProps[] | null,
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

type PostCardComponentProps = 
Record<'commentary_qnt'|'like_qnt',number>
&
Record<
'creation_date_interval'|
'description'|
'user_small_photo'|
'username'|
// 'user_id'|
'post_id',string>

export type {
    PostCardComponentProps,
    PostListStateType,
    PostListActionType
}