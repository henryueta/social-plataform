import {z} from "zod";

class ZodSchemaAdapter {

    draw(shape:z.ZodRawShape){
        const schema = z.object(shape)
        return schema
    }

}

const ZodSchemaFactory = new ZodSchemaAdapter();

export {
    ZodSchemaAdapter,
    ZodSchemaFactory
}
