"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import UserTable from "../../components/UserTable";
import UserModal from "../../components/UserModal";
import UserFilters from "../../components/UserFilters";
import UserStats from "../../components/UserStats";

interface User {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: 'Admin' | 'Billable' | 'Management' | 'Non Billable';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: string;
  joinDate: string;
  avatar?: string;
  department?: string;
  permissions?: string[];
}

export default function UserManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    department: 'all'
  });
  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      employeeId: 'EMP001',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-08-02T10:30:00Z',
      joinDate: '2024-01-15T00:00:00Z',
      department: 'Engineering',
      permissions: ['read', 'write', 'delete', 'admin']
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      employeeId: 'EMP002',
      role: 'Billable',
      status: 'active',
      lastLogin: '2024-08-02T09:15:00Z',
      joinDate: '2024-02-20T00:00:00Z',
      department: 'Marketing',
      permissions: ['read', 'write', 'moderate']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      employeeId: 'EMP003',
      role: 'Management',
      status: 'inactive',
      lastLogin: '2024-07-30T14:22:00Z',
      joinDate: '2024-03-10T00:00:00Z',
      department: 'Sales',
      permissions: ['read', 'write']
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      employeeId: 'EMP004',
      role: 'Non Billable',
      status: 'pending',
      lastLogin: 'Never',
      joinDate: '2024-08-01T00:00:00Z',
      department: 'HR',
      permissions: ['read']
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@example.com',
      employeeId: 'EMP005',
      role: 'Billable',
      status: 'suspended',
      lastLogin: '2024-07-28T16:45:00Z',
      joinDate: '2024-04-05T00:00:00Z',
      department: 'Finance',
      permissions: ['read']
    }
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesDepartment = filters.department === 'all' || user.department === filters.department;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'activate':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'active' as const } : user
        ));
        break;
      case 'suspend':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'suspended' as const } : user
        ));
        break;
      case 'delete':
        setUsers(users.filter(user => !selectedUsers.includes(user.id)));
        break;
    }
    setSelectedUsers([]);
  };

  const handleSaveUser = async (userData: Partial<User>) => {
    if (editingUser) {
      // Update existing user - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      ));
      // Don't close modal immediately - let UserModal handle it
    } else {
      // Add new user - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        employeeId: userData.employeeId || '',
        role: userData.role || 'Non Billable',
        status: userData.status || 'pending',
        lastLogin: 'Never',
        joinDate: new Date().toISOString(),
        department: userData.department,
        permissions: userData.permissions || ['read']
      };
      setUsers([...users, newUser]);
    }
  };

  const handleResetPassword = async (userId: string) => {
    // Simulate API call for password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the user and log success
    const user = users.find(u => u.id === userId);
    if (user) {
      // In a real application, this would send an email with a temporary password
      console.log(`Password reset email sent to ${user.email}`);
      // Removed alert - let the UserModal handle the success message
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 relative">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden fixed top-6 left-6 z-30 group p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Floating Search Bar */}
        <div className="fixed top-6 right-12 z-20 w-full max-w-2xl">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : 'scale-100'}`}>
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-2xl">
              <div className="flex items-center px-6 py-4">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <input
                  type="text"
                  placeholder="Search users by name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium text-lg"
                />
                
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="flex-shrink-0 ml-4 p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                
                <div className="flex-shrink-0 ml-4">
                  <button 
                    onClick={handleAddUser}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-28 lg:pt-32 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  User Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg font-medium">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {filteredUsers.length} of {users.length} users
                </div>
                {selectedUsers.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {selectedUsers.length} selected
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleBulkAction('activate')}
                        className="px-3 py-1 text-xs rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                      >
                        Activate
                      </button>
                      <button
                        onClick={() => handleBulkAction('suspend')}
                        className="px-3 py-1 text-xs rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* User Stats */}
            <UserStats users={users} />

            {/* Filters */}
            <UserFilters filters={filters} onFiltersChange={setFilters} />

            {/* User Table */}
            <UserTable
              users={filteredUsers}
              selectedUsers={selectedUsers}
              onSelectedUsersChange={setSelectedUsers}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          </div>
        </div>

        {/* User Modal */}
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => {
            setIsUserModalOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
          onResetPassword={handleResetPassword}
          user={editingUser}
        />

        {/* Mobile Status Bar */}
        <div className="lg:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-700/60 px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">User Management</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {filteredUsers.length} users
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}