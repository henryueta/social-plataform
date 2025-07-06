import { useLocation, useNavigate,matchPath } from "react-router-dom"

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

    const onMatch = (pattern:string,pathname:string)=>{
            const match = matchPath(pattern,pathname)
            return match;
    }

    return {
        onTransition,
        onMatch,
        pathname
    }

}

export default useHandlePath