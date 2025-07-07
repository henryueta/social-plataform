import { RouterDomFactory } from "../adapters/router_dom-adapter"
import PostList from "./main/PostListPage"
import AuthPage from "./security/AuthPage"
import Private from "./security/Private"
import NotificationPage from "./main/NotificationPage"
import ProfilePage from "./main/ProfilePage"
import SearchPage from "./main/SearchPage"
import PostPage from "./main/PostPage"
import PublishPage from "./main/PublishPage"
import { Navigate } from "react-router-dom"
import MainLayout from "../layout/MainLayout"

const router = RouterDomFactory.create([
    {
        id:"",
        path:"/auth/:type",
        element:<AuthPage/>,
        handle:{
            alt:"autentication",
            name:"auth",
            label:"Autenticação",
            type:"security",
            params:["type"]
        }
    },
    {
        path:"/",
        element:
        <Private>
            <Navigate to={"/posts/all"}/>
        </Private>,
        handle:{
            alt:"home",
            name:"home",
            label:"Home",
            type:"security",
            params:[]
        }
    },
    {
        path:"/search",
        element:
        <Private>
            <MainLayout>
                <SearchPage/>
            </MainLayout>
        </Private>,
        handle:{
            alt:"search",
            name:"search",
            label:"Pesquisar",
            type:"home_navigation",
            params:[]
        }
    },
    {
        path:"/posts/:type",
        element:
        <Private>
            <MainLayout>
                <PostList/>
            </MainLayout>
        </Private>,
        handle:{
            alt:"list-post",
            name:"list-post",
            label:"Posts",
            type:"home_navigation",
            params:["type"]//all or friends
        }
    },
    {
        path:"/post/create",
        element:
        <Private>
            <MainLayout>
                <PublishPage/>
            </MainLayout>
        </Private>,
        handle:{
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
            <MainLayout>
                <PostPage/>
            </MainLayout>
        </Private>,
        handle:{
            alt:"view-post",
            name:"view-post",
            label:"Ver Post",
            type:"view",
            params:["id"]//any string value
        }
    },
    {
        path:"/notifications",
        element:
        <Private>
            <MainLayout>
                <NotificationPage/>
            </MainLayout>
        </Private>,
        handle:{
            alt:"notifications",
            name:"notification",
            label:"Notificação",
            type:"home_navigation",
            params:[]
        }
    },
    {
        path:"/profile/:username",
        element:
        <Private>
            <MainLayout>
                <ProfilePage/>
            </MainLayout>
        </Private>,
        handle:{
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