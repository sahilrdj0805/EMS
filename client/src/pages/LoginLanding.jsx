import { ArrowRightIcon, ShieldIcon, UserIcon, Building2Icon } from "lucide-react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loading from "../components/Loading"

const LoginLanding = () => {

    const {user, loading} = useAuth()

  if(loading) return <Loading />
  if(user) return <Navigate to="/" />

    const portalOptions = [
        {
            to: "/login/admin",
            title: "Admin Portal",
            description: "Manage workforce, payroll, and system settings.",
            icon: ShieldIcon,
            color: "emerald"
        },
        {
            to: "/login/employee",
            title: "Employee Portal",
            description: "Access attendance, time off, and payslips.",
            icon: UserIcon,
            color: "teal"
        }
    ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row">
            
            {/* Left Side - Brand & Info */}
            <div className="w-full md:w-5/12 p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-linear-to-b from-white/5 to-transparent">
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 mb-8">
                        <Building2Icon size={24} />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                        Modernizing your workforce.
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        A centralized platform to manage attendance, process payroll, and empower your team.
                    </p>
                </div>
                
                <div className="hidden md:block mt-20">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        Systems Operational
                    </div>
                </div>
            </div>

            {/* Right Side - Login Portals */}
            <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                <div className="max-w-md mx-auto w-full">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                    <p className="text-slate-500 mb-10">Select your designated portal to continue securely.</p>

                    <div className="space-y-4">
                        {portalOptions.map((portal) => (
                            <Link 
                                key={portal.to} 
                                to={portal.to} 
                                className="group flex items-start gap-5 p-5 sm:p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 shrink-0 rounded-xl bg-${portal.color}-50 flex items-center justify-center text-${portal.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                                    <portal.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center justify-between">
                                        {portal.title}
                                        <ArrowRightIcon className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" />
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {portal.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-400">
                            Secure access powered by EMS Portal
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default LoginLanding