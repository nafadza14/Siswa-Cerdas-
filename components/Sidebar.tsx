import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut, CheckSquare, ShieldCheck, Database, RefreshCw, PenTool, Camera, CreditCard } from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  const commonLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  const teacherLinks = [
    { to: '/dashboard/attendance', icon: CheckSquare, label: 'Smart Attendance' },
    { to: '/dashboard/classes', icon: Users, label: 'My Classes' },
    { to: '/dashboard/cbt', icon: ShieldCheck, label: 'CBT Exam Manager' },
    { to: '/dashboard/blog', icon: PenTool, label: 'Blog Manager' },
  ];

  const studentLinks = [
    { to: '/dashboard/student-attendance', icon: Camera, label: 'Absensi (Scan)' }, // New
    { to: '/dashboard/schedule', icon: Calendar, label: 'Jadwal Pelajaran' },
    { to: '/dashboard/cbt', icon: BookOpen, label: 'Ujian Online' },
    { to: '/cards', icon: CreditCard, label: 'Kartu Siswa' },
  ];

  const adminLinks = [
    { to: '/dashboard/architecture', icon: Database, label: 'System Architecture' },
    { to: '/dashboard/blog', icon: PenTool, label: 'Blog Manager' },
  ];

  const getLinks = () => {
    let links = [...commonLinks];
    if (role === UserRole.TEACHER) links = [...links, ...teacherLinks];
    if (role === UserRole.STUDENT) links = [...links, ...studentLinks];
    if (role === UserRole.SUPER_ADMIN) links = [...links, ...adminLinks];
    return links;
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    // Navigate to appropriate landing page for the role
    if (newRole === UserRole.TEACHER) navigate('/dashboard/attendance');
    else if (newRole === UserRole.SUPER_ADMIN) navigate('/dashboard/architecture');
    else navigate('/dashboard');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}
      >
        <div className="h-20 flex flex-shrink-0 items-center px-8 border-b border-gray-100">
           <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-dark">Siswa<span className="text-primary">Cerdas</span></span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu ({role})</p>
          {getLinks().map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-semibold' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-dark'
                }`
              }
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Demo Role Switcher - For Preview Purposes */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Demo: Switch Role</p>
          <div className="flex flex-col gap-2">
             <button onClick={() => handleRoleSwitch(UserRole.STUDENT)} className="text-xs flex items-center text-gray-600 hover:text-primary">
                <Users size={14} className="mr-2"/> View as Student
             </button>
             <button onClick={() => handleRoleSwitch(UserRole.TEACHER)} className="text-xs flex items-center text-gray-600 hover:text-primary">
                <CheckSquare size={14} className="mr-2"/> View as Teacher
             </button>
             <button onClick={() => handleRoleSwitch(UserRole.SUPER_ADMIN)} className="text-xs flex items-center text-gray-600 hover:text-primary">
                <Database size={14} className="mr-2"/> View as Admin
             </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={() => navigate('/')} className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;