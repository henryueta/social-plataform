import TitleHeader from "./TitleHeader"
import UserCard from "./UserCard"

const ProfileList = () => {
  return (
    <div className="profileListContainer">
        <UserCard/>
        <div className="friendListContainer">
            <TitleHeader
            title="Seus amigos"
            />
            <div className="friendList">
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
            </div>
        </div>
    </div>
  )
}

export default ProfileList
