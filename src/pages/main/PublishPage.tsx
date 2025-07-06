import ProfileList from "../../components/ProfileList"
import TitleHeader from "../../components/TitleHeader"
import Form from "../../components/Form"
import "../../styles/post.css"
import post_model from "../../models/post-model"


const PublishPage = () => {
  return (
    <section className="publishSection">
      <div className="publishContainer">
          <TitleHeader
          title="Escreva suas ideias"
          />
          <section className="formSection">
            <Form
            model={post_model}
            submit={{
              url:""
            }}
            submitButtonTitle="Postar"
            />
          </section>
      </div>
      <ProfileList/>
    </section>
  )
}

export default PublishPage
