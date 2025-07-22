
interface DialogStructureProps {

    isOpen:boolean,
    message:string,
    onConfirm:(()=>void) | null,
    onCancel:(()=>void) | null,
    onFinally:(()=>void) | null

}


export type {
    DialogStructureProps
}