
interface DialogStructureProps {

    isOpen:boolean,
    title:string,
    message:string,
    onConfirm:(()=>void) | null,
    onCancel:(()=>void) | null,
    onFinally:(()=>void) | null

}


export type {
    DialogStructureProps
}