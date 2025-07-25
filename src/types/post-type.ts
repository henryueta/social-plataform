
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

type PostListType = 'all'|'following';

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
      limit:number
    }
    }
}

type PostQueryPutType = 
{
    mode:'social_status',
    type:'like'|'commentary'
}
|
{
    mode:'structure',
    type:''
}

type PostQueryGetType = 
{
    mode:'single',
    type:'especific'
}
|
{
    mode:'group',
    type:'all'|'especific'|'following'|'search'
}

type PostCardComponentProps = 
Record<'commentary_qnt'|'like_qnt',number>
&
Record<
'creation_date_interval'|
'description'|
'user_small_photo'|
'username'|
'namertag'|
'image'|
'post_id',string>



export type {
    PostCardComponentProps,
    PostListStateType,
    PostListActionType,
    PostListType,
    PostQueryGetType,
    PostQueryPutType
}