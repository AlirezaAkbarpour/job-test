import { Activity, Ban, BellDot, Calendar, ChevronDown, ChevronRight, Contact, Dot, Ellipsis, FileCode, FileText, FolderClosed, LayoutGrid, Loader, LogOut, Mountain, Plus, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

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

  const user = useContext(UserContext)
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
      } catch(error){
        setError(error instanceof Error? error.message : 'An unknown error')
      } finally{
        setLoading(false)
      }
    }

    fetchData()
  },[])

  const FileIconSelect = ({name,color,size}:{name:string,color:string,size?:number})=>{
      switch (true) {
        case name.includes(".html") : return <FileCode className={`text-red-500`} size={size}/> ;
        case name.includes(".txt") : return <FileText className={`text-orange-500`} size={size}/> ;
        default : return <FolderClosed className={`text-${color}-500`} size={size}/>;
      }
  }

  const Header = ()=>{
    return <header className="w-full flex justify-start p-2 max-lg:grid max-lg:grid-cols-1 max-lg:gap-4">
            <div className="flex flex-1 w-1/4 mx-3 items-center max-lg:justify-center"> 
              <Mountain className="text-blue-500"/>
              <h1 className="text-xl mx-2 font-normal">mountain</h1>
            </div>
            <div className="flex justify-start max-lg:justify-center">
              {tabs.map((item,index)=>
                <div key={index} className={item.name=='Files'?'bg-white py-1 px-3 mx-2 flex justify-center rounded-lg hover:bg-slate-300 hover:cursor-pointer': "py-1 px-3 mx-2 flex justify-center rounded-lg hover:bg-slate-300 hover:cursor-pointer"}>
                  {item.icon} <span className={ item.name=='Files'?'text-blue-800 font-medium mx-2':'text-gray-500' + "font-medium mx-2"}>{item.name}</span>
                </div>
              )}
            </div>
            <div className="w-1/4"></div>
            <div className=" flex justify-center items-center px-2">
              <div className="bg-white flex rounded-md justify-start items-center mx-4">
                <Search className="mx-1 text-slate-600 hover:cursor-pointer" size={16}/>
                <input type="text" className="mx-2 p-1 border-0 bg-transparent focus:ring-0 focus:border-0 focus:outline-none transition" placeholder="Search anything..."/> 
              </div>
              <p className="mx-2 hover:bg-slate-700 hover:text-white p-1 rounded-xl transition">{user?.username}</p> 
              <BellDot className="mx-2 hover:cursor-pointer hover:scale-110 transition"/>
              <LogOut className="mx-2 text-red-700 hover:cursor-pointer hover:scale-110 transition" onClick={logout_handle}/>
            </div>
    </header>
  }


  if(loading) return <div className="w-full bg-gray-200 h-screen">
      <Header/>
      <h1 className="flex justify-center gap-3 text-lg items-center p-4">Loading <Loader className="animate-spin"/></h1>
  </div>

  if(error){
    return(
      <div className="p-4 justify-center bg-gray-200 w-full h-screen">
        <h1 className="text-xl p-4 flex justify-center text-red-700 gap-4 items-center">{error} <Ban/></h1>
        <button className="px-4 py-2 bg-blue-400 w-[120px] ml-[48rem] text-white font-semibold text-lg shadow-md" onClick={()=> window.location.reload()}>Retry</button> 
      </div>
    )}

  if(!data?.project) return(
      <div className="p-4 justify-center bg-gray-200 w-full">
        <Header/>
        <h1 className="text-xl p-4 flex justify-center my-52 text-blue-700 gap-4 items-center">Not Data available<Ban/></h1>
      </div>
    )

  return (
    <div className="w-full bg-gray-200 ">
          <Header/>
          {data &&
          <><main className="w-full">
          <div className="m-4 p-2 rounded-2xl bg-white shadow-lg">
            <div className="text-gray-800 w-full font-semibold text-lg flex justify-between px-4">Quick Access <Ellipsis className="hover:cursor-pointer" /> </div>
            <div className={"mt-4 w-full mx-4 grid grid-cols-7 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-6 lg:gap-4 sm:gap-6 items-start"}>
              {data.files.map((item, index) => (
                <div key={index} className="w-48 hover:bg-slate-200 border border-gray-300 shadow p-4 rounded-md">
                  <FileIconSelect name={item.name} color="blue" size={36} />
                  <h1 className="mt-2 font-medium">{item.name}</h1>
                  <span className="flex text-slate-600">{item.size} <span><Dot /></span> 14 items </span>
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
                    <th className="text-slate-600 w-[220px] text-start font-normal">Sharing</th>
                    <th className="flex w-[120px] items-center text-slate-600 font-normal gap-2 justify-start">Size<ChevronDown size={16} /></th>
                    <th className="flex items-center text-slate-600 font-normal gap-2 justify-between">Modified<ChevronDown size={16} /></th>
                  </tr>
                </thead>
                <hr className="my-2 border-1" />
                <tbody className="w-full">
                  {data?.files.map((item, index) => <tr key={index} className="flex hover:bg-slate-400 transition my-2 gap-24 justify-start">
                    <th className="flex w-[190px] items-center mx-4 gap-4"><FileIconSelect name={item.name} color="blue"/>
                      <span className="font-medium">{item.name}</span>
                    </th>
                    <th className="mx-4 w-[220px] font-normal flex text-slate-700">
                      <span className="pr-2">{item.sharing}</span>  
                      {item && item.collaborators?.map((img_i,index)=>{
                      return <img src={img_i.avatar} key={index}
                      className="rounded-full -mr-0.5" width={24} height={24} />
                    })} </th>
                    <th className="mx-4 w-[120px] text-start font-normal text-slate-700">{item.size}</th>
                    <th className="mx-4 w-[160px] text-start font-normal text-slate-700">{item.modified}</th>
                    <th className="mx-4 px-2 text-center flex  hover:cursor-pointer"><Ellipsis className="text-slate-600" /></th>
                  </tr>)}

                </tbody>
              </table>
            </div>
          </div></>
          }
    </div>
  )
}
