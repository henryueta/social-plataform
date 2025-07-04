import type { ModelType } from "./model_type"

interface FormComponentProps {
    model:ModelType,
    submit:{
        url:string,
        onAction?:(data:any)=>void
    },
    submitButtonTitle:string
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