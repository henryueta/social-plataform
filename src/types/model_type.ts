import type { z } from "zod";
import type { FormItemType } from "./form-type";

interface ModelType {
    schema:z.ZodObject<z.ZodRawShape> | z.ZodEffects<z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny>>,
    form:FormItemType[]
}

export type {
    ModelType
}