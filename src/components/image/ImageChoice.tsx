import { useEffect, useState } from "react";

const ImageChoice = ({imageList,choicedIndex,onChoice}:
    {imageList:string[],choicedIndex?:number,onChoice:(image:string)=>void}) => {

    const [currentChoice,setCurrentChoice] = useState(choicedIndex ? choicedIndex : 0);

        useEffect(()=>{

            onChoice(imageList[currentChoice])
            console.log(currentChoice)
        },[currentChoice])

  return (
    <div className="imageChoiceContainer">
        <div className="previousImage">
            <button
            onClick={()=>{
                setCurrentChoice((prev)=>{
                    return prev > 0
                    ? (prev-1)
                    : (imageList.length-1)
                })
            }}
            >
            prev
            </button>
        </div>
        <img src={imageList[currentChoice]} alt="currentChoice_image" />
        <div className="nextImage">
            <button
            onClick={()=>{
                setCurrentChoice((prev)=>{
                    return prev < (imageList.length-1)
                    ? (prev+1)
                    : 0
                })
            }}
            >
            next
            </button>
        </div>
    </div>
  )
}

export default ImageChoice
