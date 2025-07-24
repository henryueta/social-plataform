import DialogMessage from "../components/DialogMessage"
import LockWall from "../components/LockWall"
import PathObserver from "../components/PathObserver"

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
