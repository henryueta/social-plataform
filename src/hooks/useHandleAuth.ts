import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import api_endpoints from "../config/api";
import useHandleQuery from "./useHandleQuery";
import type { QueryStateType, QueryTreatmentType } from "../types/query-type";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import useHandlePath from "./useHandlePath";

const useHandleAuth = ({verifyAuth,sendEmail}:{verifyAuth:boolean,sendEmail:boolean})=>{

    const currentAuthContext = useContext(AuthContext);
    const {onQuery,queryState} = useHandleQuery();
    const [authQueryState,setAuthQueryState] = useState<QueryStateType>(queryState);
    const {onTransition} = useHandlePath();
    const [emailForCheckout,setEmailForCheckout] = useState("");
    const {treatmentProvider} = useHandleQuery();

    useEffect(()=>{

        verifyAuth
        &&
        setAuthQueryState(queryState)

    },[queryState])

    useEffect(()=>{

        console.log(currentAuthContext.isAuth)

    },[currentAuthContext.isAuth])

    useEffect(()=>{
        console.log(currentAuthContext.isChecked)
    },[currentAuthContext.isChecked])

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
      useEffect(()=>{
        verifyAuth
        &&
        onCheckout("get");
    },[])    

      const onCheckout = (method:'get'|'post',code?:string)=>{
            
             onQuery({
            method:method,
            url:api_endpoints.auth.checkout+"?sendEmail="+sendEmail,
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
                method === 'get'
                && (()=>{
                    currentAuthContext.setIsAuth(true)
                })()
                    setEmailForCheckout(currentResult.email)
                    currentAuthContext.setIsChecked(currentResult.is_checked)
             },
             onCatch(error) {
                 console.log("checkout_error",error)
                method === 'get'
                &&
                (()=>{
                    currentAuthContext.setIsAuth(false)
                })()
             },
            })
        }

        const onForgot = (method:'post'|'get',params:{
            email?:string,
            token?:string
        },treatment?:QueryTreatmentType)=>{

            onQuery({
                method:method,
                url:api_endpoints.auth.forgot+(
                    method ===  'get'
                    ? "?token="+params.token
                    : ""
                ),
                cancelToken:AxiosHttpClientFactory.createCancelToken(),
                withCredentials:true,
                body:
                    method === 'post'
                    ? {
                    email:params.email
                    }
                    : {}
            },treatmentProvider(treatment))

        }

    return {
        currentAuthContext,
        onCheckout,
        onLogout,
        onForgot,
        authQueryState,
        emailForCheckout
    }

}

export default useHandleAuth