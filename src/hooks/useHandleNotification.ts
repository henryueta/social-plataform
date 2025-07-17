import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import api_endpoints from "../config/api";
import type { QueryTreatmentType } from "../types/query-type"
import useHandleQuery from "./useHandleQuery"

const useHandleNotification = ()=>{

    const {onQuery,treatmentProvider} = useHandleQuery();

    const onGetNotificationList = (treatment:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.notification.get,
            method:"get",
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    const onReadNotification = (treatment:QueryTreatmentType)=>{

        onQuery({
            url:api_endpoints.notification.post,
            method:"post",
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },treatmentProvider(treatment))

    }

    return {
        onGetNotificationList,
        onReadNotification
    }

}

export default useHandleNotification