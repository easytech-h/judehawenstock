import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, LayoutDashboard, Box, DollarSign, FileText, History, LogOut, RefreshCw, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleResetSystem = () => {
    if (window.confirm('Are you sure you want to reset the system? This action cannot be undone.')) {
      // Reset logic goes here
      console.log('System reset');
    }
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-white" />
            <span className="ml-2 text-white font-semibold text-lg">EASYTECH MASTER STOCK</span>
          </div>
          <div className="flex items-center">
            <Link to="/dashboard" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              <LayoutDashboard className="inline-block mr-1" size={18} />
              Dashboard
            </Link>
            <Link to="/inventory" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              <Box className="inline-block mr-1" size={18} />
              Inventory
            </Link>
            <Link to="/sales" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              <DollarSign className="inline-block mr-1" size={18} />
              Sales
            </Link>
            <Link to="/reports" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              <FileText className="inline-block mr-1" size={18} />
              Reports
            </Link>
            <Link to="/sales-history" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              <History className="inline-block mr-1" size={18} />
              Sales History
            </Link>
            <Link to="/settings" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              <Settings className="inline-block mr-1" size={18} />
              Settings
            </Link>
            {user?.isSuperAdmin && (
              <button
                onClick={handleResetSystem}
                className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                <RefreshCw className="inline-block mr-1" size={18} />
                Reset System
              </button>
            )}
            <button
              onClick={handleLogout}
              className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogOut className="inline-block mr-1" size={18} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;