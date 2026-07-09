import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/AuthContext"
import AIChatbot from "../components/ai/AIChatbot"

const Layout = () => {
  const {user} = useAuth()
 
  return (
    <div className="flex h-screen bg-linear-to-br from-stone-50 via-white to-emerald-50/40">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
            <div className="p-4 pt-16 sm:p-6 sm:pt-6 lg:p-8 max-w-400 mx-auto">
                <Outlet />
            </div>
        </main>
        {user.role !== "ADMIN" && <AIChatbot />}
    </div>
  )
}

export default Layout