import RootLayout from "./layouts/RootLayouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './router/router';
import { useAuth } from "./hooks/useAth";
import {  RingLoader } from "react-spinners";

function App() {
  const {user} = useAuth();
  return (
    <div className='App'>
      {user.isLoading ? 
        <div className="loading-container flex flex-col justify-center items-center h-screen">
        <RingLoader
           color= "#0078D4"
           loading={true}
        />
        <div className="mt-5 text-xl">Loading...</div>
      </div>
      :
      <RootLayout>
        <AppRouter />
        <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      </RootLayout>      
      }

    </div>
  );
}

export default App;
