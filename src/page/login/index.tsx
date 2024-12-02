
import image from '@/assets/webp/login-image.webp'
import ModalLogin from "@/component/modalLogin";
function LoginPage() {
  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full place-items-center">
          <ModalLogin/>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src={image}
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
