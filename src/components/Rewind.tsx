import useHandlePath from "../hooks/useHandlePath"

const Rewind = () => {

    const {onRewind} = useHandlePath();

  return (
    <div className="rewindContainer">
        <button 
        className="unfilled_button"
        onClick={()=>{
            onRewind()
        }}
        >
            Voltar
        </button>
    </div>
  )
}

export default Rewind
