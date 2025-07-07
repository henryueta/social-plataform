
const CountView = ({value,label}:{value:number,label:{
  type:"text"|"image"
  source:string
}}) => {
  return (
    <div className="countViewContainer">
      <div className="valueContainer">
          <span>{value}</span>
      </div>
      <div className="labelContainer">
          {
            label.type === 'text'
            ? <span>{label.source}</span>
            : <img src={label.source} alt={"countImage"} /> 
          }
      </div>
    </div>
  )
}

export default CountView
