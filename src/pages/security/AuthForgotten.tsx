import { useState } from "react";
import TitleHeader from "../../components/TitleHeader";
import "../../styles/auth-forgotten.css"
import useHandlePath from "../../hooks/useHandlePath";
import useHandleAuth from "../../hooks/useHandleAuth";
import useHandleDialog from "../../hooks/useHandleDialog";

const AuthForgotten = () => {

    const [emailForSend,setEmailForSend] = useState('');
    const {showDialog} = useHandleDialog();
    const {onTransition} = useHandlePath()
    const {onForgot} = useHandleAuth();

  return (
    <section className="authForgottenPageSection">
        <div className="authForgottenContainer">
            <TitleHeader
            title="Recuperação de senha"
            subtitle="Escreva seu email para alterar a senha"
            />
            <div className="emailForSendContainer">
                <input 
                type="email" 
                placeholder="Email"
                onChange={(e)=>{
                    setEmailForSend(e.target.value)  
                }} 
                value={emailForSend}/>
            </div>
            <div className="forgottenActionsContainer">
                <button 
                onClick={()=>{
                    onTransition("/auth/login")
                }}
                className="filled_button">
                    Cancelar
                </button>
                <button 
                onClick={()=>{
                    !!(emailForSend.trim().length)
                    &&
                    onForgot(emailForSend,{
                        onThen(result) {
                            console.log("result",result)
                        },
                        onCatch(error){
                            const currentError = error as {message:string}
                            showDialog({
                                title:"Revise seus dados",
                                message:currentError.message,
                                type:"warn",
                                onConfirm:null,
                                onCancel:null,
                                onFinally:null
                            })
                        }
                    })
                }}
                className="unfilled_button">
                    Confirmar
                </button>
            </div>
        </div>
    </section>
  )
}

export default AuthForgotten
