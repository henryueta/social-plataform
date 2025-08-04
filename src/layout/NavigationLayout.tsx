import DialogMessage from "../components/message/DialogMessage"
import LockWall from "../components/ui/LockWall"
import PathObserver from "../components/navigation/PathObserver"

const NavigationLayout = ({children}:{children:React.ReactElement}) => {
  
  return (
    <>
      <DialogMessage/>
      <LockWall/>
      <PathObserver/>
        {children}
    </>
  )
}

export default NavigationLayout
