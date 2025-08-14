"use client";
  
  interface Filters {
    role: string;
    status: string;
    department: string;
  }
  
  interface UserFiltersProps {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
  }
  
  export default function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
    const roles = ['all', 'Admin', 'Billable', 'Management', 'Non Billable'];
    const statuses = ['all', 'active', 'inactive', 'pending', 'suspended'];
    const departments = ['all', 'HR', 'Board of Directors', 'Marketing', 'IT Dept', 'Data Privacy Officer', 'Finance', 'Billables'];
  
    const handleFilterChange = (key: keyof Filters, value: string) => {
      onFiltersChange({ ...filters, [key]: value });
    };
  
    const clearFilters = () => {
      onFiltersChange({ role: 'all', status: 'all', department: 'all' });
    };
  
    const hasActiveFilters = filters.role !== 'all' || filters.status !== 'all' || filters.department !== 'all';
  
    const getFilterCount = () => {
      let count = 0;
      if (filters.role !== 'all') count++;
      if (filters.status !== 'all') count++;
      if (filters.department !== 'all') count++;
      return count;
    };
  
    return (
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Filters</h3>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {getFilterCount()} active
                </span>
                <button
                  onClick={clearFilters}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
  
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Role Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Role
              </label>
                                            <select
                 value={filters.role}
                 onChange={(e) => handleFilterChange('role', e.target.value)}
                 className="px-3 py-2 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 min-w-[120px] shadow-sm"
               >
                 {roles.map(role => (
                   <option key={role} value={role} className="py-2 px-3 hover:bg-blue-500 hover:text-white">
                     {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                   </option>
                 ))}
              </select>
            </div>
  
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Status
              </label>
                                            <select
                 value={filters.status}
                 onChange={(e) => handleFilterChange('status', e.target.value)}
                 className="px-3 py-2 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 min-w-[120px] shadow-sm"
               >
                 {statuses.map(status => (
                   <option key={status} value={status} className="py-2 px-3 hover:bg-blue-500 hover:text-white">
                     {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                   </option>
                 ))}
              </select>
            </div>
  
            {/* Department Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Department
              </label>
               <select
                 value={filters.department}
                 onChange={(e) => handleFilterChange('department', e.target.value)}
                 className="px-3 py-2 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 min-w-[140px] shadow-sm"
               >
                 {departments.map(dept => (
                   <option key={dept} value={dept} className="py-2 px-3 hover:bg-blue-500 hover:text-white">
                     {dept === 'all' ? 'All Departments' : dept}
                   </option>
                 ))}
               </select>
            </div>
          </div>
        </div>
  
        {/* Filter Tags */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="flex flex-wrap gap-2">
              {filters.role !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  Role: {filters.role}
                  <button
                    onClick={() => handleFilterChange('role', 'all')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-200"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.status !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Status: {filters.status}
                  <button
                    onClick={() => handleFilterChange('status', 'all')}
                    className="ml-2 hover:text-emerald-900 dark:hover:text-emerald-200"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.department !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  Department: {filters.department}
                  <button
                    onClick={() => handleFilterChange('department', 'all')}
                    className="ml-2 hover:text-purple-900 dark:hover:text-purple-200"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }