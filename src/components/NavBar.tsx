import { Link } from "react-router-dom"
import { home_routers } from "../pages"
import "../styles/navbar.css"
import useHandlePath from "../hooks/useHandlePath"

const NavBar = () => {
    const {onMatch,pathname} = useHandlePath();
  return (
    <nav className="navBar">
        <div className="logoContainer">
            <h1>
                🌊 Seaddy
            </h1>
        </div>
        <ul>
        {
            home_routers.map((route)=>
            {
                const route_params:string[] = route.handle['params'];
                const formated_path = 
                !!route_params.length
                ? (()=>{
                    let current_formated_path = route.path as string;
                    route_params.forEach((path)=>
                    {
                    current_formated_path = current_formated_path
                    .replace(
                        ":"+path,
                        route.handle['name'] === 'list-post'
                        ? 'all'
                        : 
                        route.handle['name'] === 'profile'
                        ? 'aqsq'
                        : ""
                        )
                    }
                )
                    return current_formated_path
                })()
                : route.path

                return (
                    <li key={route.handle['name']}>
                        <Link
                        style={{
                            color:
                            onMatch(route.path as string,pathname)
                            ? "deepskyblue"
                            : "black"
                        }} 
                        to={formated_path as string}>
                          <img src="" alt="" />
                          <span>
                            {route.handle['label']}
                          </span>
                        </Link>
                    </li>
                )
            }
            )
        }
        </ul>
    </nav>
  )
}

export default NavBar
