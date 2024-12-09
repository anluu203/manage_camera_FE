import axios from "@/config/axios"

const getUserAccount = () =>{
    return axios.get('/api/v1/account')
}

export {getUserAccount};