import { Fingerprint } from 'lucide-react'
import VideoBackground from '../components/videoBg'
import './Login_page.css'
import LogForm from '../components/loginForm'

export default function LoginPage() {
  return (
    <div className="w-full mx-40 flex items-start justify-between py-6 max-sm:justify-center max-sm:items-center">
        <div className="w-1/2 max-sm:-z-10 max-sm:absolute max-sm:w-full">
          <VideoBackground />
        </div>
        <div className='w-1/2 flex-col items-start my-[1rem] p-2 max-sm:w-full max-sm:bg-white/90'>
            <div className='flex justify-center gap-2'>
              <Fingerprint/>
              <span className='font-medium text-lg'>Cogie</span>
            </div>
            <div className='w-full text-center font-thin text-3xl mt-24 font-serif'>Welcome Back</div>
            <div className='font-extralight text-sm text-center '>Enter your Email and password to access your account</div>
            <div className='flex justify-center'>
              <LogForm/>
            </div>
            <div className="text-center mt-24 text-slate-700">Don't have an account? 
              <span className="text-black"> Sign Up</span> </div>
        </div>
    </div>
  )
}
