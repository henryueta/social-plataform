import type { ModelType } from "./model_type"
import type { QueryTreatmentType } from "./query-type"

interface FormComponentProps {
    model:ModelType,
    submit:{
        url:string,
        onAction?:(data:any)=>void
    },
    submitButtonTitle:string,
    errorView?:boolean,
    treatment?:QueryTreatmentType
}

interface FormItemType {

    id:string,
    tag:"textarea"|"input"|"select"
    type?:"file"|"text"|"checkbox"|"email"|"password",
    title:string,
    registerId:string

}

export type{ 
    FormItemType,
    FormComponentProps
}