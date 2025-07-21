
type CommentCardComponentProps = 
Record<
'commentary_id'|
'post_id'|
'thread_id'|
'for_respond_id'|
'creation_date_interval'|
'description'|
'user_small_photo'|
'username'|
'namertag',
string
>
&
Record<'like_qnt'|'response_quantity',number>

interface CommentPostType  {
    description:string,
    post_id:string,
    thread_id?:string,
    for_respond_id?:string
} 

interface CommentListComponentProps {

    commentaryList:CommentCardComponentProps[],
    likedCommentaryList:string[],
    commentaryListRemaining:number

}

export type {
    CommentCardComponentProps,
    CommentListComponentProps,
    CommentPostType
}