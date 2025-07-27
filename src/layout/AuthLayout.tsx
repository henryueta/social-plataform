import FooterBar from "../components/navigation/FooterBar"
import "../styles/layout/auth-layout.css"

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        {children}
    <FooterBar/>
    </>
  )
}

export default AuthLayout
