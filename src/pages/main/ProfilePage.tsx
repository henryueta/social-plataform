import CountView from "../../components/CountView"
import PostList from "../../components/PostList"
import TitleHeader from "../../components/TitleHeader"
import SocialLayout from "../../layout/SocialLayout"
import "../../styles/profile.css"

const ProfilePage = () => {
  return (
    <SocialLayout>
      <div className="profilePageContainer">
        <div className="profileInfoContainer">
            <div className="profileImageContainer">
                <img src="" alt="" />
            </div>
            <div className="socialInfoContainer">
              <div className="usernameContainer">
                  <TitleHeader
                  title={"H3NRY"}
                  />
                  <div className="actionsContainer">
                    <button>Seguir</button>
                  </div>
              </div>
              <div className="activityContainer">
                  <CountView
                  value={12}
                  label={{
                    type:"text",
                    source:"Publicações"
                  }}
                  />
                  <CountView
                  value={12}
                  label={{
                    type:"text",
                    source:"Seguidores"
                  }}
                  />
                  <CountView
                  value={12}
                  label={{
                    type:"text",
                    source:"Seguindo"
                  }}
                  />
              </div>
            </div>
        </div>
            <PostList/>
      </div>
    </SocialLayout>
  )
}

export default ProfilePage
