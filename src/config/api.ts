
const api_base = import.meta.env.VITE_API_BASE_URL;

const api_endpoints = {
    auth:{
        login:api_base+"auth/login",
        register:api_base+"auth/register",
        checkout:api_base+"auth/checkout",
        logout:api_base+"auth/logout"
    },
    user:{
        
    }
}

export default api_endpoints