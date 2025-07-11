
type CommentCardComponentProps = 
Record<
'commentary_id'|
'creation_date_interval'|
'description'|
'user_small_photo'|
'username',
string
>
&
Record<'like_qnt',number>



interface CommentListComponentProps {

    commentaryList:CommentCardComponentProps[],
    likedCommentaryList:string[],
    commentaryListRemaining:number

}

export type {
    CommentCardComponentProps,
    CommentListComponentProps
}