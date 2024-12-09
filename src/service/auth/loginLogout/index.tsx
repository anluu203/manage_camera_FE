import axios from "@/config/axios"

const handleLoginApi = (
  valueLogin: string | number,
  valuePassword: string | number
) => {
    return axios.post('/api/v1/login', {
        valueLogin,
        valuePassword
    }
)
};

const handleLogout = () =>{
  return axios.post('/api/v1/logout')
}
export {handleLoginApi, handleLogout} ;