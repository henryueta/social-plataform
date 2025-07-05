import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import api_endpoints from "../config/api";
import useHandleQuery from "./useHandleQuery";
import type { QueryStateType } from "../types/query-type";

const useHandleAuth = ()=>{

    const currentAuthContext = useContext(AuthContext);
    const {onQuery,queryState} = useHandleQuery();
    const [authQueryState,setAuthQueryState] = useState<QueryStateType>(queryState);

    useEffect(()=>{

        setAuthQueryState(queryState)

    },[queryState])

    useEffect(()=>{

        console.log(currentAuthContext.isAuth)

    },[currentAuthContext.isAuth])

    useEffect(()=>{

        onCheckout()

    },[])

      const onCheckout = ()=>{

             onQuery({
            method:"get",
            url:api_endpoints.auth.checkout,
            withCredentials:true
            },
            {
             onThen() {
                currentAuthContext.setIsAuth(true)
             },
             onCatch(error) {
                console.log("NAO DEU",error)
                 currentAuthContext.setIsAuth(false)
             },
            })
        }

    return {
        currentAuthContext,
        onCheckout,
        authQueryState
    }

}

export default useHandleAuth