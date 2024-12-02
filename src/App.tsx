import RootLayout from "./layouts/RootLayouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './router/router';

function App() {
  return (
    <div className='App'>
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
    </div>
  );
}

export default App;
