import { AuthProvider } from "./AuthContext"
import { DialogProvider } from "./DialogContext"
import { ScreenProvider } from "./ScreenContext"


const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <DialogProvider>
      <ScreenProvider>
        <AuthProvider>
              {children}
        </AuthProvider>
      </ScreenProvider>
    </DialogProvider>
  )
}

export default AppProvider
