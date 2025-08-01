import { useParams } from "react-router-dom"
import Contact from "../../components/visual/Contact";
import useHandlePath from "../../hooks/useHandlePath";


const MessagePage = () => {

    const {type} = useParams();
    const {onTransition} = useHandlePath();

  return (
    <section className="messagePageSection">
        <div className="messageContainer">
            <h1>
                {
                    type === 'recovery'
                    &&
                    "Se este e-mail estiver registrado, você receberá um link para redefinir sua senha em instantes."
                }
            </h1>
        </div>
        <div className="actionsContainer">
            {
                type === 'recovery'
                &&
                <button 
                type="button"
                className="unfilled_button"
                onClick={()=>{
                    onTransition("/auth/login")
                }}
                >
                    Fazer Login
                </button>
            }
        </div>
        <Contact/>
    </section>
  )
}

export default MessagePage
