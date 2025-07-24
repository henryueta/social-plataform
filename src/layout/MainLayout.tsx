import DialogMessage from "../components/DialogMessage"
import LockWall from "../components/LockWall"
import NavBar from "../components/NavBar"
import "../styles/layout/main-layout.css"

const MainLayout = ({children}:{children:React.ReactElement}) => {
  return (
    <>
        <NavBar/>
        <main className="mainLayout">
            {children}
        </main>
    </>
  )
}

export default MainLayout
