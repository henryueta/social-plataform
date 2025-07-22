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

    useEffect(()=>{

        setAuthQueryState(queryState)

    },[queryState])

    useEffect(()=>{

        console.log(currentAuthContext.isAuth)

    },[currentAuthContext.isAuth])

    useEffect(()=>{

        onCheckout()

    },[])
    
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

      const onCheckout = ()=>{

             onQuery({
            method:"get",
            url:api_endpoints.auth.checkout,
            cancelToken:AxiosHttpClientFactory.createCancelToken(),
            withCredentials:true
            },
            {
             onThen() {
                currentAuthContext.setIsAuth(true)
             },
             onCatch(error) {
                 currentAuthContext.setIsAuth(false)
                 console.log("checkout_error",error)
             },
            })
        }

    return {
        currentAuthContext,
        onCheckout,
        onLogout,
        authQueryState
    }

}

export default useHandleAuth