
interface QueryStateType {

    isLoading:boolean,
    hasError:boolean,
    hasSuccess:boolean

}

type QueryActionType = 
{
    type:"loading",
    value:boolean
}
|
{
    type:"success",
    value:boolean
}
|
{
    type:"error",
    value:boolean
}

interface QueryTreatmentType {

    onThen?:(result:any)=>void,
    onCatch?:(error:unknown)=>void,
    onFinally?:()=>void

}

export type {
    QueryStateType,
    QueryActionType,
    QueryTreatmentType
}