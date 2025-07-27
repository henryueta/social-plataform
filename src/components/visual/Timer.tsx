import { useEffect, useState } from "react";

const Timer = ({minutes,onEnd}:{minutes:number,onEnd:()=>void}) => {

const [currentSeconds,setCurrentSeconds] = useState(59);
const [currentMinutes,setCurrentMinutes] = useState(minutes-1);

useEffect(()=>{
    if (currentMinutes < 0) {
        return;
    }

    let timerChange = setInterval(()=>{
       if(currentSeconds === 0){
           if(currentMinutes === 0){
               clearInterval(timerChange);
               onEnd()
               return;
           }
           setCurrentMinutes((prev) => prev - 1);
           setCurrentSeconds(59);
       } else {
           setCurrentSeconds((prev) => prev - 1);
       }
    }, 1000);

    return () => {
        clearInterval(timerChange);
    }

},[currentMinutes, currentSeconds]);

  return (
    <span>
        <p>
        {
        ((currentMinutes < 10 ? ("0"+currentMinutes) : currentMinutes))
        +" : "+
        ((currentSeconds < 10) ? ("0"+currentSeconds) : currentSeconds)
        }
        </p>
    </span>
  )
}

export default Timer;