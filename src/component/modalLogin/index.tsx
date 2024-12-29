
import { Link } from "react-router-dom";
import ButtonCustom from "@/component/atoms/button/button";
import InputCustom from "@/component/atoms/input/input";
import { PRIMARY, WHITE } from "@/helper/colors";
import { useState } from "react";
import {handleLoginApi} from "@/service/auth/loginLogout";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAth";
function ModalLogin() {
    let navigate = useNavigate();
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState("");
    const [checkError, setCheckError] = useState(false)


    const {loginContext, user} = useAuth()

    const handleLogin = async () => {
      let res = await handleLoginApi(valueLogin, valuePassword)
      let validate = res.data;
      if (validate.EC === 0) {
        toast.success(validate.EM)
        setValueLogin("");
        setValuePassword("");
        let groupWithRoles = validate.DT.groupWithRoles;
        let email = validate.DT.email;
        let username = validate.DT.username;
        let token = validate.DT.access_token;
        const data = {
          isAuthenticated: true,
          token: token,
          account: {groupWithRoles, email, username},
          isLoading: false
        };
        localStorage.setItem('jwt', token)
        console.log('user after login', user)
        loginContext(data)
        navigate("/home")
      } else {
        toast.error(validate.EM)
        setCheckError(true)
      }
    }
    return(
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto ">
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Sign in
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Log in to your account and explore our helpful tools. Your journey starts here.
                </p>
              </div>

              <div className="relative flex items-center">
                <InputCustom
                  label="Email or phone number"
                  type="text"
                  value={valueLogin}
                  error={checkError}
                  onChange={(e) => setValueLogin(e.target.value)}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="relative flex items-center">
                <InputCustom
                  label="Password"
                  type="password"
                  value={valuePassword}
                  error={checkError}
                  onChange={(e) => setValuePassword(e.target.value)}
                  style={{
                    width: "100%",
                  }}
                />
              </div>

              <div className="mt-8">
                <ButtonCustom
                  fontWeight="600"
                  variant="text"
                  onClick={() => handleLogin()}
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
                  Sign in
                </ButtonCustom>
              </div>

              <p className="text-sm mt-8 text-center text-gray-800">
                Don't have an account
                <Link
                  to="/SignUp"
                  style={{ color: PRIMARY.MEDIUM }}
                  className=" font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
    )
}

export default ModalLogin;