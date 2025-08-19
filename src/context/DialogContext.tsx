import { createContext, useState } from "react";
import type { DialogStructureProps } from "../types/dialog-type";
import Cookies from "js-cookie"


const DialogContext = createContext({} as {
    dialogStructure:DialogStructureProps,
    setDialogStructure:React.Dispatch<React.SetStateAction<DialogStructureProps>>,
    initialDialogStructureValue:DialogStructureProps,
    importantMessageIsRead:boolean,
    onReadImportantMessage:()=>void
})



const DialogProvider = ({children}:{children:React.ReactNode})=>{

        const initialDialogStructureValue = {
            isOpen:false,
            type:"confirmation" as "confirmation",
            title:"",
            message:"",
            onConfirm:null,
            onCancel:null,
            onFinally:null
        }

        const [importantMessageIsRead,setImportantMessageIsRead] = useState<boolean>(
            (()=>{
                const importantMessageCookie = (
                    !!Cookies.get("importantMessage")
                    ? JSON.parse(Cookies.get("importantMessage") as string).isRead
                    : false
                )
                return importantMessageCookie
            })()
        );
        const [dialogStructure,setDialogStructure] = useState<DialogStructureProps>(initialDialogStructureValue);

        const onReadImportantMessage = ()=>{
            Cookies.set("importantMessage",JSON.stringify({isRead:true}))
            setImportantMessageIsRead(true)
        }

    return (
        <DialogContext.Provider value={
            {
            dialogStructure,
            setDialogStructure,
            initialDialogStructureValue,
            importantMessageIsRead,
            onReadImportantMessage
            }
        }>
            {children}
        </DialogContext.Provider>
    )
}

export {
    DialogContext,
    DialogProvider
}