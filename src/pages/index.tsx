import { RouterDomFactory } from "../adapters/router_dom-adapter"
import Auth from "./Auth"
import Home from "./Home"
import Private from "./Private"

const router = RouterDomFactory.create([
    {
        path:"/",
        element:
        <Private>
            <Home/>
        </Private>
    },
    {
        path:"/auth/:type",
        element:<Auth/>,
    }
])

export default router