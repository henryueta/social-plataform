
interface UserCardComponentProps{
    username:string,
    image:string
}

interface UserCardStateType {
    user:UserCardComponentProps | null,
    following:UserCardComponentProps[] | null
}

type UserCardActionType = 
{
    type:"user",
    value:UserCardComponentProps
}
|
{
    type:"following",
    value:UserCardComponentProps[]
}

export type {
    UserCardComponentProps,
    UserCardStateType,
    UserCardActionType
}