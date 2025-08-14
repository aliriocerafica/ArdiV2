"use client";

interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Billable' | 'Management' | 'Non Billable';
    status: 'active' | 'inactive' | 'pending' | 'suspended';
    lastLogin: string;
    joinDate: string;
    avatar?: string;
    department?: string;
    permissions?: string[];
  }
  
  interface UserStatsProps {
    users: User[];
  }
  
  export default function UserStats({ users }: UserStatsProps) {
    const stats = [
      {
        id: 'total',
        title: 'Total Users',
        value: users.length.toString(),
        change: '+12%',
        trend: 'up',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        ),
        gradient: 'from-blue-500 to-cyan-600',
        bgColor: 'from-blue-50 to-cyan-50/50 dark:from-blue-900/30 dark:to-cyan-900/20'
      },
      {
        id: 'active',
        title: 'Active Users',
        value: users.filter(u => u.status === 'active').length.toString(),
        change: '+8%',
        trend: 'up',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        gradient: 'from-emerald-500 to-teal-600',
        bgColor: 'from-emerald-50 to-teal-50/50 dark:from-emerald-900/30 dark:to-teal-900/20'
      },
      {
        id: 'pending',
        title: 'Pending Approval',
        value: users.filter(u => u.status === 'pending').length.toString(),
        change: '+15%',
        trend: 'up',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        gradient: 'from-amber-500 to-orange-600',
        bgColor: 'from-amber-50 to-orange-50/50 dark:from-amber-900/30 dark:to-orange-900/20'
      },
      {
        id: 'suspended',
        title: 'Suspended',
        value: users.filter(u => u.status === 'suspended').length.toString(),
        change: '-24%',
        trend: 'down',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364L18.364 5.636" />
          </svg>
        ),
        gradient: 'from-red-500 to-rose-600',
        bgColor: 'from-red-50 to-rose-50/50 dark:from-red-900/30 dark:to-rose-900/20'
      }
    ];
  
    const getTrendColor = (trend: string) => {
      return trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
    };
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`group relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${getTrendColor(stat.trend)} bg-white/70 dark:bg-slate-800/70`}>
                  <svg className={`w-3 h-3 ${stat.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-800 dark:group-hover:text-slate-50 transition-colors">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }