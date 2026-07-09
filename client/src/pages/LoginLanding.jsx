import { ArrowRightIcon, ShieldCheckIcon, UserIcon, Building2Icon, SparklesIcon } from "lucide-react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loading from "../components/Loading"

const LoginLanding = () => {
    const {user, loading} = useAuth()

    if(loading) return <Loading />
    if(user) return <Navigate to="/dashboard" />

    const portalOptions = [
        {
            to: "/login/admin",
            title: "Admin Portal",
            description: "Manage workforce, payroll, and system settings.",
            icon: ShieldCheckIcon,
            color: "from-emerald-500 to-teal-500",
            shadow: "shadow-emerald-500/20"
        },
        {
            to: "/login/employee",
            title: "Employee Portal",
            description: "Access attendance, time off, and payslips.",
            icon: UserIcon,
            color: "from-blue-500 to-indigo-500",
            shadow: "shadow-blue-500/20"
        }
    ]

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-emerald-500/30">
        
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[20%] bg-teal-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
        </div>

        <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Side - Brand & Info */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit mx-auto lg:mx-0 mb-8 backdrop-blur-md shadow-xl">
                    <SparklesIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-slate-300">Welcome to the future of work</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                    Employee <br className="hidden lg:block"/>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-400 animate-gradient">
                        Management System
                    </span>
                </h1>
                
                <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                    A centralized, AI-powered platform to manage attendance, process payroll, and empower your entire workforce with ease.
                </p>
                
                <div className="flex items-center justify-center lg:justify-start gap-8">
                    <div className="flex flex-col items-center lg:items-start gap-1">
                        <span className="text-3xl font-bold text-white">99.9%</span>
                        <span className="text-sm text-slate-500 font-medium">Uptime Guarantee</span>
                    </div>
                    <div className="w-px h-12 bg-white/10"></div>
                    <div className="flex flex-col items-center lg:items-start gap-1">
                        <span className="text-3xl font-bold text-white">24/7</span>
                        <span className="text-sm text-slate-500 font-medium">AI Assistance</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Portals */}
            <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 relative">
                
                {/* Glass Card */}
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 sm:p-10 shadow-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '150ms' }}>
                    
                    {/* Inner highlight */}
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-white shadow-lg mb-8">
                            <Building2Icon size={28} className="text-emerald-400" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-2">Secure Access</h2>
                        <p className="text-slate-400 text-sm mb-8">Please select your designated portal to authenticate.</p>

                        <div className="space-y-4">
                            {portalOptions.map((portal) => (
                                <Link 
                                    key={portal.to} 
                                    to={portal.to} 
                                    className="group relative flex items-center gap-5 p-4 bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300 overflow-hidden"
                                >
                                    {/* Hover gradient background */}
                                    <div className={`absolute inset-0 bg-linear-to-r ${portal.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                                    
                                    <div className={`w-12 h-12 shrink-0 rounded-xl bg-linear-to-br ${portal.color} flex items-center justify-center text-white shadow-lg ${portal.shadow} group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                        <portal.icon size={22} />
                                    </div>
                                    
                                    <div className="flex-1 relative z-10">
                                        <h3 className="text-base font-bold text-slate-200 group-hover:text-white transition-colors mb-0.5">
                                            {portal.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                                            {portal.description}
                                        </p>
                                    </div>

                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors relative z-10">
                                        <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
            </div>

        </div>
    </div>
  )
}

export default LoginLanding