import { useEffect } from "react";
import useHandlePath from "../hooks/useHandlePath"

const PathObserver = () => {

    const {pathname} = useHandlePath();

    useEffect(()=>{

        window.scrollTo(0,0)

    },[pathname])


  return null
}

export default PathObserver
