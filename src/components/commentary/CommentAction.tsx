import useHandlePath from "../../hooks/useHandlePath"

const CommentAction = ({quantity,id}:{quantity:number,id:string}) => {

  const {onTransition,onMatch,pathname} = useHandlePath();

  return (
    <div className="commentContainer"
    onClick={()=>{
      !onMatch("/post/view/"+id,pathname)
      && onTransition("/post/view/"+id)
    }}
    >
      <img src="https://img.icons8.com/?size=100&id=rtz2obYzAaeZ&format=png&color=000000" alt="" />
        <span>
            {quantity}
        </span>
    </div>
  )
}

export default CommentAction
