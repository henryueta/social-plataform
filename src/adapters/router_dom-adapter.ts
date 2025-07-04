import { createBrowserRouter, type RouteObject } from "react-router-dom";

class RouterDomAdapter {

    create(routes:RouteObject[]){
        const routerList = createBrowserRouter(routes)
        return routerList
    }

}

const RouterDomFactory = new RouterDomAdapter();

export {
    RouterDomAdapter,
    RouterDomFactory
}
