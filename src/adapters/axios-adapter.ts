import axios, { AxiosError, type AxiosResponse, type CancelToken } from "axios";
import type { HttpClientType, HttpDataType } from "../types/http-type";

class AxiosHttpClientAdapter implements HttpClientType{

    createCancelToken(){
        const source = axios.CancelToken.source();
        return source.token
    }
    async request(data:HttpDataType){
        
        let axiosResponse:AxiosResponse;
        const formData = new FormData()
        
        !!data.body
        &&
        Object.entries(data.body as object).forEach(([key,value])=>{
            console.log(key,value)
            formData.append(key,value)
        })

        try{
            formData.forEach((item,index)=>{
                console.log(index,item)
            })
            
            axiosResponse = await axios.request({
                url:data.url,
                method:data.method,
                data:formData,
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                cancelToken:data.cancelToken,
                withCredentials:!!data.withCredentials
            })
            console.log(axiosResponse)
            
        }
        catch(error){
            console.error(error)
            const axiosError = error as AxiosError<{message:string}>;
            throw new Error(axiosError.response?.data.message);
        }
        

        return {
            response:axiosResponse.data,
            status:axiosResponse.status
        }
    };

}

const AxiosHttpClientFactory = new AxiosHttpClientAdapter();

export{ 
    AxiosHttpClientAdapter,
    AxiosHttpClientFactory
}