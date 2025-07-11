
const api_base = import.meta.env.VITE_API_BASE_URL;

const api_endpoints = {
    auth:{
        login:api_base+"auth/login",
        register:api_base+"auth/register",
        checkout:api_base+"auth/checkout",
        logout:api_base+"auth/logout"
    },
    user:{
        get:api_base+"user/get",
    },
    post:{
        post:api_base+"publish/post",
        get:api_base+"publish/get",
        put:api_base+"publish/put"
    },
    commentary:{
        get:api_base+"commentary/get",
        post:api_base+"commentary/post"
    },
    like:{
        get:api_base+"like/get",
        post:api_base+"like/post"
    }
}

export default api_endpoints