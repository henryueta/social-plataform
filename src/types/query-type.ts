
interface QueryStateType {

    isLoading:boolean | null,
    hasError:boolean | null,
    hasSuccess:boolean | null

}

type QueryActionType = 
{
    type:"loading",
    value:boolean | null
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