
const UserCard = () => {
  return (
    <article className="profileCardArticle">
        <div className="profileImageContainer">
            <img src="" alt="" />
        </div>
        <div className="profileUsernameContainer">
            {
                "guest_"+(Math.random()*10).toFixed(5).replace(".","")
            }
        </div>
    </article>
  )
}

export default UserCard
