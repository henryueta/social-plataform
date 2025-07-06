import useHandlePath from "../../hooks/useHandlePath";
import { useEffect, useState } from "react";
import useHandleAuth from "../../hooks/useHandleAuth";

const Private = ({children}:{children:React.ReactElement}) => {

  const {currentAuthContext,authQueryState} = useHandleAuth();
 const {onTransition} = useHandlePath();
 const [isAllow,setIsAllow] = useState<boolean  | null>(null);

  useEffect(()=>{
    
    (authQueryState.isLoading !== null
    &&
    !authQueryState.isLoading)
    &&
    currentAuthContext.isAuth !== null
    &&
    setIsAllow(currentAuthContext.isAuth)


  },[currentAuthContext.isAuth,authQueryState.isLoading])

  useEffect(()=>{
    isAllow !== null
    &&
    (()=>{
      !isAllow
    &&
    onTransition("/auth/login",true)
    })()

  },[isAllow])


  return children
}

export default Private
