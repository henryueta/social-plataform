import useHandleDialog from "../hooks/useHandleDialog"
import "../styles/dialog-message.css"
import TitleHeader from "./TitleHeader";

const DialogMessage = () => {

    const {dialogStructure} = useHandleDialog();


  return (
    <>
        {
            dialogStructure.isOpen
            &&
            <dialog className="dialogMessage">
                <TitleHeader
                title={dialogStructure.title}
                subtitle={dialogStructure.message}
                />
                <div className="dialogMessageActionsContainer">
                {
                    dialogStructure.type === 'confirmation'
                    ?
                    <>
                    <button
                    className="filled_button"
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
                    className="unfilled_button"
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
                </>
                :
                <>
                    <button 
                    className="unfilled_button"
                    onClick={()=>{
                        !!dialogStructure.onFinally
                        &&
                        dialogStructure.onFinally()
                    }}
                    >
                        Fechar
                    </button>
                </>
                }
            </div>
        </dialog>
        }
    </>
  )
}

export default DialogMessage
