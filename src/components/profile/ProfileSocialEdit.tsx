import { useEffect, useState } from "react"
import LockWall from "../LockWall"
import useHandleProfile from "../../hooks/useHandleProfile"
import Load from "../Load"
import ImageChoice from "../image/ImageChoice"
import { profile_image_select } from "../../constants/profile-constant"


const ProfileSocialEdit = ({username,editTreatment}:{username:string,editTreatment:{
    onCancel:()=>void,
    onEdit:(data?:{
        username?:string,
        image?:string
    })=>void,
}}) => {

    const {onGetUser,profileQueryState,onEditUser} = useHandleProfile();

    useEffect(()=>{
        onGetUser({
            hasImage:true,
            mode:'single',
            type:'small_large'
        },{
            username:username
        },{
            onThen(result) {
                setUsernameValue(result.response.data.user.username)
                setImageValue(result.response.data.user.image)
            },  
            onCatch(error) {
                console.log(error)
            },
        })
    },[username])

    const [usernameValue,setUsernameValue] = useState<string | null>(null);
    const [imageValue,setImageValue] = useState<string | null>(null);
    const [rejectMessage,setRejectMessage] = useState<string | null>(null);




  return (
    <>
        <LockWall isLock/>
        <section className="profileSocialEditSection">
            {
            !!(!!usernameValue && !!imageValue)
            ?
            <>
            <div className="imageSelectionContainer">
                <ImageChoice
                imageList={profile_image_select}
                choicedIndex={profile_image_select.indexOf(imageValue)}
                onChoice={(image)=>{
                    setImageValue(image)
                }}
                />
            </div>
            <div className="usernameContainer">
                <input 
                type="text"
                placeholder="Username"
                value={usernameValue}
                onChange={((e)=>{
                    setUsernameValue(e.target.value)
                })}
                />
            </div>
            <div className="editRejectMessageContainer">
                <p>{!!rejectMessage ? rejectMessage : ""}</p>
            </div>
            <div className="editActionsContainer">
                <button
                className="filled_button"
                onClick={()=>{
                    editTreatment.onCancel()
                }}
                >
                    Cancelar
                </button>
                <button
                onClick={()=>{
                    onEditUser({
                    image:imageValue,
                    username:usernameValue
                },{
                    onThen(result) {
                        console.log(result)
                        editTreatment.onEdit({
                        image:imageValue,
                        username:usernameValue
                    })
                    },
                    onCatch(error) {
                        const currentError = error as {message:string}
                        setRejectMessage(currentError.message)
                    },
                })
                }}
                className="unfilled_button"
                >
                    Editar
                </button>
            </div>
            </>
            :
            <Load
            isLoading={!!profileQueryState.isLoading}
            />
            }
        </section>
    </>
  )
}

export default ProfileSocialEdit
