import { z } from "zod"
import {ZodSchemaFactory} from "../adapters/zod_schema-adapter"
import { type FormItemType } from "../types/form-type"
import type { ModelType } from "../types/model_type"

const user_schema = ZodSchemaFactory.draw({
    username:z.string().min(1,{
        message:"Campo username inválido"
    }),
    email:z.string().min(1,{
        message:"Campo email inválido"
    }),
    password:z.string().min(1,{
        message:"Campo senha inválido"
    })
})

const user_form:FormItemType[] = [
    {
        title:"Username",
        id:"username_id",
        registerId:"username",
        tag:"input",
        type:"text"
    },
    {
        title:"Email",
        id:"email_id",
        registerId:"email",
        tag:"input",
        type:"email"
    },
    {
        title:"Senha",
        id:"password_id",
        registerId:"password",
        tag:"input",
        type:"password"
    }
]

const user_model:ModelType = {
    form:user_form,
    schema:user_schema    
} 

export default user_model