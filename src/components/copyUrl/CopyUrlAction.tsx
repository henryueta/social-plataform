import { useState } from "react"
import link_icon from "../../assets/icons/link_icon.png"
import Load from "../ui/Load";



const CopyUrlAction = ({url,hasIcon}:{url:string,hasIcon:boolean}) => {

  const [isCopyng,setIsCopyng] = useState(false);

  const onCopyUrl = ()=>{
    setIsCopyng(true)
  navigator.clipboard.writeText(url)
  .then(()=>{
    
  })
  .catch((error)=>{
    console.log(error)
  })
  .finally(()=>{
    setIsCopyng(false)
  })

} 

  return (
    <div className="copyUrlContainer">
        <button onClick={onCopyUrl}>
          <Load
          isLoading={isCopyng}
          />
            {
              !isCopyng
              &&
              !!hasIcon
              ?<img style={{
              width:"18px"
            }} src={link_icon} alt="share_icon" />
              : <span>Copiar URL</span>
            }
        </button>
    </div>
  )
}

export default CopyUrlAction
