import axios from "@/config/axios"


 const handleSignUp = (
    email:string | number,
    phone:number | string,
    username:string | number,
    password: string | number ) =>{
     return axios.post('/api/v1/register', {
            email,
            phone,
            username,
            password,
        }
    )
}


export {handleSignUp}
