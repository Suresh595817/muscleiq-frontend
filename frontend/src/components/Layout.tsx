import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Activity, User, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <div className="w-full max-w-md h-[100dvh] bg-dark text-white relative overflow-hidden shadow-2xl sm:border sm:border-dark-300 sm:rounded-3xl sm:h-[850px] sm:my-8">
          {children}
        </div>
      </div>);

  }
  const navItems = [
  {
    path: '/',
    icon: Home,
    label: 'Home'
  },
  {
    path: '/history',
    icon: Dumbbell,
    label: 'History'
  },
  {
    path: '/add',
    icon: Plus,
    label: 'Add',
    isFab: true
  },
  {
    path: '/muscles',
    icon: Activity,
    label: 'Muscles'
  },
  {
    path: '/profile',
    icon: User,
    label: 'Profile'
  }];

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center">
      <div className="w-full max-w-md h-[100dvh] bg-dark text-white relative overflow-hidden shadow-2xl sm:border sm:border-dark-300 sm:rounded-3xl sm:h-[850px] sm:my-8 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-dark-300 glass z-10">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-accent" />
            <span className="font-bold text-lg tracking-tight">
              Muscle<span className="text-accent">IQ</span>
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center border border-dark-200">
            <User className="w-4 h-4 text-gray-400" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative z-0">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="h-20 glass border-t border-dark-300 px-6 pb-4 pt-2 flex justify-between items-center z-10 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            if (item.isFab) {
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="relative -top-6 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-glow transition-transform active:scale-95">
                  
                  <Icon className="w-6 h-6" />
                </button>);

            }
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 w-12 transition-colors ${isActive ? 'text-accent' : 'text-gray-500 hover:text-gray-300'}`}>
                
                <Icon
                  className={`w-6 h-6 ${isActive ? 'fill-accent/20' : ''}`} />
                
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>);

          })}
        </nav>
      </div>
    </div>);

};