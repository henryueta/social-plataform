import NavBar from "../components/navigation/NavBar"
import "../styles/layout/main-layout.css"

const MainLayout = ({children}:{children:React.ReactElement}) => {
  return (
    <>
        <NavBar/>
        <main className="socialMainLayout">
            {children}
        </main>
    </>
  )
}

export default MainLayout
