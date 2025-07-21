import TitleHeader from "../../components/TitleHeader"
import Form from "../../components/Form"
import "../../styles/publish.css"
import post_model from "../../models/post-model"
import api_endpoints from "../../config/api"
import SocialLayout from "../../layout/SocialLayout"
import useHandlePath from "../../hooks/useHandlePath"
import { useEffect, useState } from "react"
import useHandleProfile from "../../hooks/useHandleProfile"
import type { ProfileCardComponentProps } from "../../types/user-type"
import ProfileCard from "../../components/profile/ProfileCard"


const PublishPage = () => {
  const {onTransition} = useHandlePath();
  const {onGetUser} = useHandleProfile();
  const [userProfileCard,setUserProfileCard] = useState<null | ProfileCardComponentProps>(null);

  useEffect(()=>{
    onGetUser({
          mode:'single',
          type:'small',
          hasImage:true
        },{
          username:""
        },{
          onThen(result) {
            console.log(result)
            setUserProfileCard(result.response.data.user)
          },
          onCatch(error) {
            console.log(error)
          },
        })
  },[])

  return (
    <SocialLayout>
      
      <div className="publishContainer">
        {
        !!userProfileCard
        &&
        <>
          <TitleHeader
          title="Escreva suas ideias"
          />
          <section className="formSection">
            
              <ProfileCard
              noRedirect
              userData={userProfileCard}
              />
            
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
          </>
        }
      </div>
    </SocialLayout>
  )
}

export default PublishPage
