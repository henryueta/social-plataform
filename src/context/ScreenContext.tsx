import { createContext, useContext, useEffect, useState } from "react"

const ScreenContext = createContext({} as {isMobile:boolean})

const ScreenProvider = ({children}:{children:React.ReactNode})=>{

    const [isMobile,setIsMobile] = useState(false);

    const onCheckScreen = ()=>{
        return setIsMobile(window.innerWidth < 1024)
    }

    useEffect(()=>{
        
        onCheckScreen();
        window.addEventListener('resize',onCheckScreen)

        return (()=>{
            window.removeEventListener('resize',onCheckScreen)
        })

    },[])

    return (
        <ScreenContext.Provider value={{isMobile}}>
            {children}
        </ScreenContext.Provider>
    )

}

const useHandleScreen = ()=>{
    const context = useContext(ScreenContext)
    return context
}

export {
    ScreenContext,
    ScreenProvider,
    useHandleScreen
}