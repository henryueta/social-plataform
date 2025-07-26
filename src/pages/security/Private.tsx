import useHandlePath from "../../hooks/useHandlePath";
import { useEffect, useState } from "react";
import useHandleAuth from "../../hooks/useHandleAuth";
import Load from "../../components/Load";
import { Navigate } from "react-router-dom";

const Private = ({children}:{children:React.ReactElement}) => {

  const {currentAuthContext,authQueryState,onCheckout} = useHandleAuth({verifyAuth:true});
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
      null
    })()

  },[isAllow])



  return <>
    {
      !!authQueryState.isLoading
      ?
      <section className="loadAuthorizationSection">
        <Load
      isLoading={!!authQueryState.isLoading}
      />
      </section>
      : 
      !!(currentAuthContext.isAuth)
      && 
      ((currentAuthContext.isChecked)
      ? children
      : <Navigate to={"/checkout"}/>)
    }
    
  </>
}

export default Private
