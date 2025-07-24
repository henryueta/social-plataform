
interface DialogStructureProps {

    isOpen:boolean,
    title:string,
    message:string,
    type:'warn'|'confirmation',
    onConfirm:(()=>void) | null,
    onCancel:(()=>void) | null,
    onFinally:(()=>void) | null

}


export type {
    DialogStructureProps
}