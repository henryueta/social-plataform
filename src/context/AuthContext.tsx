import { createContext, useContext, useEffect, useState } from "react"
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import api_endpoints from "../config/api";
import useHandleQuery from "../hooks/useHandleQuery";

interface AuthProps {

    isAuth:boolean | null

}

const AuthContext = createContext({} as AuthProps);

const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const [isAuth,setIsAuth] = useState<boolean | null>(null);
    const {onQuery} = useHandleQuery();


    useEffect(()=>{

        (async()=>{

             onQuery({
            method:"get",
            url:api_endpoints.auth.checkout,
            withCredentials:true
            })

        })()

        

    },[])


  return (
    <AuthContext.Provider value={{isAuth}}>
        {
            children
        }
    </AuthContext.Provider>
  )
}

const useHandleAuth = ()=>{
    const context = useContext(AuthContext);
    return context
}

export {
    AuthContext,
    AuthProvider,
    useHandleAuth
}
