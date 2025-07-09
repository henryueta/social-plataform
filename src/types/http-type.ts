import type { CancelToken } from "axios"

interface HttpDataType{
    method:'post'|'get'|'put'|'delete',
    url:string,
    body?:object,
    withCredentials?:boolean,
    cancelToken:CancelToken
}

interface HttpResponseType {
    status:number,
    response:string
}

interface HttpClientType{
    request:(data:HttpDataType)=>Promise<HttpResponseType>,
    createCancelToken:()=>CancelToken
}

export type{
    HttpClientType,
    HttpDataType,
    HttpResponseType
}