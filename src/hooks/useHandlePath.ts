import { useLocation, useNavigate,matchPath } from "react-router-dom"

const useHandlePath = ()=>{
        const onNavigate = useNavigate();
        const {pathname} = useLocation();

    const onRewind = ()=>{
        return onNavigate(-1)
    }

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
        onRewind,
        onMatch,
        pathname
    }

}

export default useHandlePath