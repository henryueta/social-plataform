import type { UserCardComponentProps } from "../types/user-type"

const UserCard = ({username,image}:UserCardComponentProps) => {
  return (
    <article className="profileCardArticle">
        <div className="profileImageContainer">
            <img src={image} alt={username+"s image"} />
        </div>
        <div className="profileUsernameContainer">
            {
                username
            }
        </div>
    </article>
  )
}

export default UserCard
