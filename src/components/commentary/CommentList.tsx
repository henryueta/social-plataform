import type { CommentCardComponentProps } from "../../types/commentary-type"
import CommentCard from "./CommentCard"

const CommentList = ({commentaryList}:{commentaryList:CommentCardComponentProps[]}) => {
  return (
    <div className="commentaryListContainer">
        {
            commentaryList.map((commentary)=>
                <CommentCard
                commentaryData={commentary}
                />
            )
        }
    </div>
  )
}

export default CommentList
