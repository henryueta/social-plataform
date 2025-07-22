import useHandleDialog from "../hooks/useHandleDialog"
import "../styles/dialog-message.css"

const DialogMessage = () => {

    const {dialogStructure} = useHandleDialog();


  return (
    <>
        {
            dialogStructure.isOpen
            &&
            <dialog className="dialogMessage">
                {dialogStructure.message}
                <div className="dialogMessageActionsContainer">
                    <button
                    onClick={()=>{
                        !!dialogStructure.onCancel
                        &&
                        dialogStructure.onCancel()
                        
                        !!dialogStructure.onFinally
                        &&
                        dialogStructure.onFinally()
                    }}
                    >
                        Cancelar
                    </button>
                    <button
                    onClick={()=>{
                        !!dialogStructure.onConfirm
                        &&
                        dialogStructure.onConfirm()

                        !!dialogStructure.onFinally
                        &&
                        dialogStructure.onFinally()
                    }}
                    >
                        Confirmar
                    </button>
                </div>
            </dialog>
        }
    </>
  )
}

export default DialogMessage
