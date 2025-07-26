import { useEffect, useState } from "react"
import Form from "../../components/Form"
import api_endpoints from "../../config/api"
import useHandleAuth from "../../hooks/useHandleAuth"
import recovery_model from "../../models/recovery-model"
import { useParams } from "react-router-dom"
import Load from "../../components/Load"
import TitleHeader from "../../components/TitleHeader"
import useHandlePath from "../../hooks/useHandlePath"

const AuthRecovery = () => {

    const {onForgot,authQueryState} = useHandleAuth({verifyAuth:false});
    const {token} = useParams();
    const [isDenied,setIsDenied] = useState(false);
    const {onTransition} = useHandlePath();

    useEffect(()=>{

        !!(token?.length)
        ? console.log("com valor")
        : console.log("vazio")

    },[token])

    useEffect(()=>{
        console.log(isDenied)
    },[isDenied])

    useEffect(()=>{

        onForgot("get",{
            token:token
        },{
            onThen() {
                setIsDenied(false)
            },
            onCatch(error) {
                console.log(error)
                setIsDenied(true)
            },
        })

    },[])

  return (
    <section className="authRecoveryPageSection">
        <div className="authRecoveryContainer">
            {
                !isDenied
                &&
                <TitleHeader
                title="Recuperação de senha"
                subtitle="Você solicitou um link para redefinir sua senha.
                Preencha o formulário e confime seus dados"
                />
            }
        {
            !!authQueryState.isLoading
            ? <Load
            isLoading={!!authQueryState.isLoading}
            />
            : !isDenied
            ? <section className="formSection">
                <Form
                method="put"
                model={recovery_model}
                errorView
                setPlacehorders
                submit={{
                    url:api_endpoints.auth.recovery+"?token="+token,
                }}
                submitButtonTitle="Confirmar"
                treatment={{
                    onThen() {
                        onTransition("/auth/login")
                    },
                    onCatch(error) {
                        console.log(error)
                    },
                }}
                />
            </section>
                : <div className="deniedRecoveryContainer">
                    <img src="" alt="" />
                    <p>Token inválido ou expirado.</p>
                </div>
        }
        </div>
    </section>
  )
}

export default AuthRecovery
