import { useState } from "react";
import TitleHeader from "../../components/visual/TitleHeader";
import "../../styles/auth/auth-forgotten.css"
import useHandlePath from "../../hooks/useHandlePath";
import useHandleAuth from "../../hooks/useHandleAuth";
import useHandleDialog from "../../hooks/useHandleDialog";
import Contact from "../../components/visual/Contact";
import Load from "../../components/ui/Load";
import Logo from "../../components/logo/Logo";

const AuthForgotten = () => {

    const [emailForSend,setEmailForSend] = useState('');
    const {showDialog} = useHandleDialog();
    const {onTransition} = useHandlePath()
    const {onForgot,authQueryState} = useHandleAuth({verifyAuth:false,sendEmail:false});

  return (
    <section className="authForgottenPageSection">
        <div className="logoContainer">
            <Logo/>
        </div>
        <div className="authForgottenContainer">
            <TitleHeader
            title="Esqueceu sua senha?"
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
                    onForgot("post",{
                        email:emailForSend
                    },{
                        onThen() {
                            
                            onTransition("/message/recovery")

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
                    <Load
                    isLoading={!!authQueryState.isLoading}
                    />
                    Confirmar
                </button>
            </div>
        </div>
        <Contact/>
    </section>
  )
}

export default AuthForgotten
