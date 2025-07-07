
const api_base = import.meta.env.VITE_API_BASE_URL;

const api_endpoints = {
    auth:{
        login:api_base+"auth/login",
        register:api_base+"auth/register",
        checkout:api_base+"auth/checkout",
        logout:api_base+"auth/logout"
    },
    user:{
        getSingle:api_base+"user/get/single",
        getGroup:api_base+"user/get/group"
    },
    post:{
        post:api_base+"publish/post"
    }
}

export default api_endpoints