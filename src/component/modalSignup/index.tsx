
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {  toast } from "react-toastify";
import ButtonCustom from "@/component/atoms/button/button";
import InputCustom from "@/component/atoms/input/input";
import { PRIMARY, WHITE } from "@/helper/colors";
import { handleSignUp } from "@/service/signup";


function ModalSignUp() {
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [confirm, setConfirm] = useState('')
      let defaultValue = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUserName: true,
        isValidPassWord: true,
        isValidConfirm: true
    }
    const [checkValid, setCheckValid] = useState(defaultValue)


    const validateData = ():boolean =>{

      setCheckValid(defaultValue)
      if (!confirm) {
          toast.error('Confirm password is required !')
          setCheckValid({...defaultValue, isValidConfirm:false})
          return false
      }
      if (confirm !== password) {
          toast.error('Confirm password and password do not match')
          setCheckValid({...defaultValue, isValidConfirm:false})
          return false
      }
      return true
  }

  const handleRegister = async () => {
    let res = await handleSignUp(email, phone, userName, password )
    let validate = res.data;
    if (+validate.EC === 0) {
      toast.success(validate.EM)
      setEmail('');
      setPhone('');
      setUserName('');
      setPassWord('');
      setConfirm('');
      navigate("/login"); 
    } else {
      toast.error(validate.EM)
    }

  }
    
    return(
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Sign up
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Create your account here
                </p>
              </div>

              <div className="relative flex items-center">
                <InputCustom
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="relative flex items-center">
                <InputCustom
                  label="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="relative flex items-center">
                <InputCustom
                  label="User name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  style={{
                    width: "100%",
                  }}
                />
              </div> 
              <div className="relative flex items-center">
                <InputCustom
                  label="Password"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                  type="password"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            
              <div className="relative flex items-center">
                <InputCustom
                  label="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type="password"
                  style={{
                    width: "100%",
                  }}
                />
              </div>   
              <div className="mt-8">
                <ButtonCustom
                  fontWeight="600"
                  variant="text"
                  onClick={() => handleRegister()}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0",
                    borderRadius: "0.5rem",
                    color: WHITE,
                    backgroundColor: PRIMARY.MEDIUM,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY.DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY.MEDIUM)
                  }
                >
                  Sign up
                </ButtonCustom>
              </div>

              <p className="text-sm mt-8 text-center text-gray-800">
                Account already exists?
                <Link
                  to="/login"
                  style={{ color: PRIMARY.MEDIUM }}
                  className=" font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
    )
}

export default ModalSignUp;