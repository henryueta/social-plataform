
interface HttpDataType{
    method:'post'|'get'|'put'|'delete',
    url:string,
    body?:object,
    withCredentials?:boolean
}

interface HttpResponseType {
    status:number,
    message:string
}

interface HttpClientType{
    request:(data:HttpDataType)=>Promise<HttpResponseType>
}

export type{
    HttpClientType,
    HttpDataType,
    HttpResponseType
}