import {z} from "zod"
import {ZodSchemaFactory} from "../adapters/zod_schema-adapter"
import { type FormItemType } from "../types/form-type"
import type { ModelType } from "../types/model_type";

const post_schema = ZodSchemaFactory.draw({
    
    description:z.string().min(1,{
        message:"Campo descrição inválido"
    })
})


const post_form:FormItemType[] = [
    {
        title:"O que você quer compartilhar hoje?",
        id:"description_id",
        registerId:"description",
        tag:"textarea",
        type:"text"
    }
]

const post_model:ModelType = {
    form:post_form,
    schema:post_schema
}

export default post_model