import { useState } from "react";
import DataLoader from "../data/DataLoader";
import useHandleLike from "../../hooks/useHandleLike";
import type { TableLikeType } from "../../types/like-type";

const LikeAction = ({type,isLiked,quantity,id}:{type:TableLikeType,isLiked:boolean,quantity:number,id:string}) => {

    const onSetLikeColor = (isLiked:boolean)=>{
        return !!isLiked
        ? "red"
        : "gainsboro"
    }
    
    const {onPostLike,likeQueryState} = useHandleLike()
    const [likeQuantity,setLikeQuantity] = useState<number>(quantity);
    const [likeColor,setLikeColor] = useState(onSetLikeColor(isLiked));

    return (
    <div className="likeContainer"
    onClick={()=>{
        onPostLike(type,id,{
            onThen(result) {
                const current_result = result.response.data as {
                    like_qnt:number,
                    isLiked:boolean
                }
                setLikeQuantity(current_result.like_qnt)
                setLikeColor(onSetLikeColor(current_result.isLiked))
            },
            onCatch(error) {
                console.log(error)
            }
        })
    }}
    >
        <DataLoader
        isLoading={!!likeQueryState.isLoading}
        >
        <svg 
        width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24
            3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28
            18.6 15.36 13.45 20.04L12 21.35Z" fill={likeColor}/>
        </svg>
        </DataLoader>
        <span>
            {likeQuantity}
        </span>
    </div>
  )
}

export default LikeAction
