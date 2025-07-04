import { useEffect } from "react";
import { useHandleAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Private = ({children}:{children:React.ReactElement}) => {

  const {isAuth} = useHandleAuth();
  const onNavigate = useNavigate();
  useEffect(()=>{

    !!isAuth
      ? onNavigate("/")
      : (()=>{
        onNavigate("/auth/login")
      })()

  },[]) 
  return (
    
      <></>
    
  )
}

export default Private
