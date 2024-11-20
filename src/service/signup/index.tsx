import axios from "axios";


 const handleSignUp = (
    email:string | number,
    phone:number | string,
    username:string | number,
    password: string | number ) =>{
     return axios.post('http://localhost:8080/api/v1/register', {
            email,
            phone,
            username,
            password,
        }
    )
}


export {handleSignUp}
