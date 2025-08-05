import { RouterDomFactory } from "../adapters/router_dom-adapter"
import PostListPage from "./main/PostListPage"
import AuthPage from "./security/AuthPage"
import Private from "./security/Private"
import ProfilePage from "./main/ProfilePage"
import SearchPage from "./main/SearchPage"
import PostPage from "./main/PostPage"
import PublishPage from "./main/PublishPage"
import { Navigate } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import posts_icon from "../assets/icons/posts_icon.png"
import profile_icon from "../assets/icons/profile_icon.png"
import upload_icon from "../assets/icons/upload_icon.png"
import search_icon from "../assets/icons/search_icon.png"
import ProfileListPage from "./main/ProfileListPage"
import AuthCheckout from "./security/AuthCheckout"
import NavigationLayout from "../layout/NavigationLayout"
import AuthForgotten from "./security/AuthForgotten"
import AuthRecovery from "./security/AuthRecovery"
import MessagePage from "./main/MessagePage"


const router = RouterDomFactory.create([
    {
        path:"/auth/:type",
        element:
            <NavigationLayout>
                        <AuthPage/>  
            </NavigationLayout>
        ,
        handle:{
            icon:"",
            alt:"autentication",
            name:"auth",
            label:"Autenticação",
            type:"security",
            params:["type"]
        }
    },
    {
        path:"/forgot/password",
        element:
            <NavigationLayout>
                <AuthForgotten/>
            </NavigationLayout>,
        handle:{
            icon:"",
            alt:"forgot",
            name:"forgot",
            label:"Recuperação",
            type:"security",
            params:[]
        }
    },
    {
        path:"/recovery/password/:token",
        element:
            <NavigationLayout>
                <AuthRecovery/>
            </NavigationLayout>,
        handle:{
            icon:"",
            alt:"recovery",
            name:"recovery",
            label:"Recuperação",
            type:"security",
            params:["token"]
        }
    },
    {
        path:"/checkout",
        element:
            <NavigationLayout>
                <AuthCheckout/>
            </NavigationLayout>,
        handle:{
            icon:"",
            alt:"auth_checkout",
            name:"checkout",
            label:"Checkout",
            type:"security",
            params:[]
        }        
    },
    {
        path:"/",
        element:
        <Private>
            <Navigate to={"/posts/all"}/>
        </Private>,
        handle:{
            icon:"",
            alt:"home",
            name:"home",
            label:"Home",
            type:"security",
            params:[]
        }
    },
    {
       path:"/message/:type",
        element:
            <NavigationLayout>
                <MessagePage/>
            </NavigationLayout>,
        handle:{
            icon:"",
            alt:"message",
            name:"message",
            label:"Mensagem",
            type:"view",
            params:["type"]
        } 
    },
    {
        path:"/profiles/:type/:identifier_type/:identifier",
        element:
        <Private>
            <NavigationLayout>
                <MainLayout>
                    <ProfileListPage/>
                </MainLayout>
            </NavigationLayout>
        </Private>,
        handle:{
            icon:"",
            alt:"user-list",
            name:"user-list",
            label:"Usuários",
            type:"view",
            params:["type"]
        }
    },
    {
        path:"/posts/:type",
        element:
        <Private>
            <NavigationLayout>
                <MainLayout>
                    <PostListPage/>
                </MainLayout>
            </NavigationLayout>
        </Private>,
        handle:{
            icon:posts_icon,
            alt:"list-post",
            name:"list-post",
            label:"Posts",
            type:"home_navigation",
            params:["type"]//all or following
        }
    },
    {
        path:"/post/create",
        element:
        <Private>
            <NavigationLayout>
                <MainLayout>
                    <PublishPage/>
                </MainLayout>
            </NavigationLayout>
        </Private>,
        handle:{
            icon:upload_icon,
            alt:"create-post",
            name:"create-post",
            label:"Criar",
            type:"home_navigation",
            params:[]
        }
    },
    {
        path:"/post/view/:id",
        element:
        <Private>
            <NavigationLayout>
                <MainLayout>
                    <PostPage/>
                </MainLayout>
            </NavigationLayout>
        </Private>,
        handle:{
            icon:"",
            alt:"view-post",
            name:"view-post",
            label:"Ver Post",
            type:"view",
            params:["id"]//any string value
        }
    },
    // {
    //     path:"/notifications",
    //     element:
    //     <Private>
    //         <MainLayout>
    //             <NotificationPage/>
    //         </MainLayout>
    //     </Private>,
    //     handle:{
    //         alt:"notifications",
    //         name:"notification",
    //         label:"Notificação",
    //         type:"home_navigation",
    //         params:[]
    //     }
    // },
    {
        path:"/search/:type",
        element:
        <Private>
            <MainLayout>
                <SearchPage/>
            </MainLayout>
        </Private>,
        handle:{
            icon:search_icon,
            alt:"search",
            name:"search",
            label:"Pesquisar",
            type:"home_navigation",
            params:["type"]
        }
    },
    {
        path:"/profile/:username",
        element:
        <Private>
            <NavigationLayout>
                <MainLayout>
                    <ProfilePage/>
                </MainLayout>
            </NavigationLayout>
        </Private>,
        handle:{
            icon:profile_icon,
            alt:"profile",
            name:"profile",
            label:"Conta    ",
            type:"home_navigation",
            params:["username"]//any string value
        }
    }
])

const home_routers = router.routes.filter((route)=>{
    return route.handle['type'] === 'home_navigation'
})

export {
    router,
    home_routers
}