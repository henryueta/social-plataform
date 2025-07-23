import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import api_endpoints from "../config/api";
import useHandleQuery from "./useHandleQuery";
import type { QueryStateType } from "../types/query-type";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import useHandlePath from "./useHandlePath";

const useHandleAuth = ()=>{

    const currentAuthContext = useContext(AuthContext);
    const {onQuery,queryState} = useHandleQuery();
    const [authQueryState,setAuthQueryState] = useState<QueryStateType>(queryState);
    const {onTransition} = useHandlePath();
    const [isChecked,setIsChecked] = useState<null | boolean>(null);

    useEffect(()=>{

        setAuthQueryState(queryState)

    },[queryState])

    useEffect(()=>{

        console.log(currentAuthContext.isAuth)

    },[currentAuthContext.isAuth])

    useEffect(()=>{
        console.log(isChecked)
    },[isChecked])

    const onLogout = ()=>{

        onQuery({
            method:"get",
            url:api_endpoints.auth.logout,
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
        },
        {
             onThen() {
                currentAuthContext.setIsAuth(false)
                onTransition("/")
             },
             onCatch(error) {
                console.log("logout_error",error)
             },
        })

    }

      const onCheckout = (method:'get'|'post',code?:string)=>{
            
             onQuery({
            method:method,
            url:api_endpoints.auth.checkout,
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true,
            body:
                method === 'post'
                ? {code:code}
                : {}
            },
            {
             onThen(result) {
                const currentResult = result.response.data
                console.log(result)
                method === 'get'
                &&
                (()=>{
                    setIsChecked(currentResult.is_checked)
                    currentAuthContext.setIsAuth(true)
                    alert("AAA")
                })()
             },
             onCatch(error) {
                 console.log("checkout_error",error)
                method === 'post'
                &&
                (()=>{
                    currentAuthContext.setIsAuth(false)
                })()
             },
            })
        }

    return {
        currentAuthContext,
        onCheckout,
        onLogout,
        authQueryState,
        isChecked
    }

}

export default useHandleAuth