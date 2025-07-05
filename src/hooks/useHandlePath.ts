import { useLocation, useNavigate } from "react-router-dom"

const useHandlePath = ()=>{
        const onNavigate = useNavigate();
        const {pathname} = useLocation();
    const onTransition = (path:string,replace?:boolean)=>{

        return onNavigate(path,{
            replace:!!replace
            ? replace
            : false
        })
    }

    return {
        onTransition,
        pathname
    }

}

export default useHandlePath