'use client'
import google from '../assets/google.svg'

export default function LogForm() {
  return (
    <form className="mt-14 w-[28rem] flex-col items-center gap-6">
        <div className="flex-col gap-2 px-4 flex">
            <label htmlFor="email" className="text-start text-base font-normal">Email</label>
            <input type="email" placeholder="Enter your email" 
                className="h-8 bg-slate-100 p-4 text-slate-600 placeholder:text-slate-400 rounded-md"/>
        </div>
        <div className="flex-col gap-2 px-4 flex mt-4">
            <label htmlFor="email" className="text-start text-base font-normal">Password</label>
            <input type="password" placeholder="Enter your email" 
                className="h-8 bg-slate-100 text-slate-600 placeholder:text-slate-400 p-4 rounded-md"/>
        </div>
        <div className="flex justify-between mt-4 px-8">
            <div className="flex items-center justify-center">
                <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2 mt-1"/>
                <span className="text-base font-light">Remember Me</span>
            </div>
            <span className="text-base font-light">Forget Password</span>
        </div>
        <div className="mt-8 grid gap-4">
            <button className="w-full h-10 bg-black hover:bg-gray-700 text-white rounded-lg">Submit</button>
            <button className="w-full h-10 text-slate-800 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
              <img src={google} alt="Google" className="inline-block mr-2 h-5 w-5 align-middle" /> Sign in with Google</button>
        </div>
    </form>
  )
}
