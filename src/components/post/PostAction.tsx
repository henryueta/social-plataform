import { useEffect, useState } from "react"
import more_options_icon from "../../assets/icons/more_options_icon.png"
import useHandlePost from "../../hooks/useHandlePost";
import { post_action_list } from "../../constants/post-constant";
import CopyUrlAction from "../copyUrl/CopyUrlAction";
import useHandleDialog from "../../hooks/useHandleDialog";
import useHandlePath from "../../hooks/useHandlePath";

const PostAction = ({isSameUser,id,onSelectEdit}:{isSameUser:boolean,id?:string,onSelectEdit:()=>void}) => {

    const [optionsIsOpen,setOptionsIsOpen] = useState(false);
    const [actionType,setActionType] = useState<'put'|'delete' | null>(null);
    const {onDeletePost} = useHandlePost();
    const {showDialog} = useHandleDialog();
    const {onTransition} = useHandlePath();

    useEffect(()=>{

        actionType === 'delete'
        ? showDialog({
            title:"Excluir postagem?",
            message:"Tem certeza de que deseja excluir a postagem?",
            onCancel() {
            },
            onConfirm() {
                !!id
                &&
                onDeletePost(id,{
                    onThen() {
                        onTransition("/posts/all")
                    },  
                    onCatch(error) {
                        console.log(error)
                    },
                })
            },
            onFinally(){
                setActionType(null)
            }
        })
        : actionType === 'put'
        && (()=>{
            onSelectEdit()
            setActionType(null)
        })()

    },[actionType])

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
                            setOptionsIsOpen(false)
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
