import { Activity, Ban, BellDot, Calendar, ChevronDown, ChevronRight, Contact, Dot, Ellipsis, FolderClosed, FolderOpen, LayoutGrid, LogOut, Mountain, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    name:'Files',
    icon: <FolderClosed className="text-blue-800"/>
  },
  {
    name:'Activity',
    icon: <Activity className="text-gray-500"/>
  },
  {
    name:'Calender',
    icon: <Calendar className="text-gray-500"/>
  },
  {
    name:'Contact',
    icon: <Contact className="text-gray-500"/>
  },
]

interface Collaborator{
  name: string;
  avatar: string;
}

interface FileItem {
  name: string;
  type:'folder'|'file';
  sharing: 'Public' | 'Private';
  size: string;
  modified: string;
  collaborators?: Collaborator[];
}

interface ProjectData {
  project : string;
  path: string[];
  files: FileItem[];
}

export default function Dashboard() {
  const [data,setData] = useState<ProjectData|null>(null)
  const [loading , setLoading ] = useState(true)
  const [error,setError] = useState<string|null>(null)

  const naigate = useNavigate()

  const logout_handle = ()=>{
    localStorage.clear()
    naigate('/login',{replace:true})
  }

  useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('authToken')

      if(!token){
        setError('No authentication token found, Please Log in.')
        setLoading(false)
        return;
      }

      try{
        const res = await fetch('http://localhost:3000/api/data',{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });

        if(!res.ok){
          const errorText = await res.text()
          setError(errorText)
          throw new Error(`HTTP ${res.status}: ${errorText || "Failed to fetch data"}`);
        }

        const result : ProjectData = await res.json()
        setData(result)   
        console.log(result)
      } catch(error){
        setError(error instanceof Error? error.message : 'An unknown error')
      } finally{
        setLoading(false)
      }
    }

    fetchData()
  },[])

  if(loading) return <div className="w-full">Loading 0.0.0.0</div>

  const ErrorBox = ()=>{
    if(error) return(
      <div className="p-4 justify-center">
        <h1 className="text-xl p-4 flex justify-center text-red-700 gap-4 items-center">{error} <Ban/></h1>
        <button className="px-4 py-2 bg-blue-400 w-[120px] text-white font-semibold text-lg shadow-md" onClick={()=> window.location.reload()}>Retry</button> 
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-200">
          <header className="w-full flex justify-start p-2">
            <div className="flex flex-1 w-1/4 mx-3 items-center"> 
              <Mountain className="text-blue-500"/>
              <h1 className="text-xl mx-2">mountain</h1>
            </div>
            <div className="flex justify-start">
              {tabs.map(item=>
                <div className={item.name=='Files'?'bg-white py-1 px-3 mx-2 flex justify-center rounded-lg hover:bg-slate-300 hover:cursor-pointer': "py-1 px-3 mx-2 flex justify-center rounded-lg hover:bg-slate-300 hover:cursor-pointer"}>
                  {item.icon} <span className={ item.name=='Files'?'text-blue-800 font-medium mx-2':'text-gray-500' + "font-medium mx-2"}>{item.name}</span>
                </div>
              )}
            </div>
            <div className="w-1/4"></div>
            <div className="w-1/4 flex justify-center items-center px-2">
              <div className="bg-white flex rounded-md justify-start items-center mx-4">
                <Search className="mx-1 text-slate-600 hover:cursor-pointer" size={16}/>
                <input type="text" className="mx-2 p-1 border-0 bg-transparent focus:ring-0 focus:border-0 focus:outline-none transition" placeholder="Search anything..."/> 
              </div>
              <BellDot className="mx-2 hover:cursor-pointer hover:scale-110 transition"/>
              <LogOut className="mx-2 text-red-700 hover:cursor-pointer hover:scale-110 transition" onClick={logout_handle}/>
            </div>
          </header>
          <ErrorBox/>
          {data &&
          <><main className="w-full">
          <div className="m-4 p-2 rounded-2xl bg-white shadow-lg">
            <div className="text-gray-800 w-full font-semibold text-lg flex justify-between px-4">Quick Access <Ellipsis className="hover:cursor-pointer" /> </div>
            <div className="mt-4 mx-4 flex gap-4 justify-start items-start">
              {data.files.map((item, index) => (
                <div key={index} className="w-48 hover:bg-slate-400 border border-gray-300 shadow p-4 rounded-md">
                  <FolderOpen className="text-white bg-blue-500 rounded-lg p-1" size={36} />
                  <h1 className="mt-2 font-medium">{item.name}</h1>
                  <span className="flex text-slate-600">{item.size} <span><Dot /></span> {item.collaborators}</span>
                </div>
              ))}
            </div>
          </div>
          </main><div className="bg-white p-2 m-4 rounded-xl">
            <nav className="flex justify-between items-center">
              <div className="flex text-slate-600 gap-2 mx-3"> <span>Home</span> <ChevronRight /> <span>Concept Font</span> <ChevronRight /> <span className="font-bold">Maszeh</span> </div>
              <div className="flex items-center"><LayoutGrid className="mx-2 text-slate-400" />
                <button className="flex items-center py-1 px-3 bg-blue-700 mx-1 text-white font-light rounded-lg"><Plus size={20} /><span className="mx-1">Add New</span></button></div>
            </nav>
            <div className="max-lg:overflow-x-auto">
              <table className="mt-6 w-full">
                <thead className="w-full">
                  <tr className="w-full flex gap-32 justify-normal mx-3">
                    <th className="flex items-center w-[190px] font-normal text-slate-600 gap-2">Name<ChevronDown size={16} /></th>
                    <th className="text-slate-600 font-normal">Sharing</th>
                    <th className="flex items-center text-slate-600 font-normal gap-2 justify-between">Size<ChevronDown size={16} /></th>
                    <th className="flex items-center text-slate-600 font-normal gap-2 justify-between">Modified<ChevronDown size={16} /></th>
                  </tr>
                  <hr className="my-2 border-1" />
                </thead>
                <tbody className="w-full">
                  {data?.files.map((item, index) => <tr key={index} className="flex hover:bg-slate-400 transition gap-24 justify-normal">
                    <th className="flex w-[190px] items-center mx-4 gap-4"><FolderClosed className="text-blue-500" />
                      <span className="font-medium">{item.name}</span>
                    </th>
                    <th className="mx-4 font-normal text-slate-700">{item.sharing}</th>
                    <th className="mx-4 font-normal text-slate-700 ">{item.size}</th>
                    <th className="mx-4 font-normal text-slate-700">{item.modified}</th>
                    <th className="mx-4"><Ellipsis className="text-slate-600" /></th>
                  </tr>)}

                </tbody>
              </table>
            </div>
          </div></>
          }
    </div>
  )
}
