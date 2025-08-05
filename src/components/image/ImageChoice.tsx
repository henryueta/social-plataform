import { useEffect, useState } from "react";
import "../../styles/image/image.css"

const ImageChoice = ({imageList,choicedIndex,onChoice}:
    {imageList:string[],choicedIndex?:number,onChoice:(image:string)=>void}) => {

    const [currentChoice,setCurrentChoice] = useState(choicedIndex ? choicedIndex : 0);

        useEffect(()=>{

            onChoice(imageList[currentChoice])
        },[currentChoice])

  return (
    <div className="imageChoiceContainer">
        <div id="previousImage" className="changeImageContainer">
            <button
            onClick={()=>{
                setCurrentChoice((prev)=>{
                    return prev > 0
                    ? (prev-1)
                    : (imageList.length-1)
                })
            }}
            >
            <div 
            className="changeImageLabel"
            id="previousImageLabel"
            >
                {">"}
            </div>
            </button>
        </div>
        <img src={imageList[currentChoice]} alt="currentChoice_image" />
        <div id="nextImage" className="changeImageContainer">
            <button
            onClick={()=>{
                setCurrentChoice((prev)=>{
                    return prev < (imageList.length-1)
                    ? (prev+1)
                    : 0
                })
            }}
            >
            <div
            className="changeImageLabel"
            id="nextImageLabel"
            >
                {">"}
            </div>
            </button>
        </div>
    </div>
  )
}

export default ImageChoice
