import { useParams } from "react-router-dom"


const MessagePage = () => {

    const {type} = useParams();

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
    </section>
  )
}

export default MessagePage
