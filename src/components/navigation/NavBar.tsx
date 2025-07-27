import { Link } from "react-router-dom"
import { home_routers } from "../../pages"
import "../../styles/navigation/navbar.css"
import useHandlePath from "../../hooks/useHandlePath"
import useHandleProfile from "../../hooks/useHandleProfile"
import { useEffect, useState } from "react"
import { useHandleScreen } from "../../context/ScreenContext"
import Contact from "../visual/Contact"

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
                        : 
                        route.handle['name'] === 'search'
                        ? "post"
                        : ""
                        )
                    }
                )
                    return current_formated_path
                })()
                : route.path

                return (
                    <li key={route.handle['name']} 
                    style={
                        {
                            
                            background:
                            isMobile
                            ? onMatch(route.path as string,pathname)
                                ? "var(--color-white-hover)"
                                : "none"
                            : "none"
                        }
                    }
                    >
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
                            ? {padding:"0.3rem"}
                            : {padding:"0.3rem"}
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
        {
            !isMobile
            &&
            <Contact/>
        }
    </nav>
  )
}

export default NavBar
