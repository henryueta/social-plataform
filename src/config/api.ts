
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
        get:api_base+"publish/get"
    }
}

export default api_endpoints