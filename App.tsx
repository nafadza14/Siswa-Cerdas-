
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Sidebar from './components/Sidebar';
import Attendance from './pages/dashboard/Attendance';
import StudentAttendance from './pages/dashboard/StudentAttendance'; // New
import StudentHome from './pages/dashboard/StudentHome';
import CBT from './pages/dashboard/CBT';
import Classes from './pages/dashboard/Classes'; 
import Schedule from './pages/dashboard/Schedule'; 
import SystemArchitecture from './pages/dashboard/SystemArchitecture'; 
import BlogManager from './pages/dashboard/BlogManager';
import BlogPublic from './pages/BlogPublic';
import BlogDetail from './pages/BlogDetail';
import CardGenerator from './pages/CardGenerator'; 
import { UserRole } from './types';
import { Bell, Search, Menu, Clock } from 'lucide-react';
import { CARD_PHOTO_MAIN } from './constants';

const RealtimeHeaderClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 text-primary font-mono font-bold text-sm border border-gray-100">
      <Clock size={16} />
      <span>{time.toLocaleTimeString('id-ID', { hour12: false })}</span>
    </div>
  );
};

const DashboardLayout: React.FC<{ children: React.ReactNode; role: UserRole }> = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes('student-attendance')) return 'Absensi';
    if (location.pathname.includes('attendance')) return 'Smart Attendance';
    if (location.pathname.includes('cbt')) return 'Computer Based Test';
    if (location.pathname.includes('classes')) return 'Class Management';
    if (location.pathname.includes('schedule')) return 'My Schedule';
    if (location.pathname.includes('architecture')) return 'Architecture';
    if (location.pathname.includes('blog')) return 'Blog Manager';
    if (location.pathname.includes('cards')) return 'Student ID Card';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar role={role} isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="md:ml-64 transition-all duration-300">
        {/* Topbar */}
        <header className="bg-white h-20 border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-dark hidden sm:block">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
             <RealtimeHeaderClock />

             <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 text-gray-500">
                <Search size={18} />
                <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none ml-2 text-sm w-32 lg:w-48" />
             </div>
             
             <div className="relative">
                <Bell size={20} className="text-gray-500 hover:text-primary cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
             </div>

             <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-dark">
                    {role === UserRole.TEACHER ? 'Pak Budi' : role === UserRole.STUDENT ? 'Clara' : 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{role.replace('_', ' ').toLowerCase()}</p>
                </div>
                <img 
                  src={CARD_PHOTO_MAIN} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border border-gray-200 object-cover" 
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

// Moved outside to prevent re-creation on every render
const DemoWrapper = ({ role, component: Component }: { role: UserRole, component: React.FC }) => (
  <DashboardLayout role={role}>
    <Component />
  </DashboardLayout>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Public Routes */}
        <Route path="/blog" element={<BlogPublic />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/cards" element={<CardGenerator />} />
        
        {/* Student Routes */}
        <Route path="/dashboard" element={<DemoWrapper role={UserRole.STUDENT} component={StudentHome} />} />
        <Route path="/dashboard/student-attendance" element={<DemoWrapper role={UserRole.STUDENT} component={StudentAttendance} />} />
        <Route path="/dashboard/schedule" element={<DemoWrapper role={UserRole.STUDENT} component={Schedule} />} />
        
        {/* Teacher Routes */}
        <Route path="/dashboard/attendance" element={<DemoWrapper role={UserRole.TEACHER} component={Attendance} />} />
        <Route path="/dashboard/classes" element={<DemoWrapper role={UserRole.TEACHER} component={Classes} />} />
        <Route path="/dashboard/blog" element={<DemoWrapper role={UserRole.TEACHER} component={BlogManager} />} />
        
        {/* Shared/Hybrid Routes */}
        <Route path="/dashboard/cbt" element={<DemoWrapper role={UserRole.STUDENT} component={CBT} />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard/architecture" element={<DemoWrapper role={UserRole.SUPER_ADMIN} component={SystemArchitecture} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
