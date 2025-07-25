import { z } from "zod"
import {ZodSchemaFactory} from "../adapters/zod_schema-adapter"
import { type FormItemType } from "../types/form-type"
import type { ModelType } from "../types/model_type"


const recovery_schema = ZodSchemaFactory.draw({
    password:z.string().refine((val)=>val.length,{
        message:"Campo senha inválido"
    }),
    repeat_password:z.string().refine((val)=>val.length,{
        message:"Campo senha inválido"
    })
})

const recovery_form:FormItemType[] = [
    {
        id:"password_id",
        registerId:"password",
        tag:"input",
        title:"Nova senha",
        type:"password"
    },
    {
        id:"repeat_password_id",
        registerId:"repeat_password",
        tag:"input",
        title:"Confirme a nova senha",
        type:"password"
    }
]

const recovery_model:ModelType = {
    schema:recovery_schema,
    form:recovery_form
} 

export default recovery_model