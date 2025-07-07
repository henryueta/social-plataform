import TitleHeader from "../../components/TitleHeader"
import Form from "../../components/Form"
import "../../styles/post.css"
import post_model from "../../models/post-model"
import api_endpoints from "../../config/api"
import SocialLayout from "../../layout/SocialLayout"


const PublishPage = () => {
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
