import { useNavigate } from 'react-router-dom'
import google from '../assets/google.svg'
import { useState } from 'react'

export default function LogForm() {
  const [credentials, setCredentials] = useState({username:'',password:''})
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
        setCredentials({...credentials, [name]:value})
        if(error) setError('')      
  }

  const handleSubmit = async (e: { preventDefault: () => void })=>{
        e.preventDefault()
        setLoading(true)
        setError('')
        console.log(credentials)
        try{
            const response = await fetch('http://127.0.0.1:3000/api/auth/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(credentials)
            })
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Login failed')
            }

            localStorage.setItem('authToken', data.token)
            localStorage.setItem('user',JSON.stringify(data.user))

            //redirect 
            navigate('/dashboard')
        } catch(error: unknown){
            setError(error instanceof Error ? error.message : 'An error occurred')
        } finally{
            setLoading(false)
        }
  }

  return (
    <form className="mt-14 w-[28rem] flex-col items-center gap-6" onSubmit={handleSubmit} >
        <div className="flex-col gap-2 px-4 flex">
            <label htmlFor="username" className="text-start text-base font-normal">Email</label>
            <input name='username' type="text" onChange={handleChange} required value={credentials.username} placeholder="Enter your email" 
                className="h-8 bg-slate-100 p-4 text-slate-600 placeholder:text-slate-400 rounded-md"/>
        </div>
        <div className="flex-col gap-2 px-4 flex mt-4">
            <label htmlFor="password" className="text-start text-base font-normal">Password</label>
            <input name='password' type="password" required onChange={handleChange} value={credentials.password} placeholder="Enter your email" 
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
            <button type='submit' disabled={loading} className="w-full h-10 bg-black hover:bg-gray-700 text-white rounded-lg">Submit</button>
            <button className="w-full h-10 text-slate-800 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <img src={google} alt="Google" className="inline-block mr-2 h-5 w-5 align-middle" /> Sign in with Google</button>
            {error && <p className='text-center p-1 bg-red-700 text-white font-medium'>{error}</p>}
        </div>
    </form>
  )
}
