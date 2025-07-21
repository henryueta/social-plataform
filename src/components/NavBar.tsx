import { Link } from "react-router-dom"
import { home_routers } from "../pages"
import "../styles/navbar.css"
import useHandlePath from "../hooks/useHandlePath"
import useHandleProfile from "../hooks/useHandleProfile"
import { useEffect, useState } from "react"
import { useHandleScreen } from "../context/ScreenContext"

const NavBar = () => {
    const {onMatch,pathname} = useHandlePath();
    const {onGetUser} = useHandleProfile()
    const [currentUserUsername,setCurrentUserUsername] = useState<string|null>(null);
    const {isMobile} = useHandleScreen();

    useEffect(()=>{

        onGetUser({
            mode:'single',
            type:'small',
            hasImage:false
        },{
            username:currentUserUsername as string
        },{
            onThen(result) {
                setCurrentUserUsername(result.response.data.user.username)
            },
            onCatch(error) {
                console.log(error)
            },
        })

    },[])

  return (
    <nav className="navBar">
        {
        !isMobile
        &&
        <div className="logoContainer">
            <h1>
                🌊 Seaddy
            </h1>
        </div>
        }
        <ul>
        {
            home_routers.map((route)=>
            {
                const route_params:string[] = route.handle['params'];
                const formated_path = 
                !!route_params.length && !!currentUserUsername
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
                        ? currentUserUsername
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
                            fontWeight:
                            onMatch(route.path as string,pathname)
                            ? "bolder"
                            : "lighter",
                            color:"black"
                        }} 
                        to={formated_path as string}>
                          <img 
                          style={
                            isMobile
                            ? {padding:"0.2rem"}
                            : {padding:"0.2rem"}
                            }
                          src={route.handle['icon']} 
                          alt={route.handle['name']+"´s icon"} />
                          {
                            !isMobile
                            &&
                            <span
                            
                            >
                            {route.handle['label']}
                            </span>
                          }
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
