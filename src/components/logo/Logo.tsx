import logo from "../../assets/imgs/small_social_logo.webp"
import useHandlePath from "../../hooks/useHandlePath"


const Logo = () => {

  const {onTransition} = useHandlePath();

  return <img 
  style={{
    cursor:"pointer"
  }}
  src={logo} 
  alt="logo_image" 
  onClick={()=>{
    onTransition("/")
  }}/>
}

export default Logo
