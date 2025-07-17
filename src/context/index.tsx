import { AuthProvider } from "./AuthContext"
import { ScreenProvider } from "./ScreenContext"


const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <ScreenProvider>
      <AuthProvider>
          {children}
      </AuthProvider>
    </ScreenProvider>
  )
}

export default AppProvider
