import TitleHeader from "../../components/TitleHeader"
import Form from "../../components/Form"
import "../../styles/post.css"
import post_model from "../../models/post-model"
import api_endpoints from "../../config/api"
import SocialLayout from "../../layout/SocialLayout"
import useHandlePath from "../../hooks/useHandlePath"


const PublishPage = () => {
  const {onTransition} = useHandlePath();
  
  return (
    <SocialLayout>
      <div className="publishContainer">
          <TitleHeader
          title="Escreva suas ideias"
          />
          <section className="formSection">
            <Form
            errorView={false}
            model={post_model}
            submit={{
              url:api_endpoints.post.post,
            }}
            submitButtonTitle="Postar"
            treatment={{
              onThen(result) {
                console.log(result)
                onTransition("/posts/all")
              },
              onCatch(error) {
                console.log(error)
              },
            }}
            />
          </section>
      </div>
    </SocialLayout>
  )
}

export default PublishPage
