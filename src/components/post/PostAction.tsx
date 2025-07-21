import { useState } from "react"
import more_options_icon from "../../assets/icons/more_options_icon.png"
import useHandlePost from "../../hooks/useHandlePost";
import { post_action_list } from "../../constants/post-constant";
import CopyUrlAction from "../copyUrl/CopyUrlAction";

const PostAction = ({isSameUser,id}:{isSameUser:boolean,id?:string}) => {

    const [optionsIsOpen,setOptionsIsOpen] = useState(false);
    const [actionType,setActionType] = useState<'put'|'delete' | null>(null);
    const {onDeletePost} = useHandlePost();



  return (
    <>
    <div className="postActionContainer">
        <button onClick={()=>{
            setOptionsIsOpen((prev)=>!prev)
        }}>
            <img src={more_options_icon} alt="more_options_icon" />
        </button>
        {
            optionsIsOpen
            &&
            <div className="postActionOptionsContainer">
                {   
                isSameUser
                && post_action_list.map((action)=>
                        <button onClick={()=>{
                            setActionType(action.type as 'put'|'delete')
                        }}>
                            {action.title}
                        </button>
                    )
                }
                <CopyUrlAction
                hasIcon={false}
                url={"/post/view/"+id}
                />
            </div>
        }
    </div>
    </>
  )
}

export default PostAction
