import axios, { AxiosError, type AxiosResponse } from "axios";
import type { HttpClientType, HttpDataType } from "../types/http-type";

class AxiosHttpClientAdapter implements HttpClientType{

    async request(data:HttpDataType){

        let axiosResponse:AxiosResponse;

        try{
            axiosResponse = await axios.request({
                url:data.url,
                method:data.method,
                data:data.body,
                withCredentials:!!data.withCredentials
            })
        }
        catch(error){
            console.error(error)
            const axiosError = error as AxiosError<{message:string}>;
            throw new Error(axiosError.response?.data.message);
        }
        

        return {
            message:axiosResponse.data,
            status:axiosResponse.status
        }
    };

}

const AxiosHttpClientFactory = new AxiosHttpClientAdapter();

export{ 
    AxiosHttpClientAdapter,
    AxiosHttpClientFactory
}