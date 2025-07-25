import {z} from "zod"
import {ZodSchemaFactory} from "../adapters/zod_schema-adapter"
import { type FormItemType } from "../types/form-type"
import type { ModelType } from "../types/model_type";

const post_schema = ZodSchemaFactory.draw({
    
    description:z.string().min(1,{
        message:"Campo descrição inválido"
    }),
    image:z.custom<FileList>()
        .transform((file)=>file.length > 0 && file.item(0))
        .refine((file)=>!file || (!!file && file.size <= 420000000),{
            message:"Arquivo máximo suportado 500MB"
        })
        .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
            message: "Imagem inválida",
        }),
})


const post_form:FormItemType[] = [
    {
        title:"O que você quer compartilhar hoje?",
        id:"description_id",
        registerId:"description",
        tag:"textarea",
        type:"text"
    },
    {
        title:"Imagem",
        id:"image_id",
        registerId:"image",
        tag:"input",
        type:"file"
    }
]

const post_model:ModelType = {
    form:post_form,
    schema:post_schema
}

export default post_model