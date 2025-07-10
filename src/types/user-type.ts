
interface ProfileCardComponentProps{
    username:string,
    image:string
}

interface ProfileCardStateType {
    user:ProfileCardComponentProps | null,
    following:ProfileCardComponentProps[] | null
}

type UserViewStatusType = 'post_qnt'|'followers_qnt'|'following_qnt'

interface UserViewType {
    username:string,
    image:string,
    social_status:{
        post_qnt:number,
        followers_qnt:number,
        following_qnt:number
    }
}

type ProfileCardActionType = 
{
    type:"user",
    value:ProfileCardComponentProps
}
|
{
    type:"following",
    value:ProfileCardComponentProps[]
}

type UserQueryGetType = 
{
    mode:'single',
    hasImage:boolean,
    type:'small'|'social'|'important'
}
|
{
    mode:'group',
    hasImage:boolean,
    type:'following'
}

interface ProfileViewState {
    data:UserViewType | null,
    isFollowing:boolean | null,
    isSameUser:boolean | null
}

export type {
    ProfileCardComponentProps,
    ProfileCardStateType,
    ProfileCardActionType,
    UserQueryGetType,
    ProfileViewState,
    UserViewType,
    UserViewStatusType
}