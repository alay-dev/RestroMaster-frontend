import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Letter, LockKeyhole, Eye, EyeClosed, User } from "solar-icon-set"
import googleLogo from "@/public/images/social/google-logo.svg"
import facebookLogo from "@/public/images/social/facebook-logo.svg"
import { useState } from "react"


export default function Home() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formType, setFormtype] = useState<"login" | "signup">("login")

  const LoginForm = () => {
    return <div className="w-[25rem]">
      <h1 className='mb-2 text-3xl font-medium' >Welcome back !</h1>
      <p className='mb-16 text-sm text-gray-400' > Start managing your restaurant, better and fater</p>
      <form>
        <div className="flex items-center gap-1 p-2 mb-3 bg-gray-100 rounded-lg " >
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11" >
            <Letter size={20} color="#1E88E5" />
          </div>
          <Input className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex items-center gap-1 p-2 mb-1 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11" >
            <LockKeyhole size={20} color="#1E88E5" />
          </div>
          <Input className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0" type={passwordVisible ? "text" : "password"} placeholder="********" />
          {passwordVisible ?
            <Button onClick={() => setPasswordVisible(false)} type="button" variant="ghost" size="icon">
              <EyeClosed />
            </Button> :
            <Button onClick={() => setPasswordVisible(true)} type="button" variant="ghost" size="icon">
              <Eye />
            </Button>

          }

        </div>
        <p className="mb-4 text-right text-blue-600 hover:underline hover:cursor-pointer">Forgot password?</p>
        <Button className="w-full transition duration-100 bg-blue-500 hover:bg-blue-600">Login</Button>
      </form>
      <div className="flex items-center justify-center gap-2 my-6" >
        <div className="w-48 h-[1px] bg-gray-300" />
        <p className="text-gray-400 ">or</p>
        <div className="w-48 h-[1px] bg-gray-300" />
      </div>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-1/2 gap-3 py-2 border rounded-md" >
          <img className="w-6" src={googleLogo.src} alt="Google logo" />
          <h5 className="font-medium">Google</h5>
        </div>
        <div className="flex items-center justify-center w-1/2 gap-3 py-2 border rounded-md" >
          <img className="w-6" src={facebookLogo.src} alt="Google logo" />
          <h5 className="font-medium">Facebook</h5>
        </div>
      </div>
      <p className="text-center text-gray-600">Don't have an account? <span onClick={() => setFormtype("signup")} className="font-medium text-blue-600 cursor-pointer hover:underline">Sign up</span></p>
    </div>
  }

  const SignupForm = () => {
    return <div className="w-[25rem]">
      <h1 className='mb-2 text-3xl font-medium' >Sign up</h1>
      <p className='mb-16 text-sm text-gray-400' > Start managing your restaurant, better and fater</p>
      <form className="">
        <div className="flex items-center gap-1 p-2 mb-3 bg-gray-100 rounded-lg " >
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11" >
            <User size={20} color="#1E88E5" />
          </div>
          <Input className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0" type="text" placeholder="your name" />
        </div>
        <div className="flex items-center gap-1 p-2 mb-3 bg-gray-100 rounded-lg " >
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11" >
            <Letter size={20} color="#1E88E5" />
          </div>
          <Input className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex items-center gap-1 p-2 mb-3 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11" >
            <LockKeyhole size={20} color="#1E88E5" />
          </div>
          <Input className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0" type={passwordVisible ? "text" : "password"} placeholder="********" />
          {passwordVisible ?
            <Button onClick={() => setPasswordVisible(false)} type="button" variant="ghost" size="icon">
              <EyeClosed />
            </Button> :
            <Button onClick={() => setPasswordVisible(true)} type="button" variant="ghost" size="icon">
              <Eye />
            </Button>
          }
        </div>
        <div className="flex items-center gap-1 p-2 mb-1 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-center bg-white rounded-sm h-9 w-11" >
            <LockKeyhole size={20} color="#1E88E5" />
          </div>
          <Input className="bg-gray-100 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent ring-0" type={passwordVisible ? "text" : "password"} placeholder="Confirm password" />
        </div>
        <Button className="w-full my-6 transition duration-100 bg-blue-500 hover:bg-blue-600">Signup</Button>
      </form>
      <p className="text-center text-gray-600">Already have an account? <span onClick={() => setFormtype("login")} className="font-medium text-blue-600 cursor-pointer hover:underline">Login</span></p>
    </div>
  }

  return (
    <main className={`flex min-h-screen flex-1 `}>
      <div className='w-2/4 min-h-screen bg-gray-100' >
        hello
      </div>

      <div className='flex flex-col items-center justify-center w-2/4 min-h-screen bg-white' >
        {formType === "login" &&
          <LoginForm />
        }
        {formType === "signup" &&
          <SignupForm />
        }
      </div >
    </main >
  )
}
