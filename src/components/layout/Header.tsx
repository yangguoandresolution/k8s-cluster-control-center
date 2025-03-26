
import React, { useState } from 'react';
import { Bell, Search, User, ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import TransitionWrapper from '../ui/TransitionWrapper';

export const Header = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 border-b border-k8s-gray-200 bg-white z-20">
      <div className="h-full px-6 flex items-center justify-between">
        <TransitionWrapper animation="fade">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-k8s-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 h-9 w-64 bg-k8s-gray-100 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-k8s-blue/20 focus:border-k8s-blue transition-colors"
            />
          </div>
        </TransitionWrapper>

        <TransitionWrapper animation="fade" delay={100}>
          <div className="flex items-center space-x-4">
            <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
              <Plus size={16} className="mr-1.5" />
              <span>Add Cluster</span>
            </button>

            <div className="relative">
              <button
                className="relative p-2 rounded-lg hover:bg-k8s-gray-100 transition-colors"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={18} className="text-k8s-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-k8s-red rounded-full"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-k8s-gray-100 py-2 z-30">
                  <div className="px-4 py-2 border-b border-k8s-gray-100">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="px-4 py-3 hover:bg-k8s-gray-50 border-b border-k8s-gray-100 last:border-0">
                        <p className="text-sm font-medium">Pod restart detected</p>
                        <p className="text-xs text-k8s-gray-500 mt-1">
                          Pod web-server-{i} restarted in production cluster
                        </p>
                        <p className="text-xs text-k8s-gray-400 mt-1">10 min ago</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-k8s-gray-100">
                    <button className="text-xs text-k8s-blue font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-k8s-gray-100 flex items-center justify-center">
                  <User size={16} className="text-k8s-gray-600" />
                </div>
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown size={14} className="text-k8s-gray-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-k8s-gray-100 py-1 z-30">
                  <a href="#" className="block px-4 py-2 text-sm text-k8s-gray-700 hover:bg-k8s-gray-50">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-k8s-gray-700 hover:bg-k8s-gray-50">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-k8s-gray-700 hover:bg-k8s-gray-50">
                    API Keys
                  </a>
                  <div className="border-t border-k8s-gray-100 my-1"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-k8s-gray-700 hover:bg-k8s-gray-50">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </TransitionWrapper>
      </div>
    </header>
  );
};

export default Header;
