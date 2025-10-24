import { Activity, BellDot, Calendar, Contact, FolderClosed, Mountain, PersonStandingIcon, Search } from "lucide-react";

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

export default function Dashboard() {
  return (
    <div className="w-full bg-slate-200">
          <header className="w-full flex justify-start p-2">
            <div className="flex flex-1 w-1/4 items-center"> 
              <Mountain className="text-blue-500"/>
              <h1 className="text-xl ml-3">mountain</h1>
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
                <input type="text" className="mx-2 p-1 focus:ring-0 focus:border-0" placeholder="Search anything..."/> 
                <Search className="mx-1"/>
              </div>
              <BellDot className="mx-2"/>
              <PersonStandingIcon className="mx-2"/>
            </div>
          </header>
          <div className="w-full">
            <div className=""></div>
          </div>
    </div>
  )
}
