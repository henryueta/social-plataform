import useHandleDialog from "../hooks/useHandleDialog"
import "../styles/dialog-message.css"

const LockWall = ({isLock}:{isLock?:boolean}) => {

    const {dialogStructure} = useHandleDialog();
    const lock_condition = 
    (!!isLock
    ? isLock
    : dialogStructure.isOpen)

  return lock_condition && <div className="lockWallContainer"></div>
}

export default LockWall
