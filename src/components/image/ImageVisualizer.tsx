import { useEffect, useState } from "react"
import LockWall from "../ui/LockWall";

const ImageVisualizer = ({onView,event,operations}:
    {
        onView:(value:string)=>void,
        event:React.ChangeEvent<HTMLInputElement>,
        operations:{
            onClose:()=>void,
            onDelete:()=>void
        }
    }) => {

    const [imageValue,setImageValue] = useState<null | string | ArrayBuffer>(null);
    const [imageName,setImageName] = useState<null | string>(null);

    useEffect(()=>{

        const currentFile = 
        (event.target.files
        ? event.target.files[0]
        : null)

        if(currentFile){
            const imageReader = new FileReader();

            setImageName(currentFile.name)

            imageReader.onloadend = ()=>{
                setImageValue(imageReader.result)
            }
            imageReader.readAsDataURL(currentFile)
        }

    },[event])

    useEffect(()=>{
            
        imageName
        &&
        onView(imageName)

    },[imageName])


  return (
    <>
    <LockWall
    isLock={true}
    />
    <div className="imageVisualizerContainer">
        
        <>
        {
            (imageValue)
            &&
            <div className="imageContainer">
                <img src={imageValue as string} alt="post_image_view" />
                <div className="actionsContainer">
                    <button
                    className="filled_button"
                    onClick={()=>{
                        operations.onDelete()
                    }}
                    >
                    Excluir
                    </button>
                    <button
                    className="unfilled_button"
                    onClick={()=>operations.onClose()}
                    >Fechar
                    </button>
                </div>
            </div>
        }
            
        </>
    </div>
    </>
  )
}

export default ImageVisualizer
