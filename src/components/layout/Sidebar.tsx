
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Layers, 
  Database, 
  Server, 
  Settings, 
  Activity, 
  ChevronLeft, 
  ChevronRight,
  Terminal,
  BarChart,
  ShieldAlert,
  Network
} from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
  delay: number;
};

const SidebarItem = ({ icon, title, to, isActive, isCollapsed, delay }: SidebarItemProps) => {
  return (
    <TransitionWrapper animation="slide-right" delay={delay}>
      <Link
        to={to}
        className={cn(
          "flex items-center h-10 px-3 my-1 rounded-lg transition-colors duration-200 group",
          isActive 
            ? "bg-k8s-blue text-white font-medium" 
            : "text-k8s-gray-600 hover:bg-k8s-gray-100"
        )}
      >
        <div className="flex items-center">
          <div className={cn(
            "flex-shrink-0",
            isActive ? "text-white" : "text-k8s-gray-500 group-hover:text-k8s-blue"
          )}>
            {icon}
          </div>
          {!isCollapsed && (
            <span className={cn(
              "ml-3 transition-opacity duration-200",
              isCollapsed ? "opacity-0" : "opacity-100"
            )}>
              {title}
            </span>
          )}
        </div>
      </Link>
    </TransitionWrapper>
  );
};

type SidebarItemGroupProps = {
  title: string;
  isCollapsed: boolean;
  delay: number;
  children: React.ReactNode;
};

const SidebarItemGroup = ({ title, isCollapsed, delay, children }: SidebarItemGroupProps) => {
  return (
    <div className="mb-5">
      {!isCollapsed && (
        <TransitionWrapper animation="fade" delay={delay}>
          <h3 className="px-3 mb-1 text-xs font-medium text-k8s-gray-400 uppercase tracking-wider">
            {title}
          </h3>
        </TransitionWrapper>
      )}
      <div>{children}</div>
    </div>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const items = [
    {
      group: "Overview",
      items: [
        {
          title: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          to: "/",
        },
        {
          title: "Clusters",
          icon: <Network size={20} />,
          to: "/clusters",
        },
        {
          title: "Resources",
          icon: <BarChart size={20} />,
          to: "/resources",
        },
      ],
    },
    {
      group: "Workloads",
      items: [
        {
          title: "Deployments",
          icon: <Layers size={20} />,
          to: "/deployments",
        },
        {
          title: "Services",
          icon: <Activity size={20} />,
          to: "/services",
        },
        {
          title: "Storage",
          icon: <Database size={20} />,
          to: "/storage",
        },
      ],
    },
    {
      group: "Infrastructure",
      items: [
        {
          title: "Nodes",
          icon: <Server size={20} />,
          to: "/nodes",
        },
        {
          title: "Terminal",
          icon: <Terminal size={20} />,
          to: "/terminal",
        },
        {
          title: "Security",
          icon: <ShieldAlert size={20} />,
          to: "/security",
        },
      ],
    },
    {
      group: "Admin",
      items: [
        {
          title: "Settings",
          icon: <Settings size={20} />,
          to: "/settings",
        },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col border-r border-k8s-gray-200 bg-white h-screen z-30 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-k8s-gray-200">
        <TransitionWrapper animation="fade">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-md bg-k8s-blue text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                  <path d="M16 4L3 10L16 16L29 10L16 4Z" fill="currentColor" fillOpacity="0.7"/>
                  <path d="M3 10V22L16 28V16L3 10Z" fill="currentColor" fillOpacity="0.4"/>
                  <path d="M16 28L29 22V10L16 16V28Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            {!isCollapsed && (
              <TransitionWrapper animation="fade">
                <div className="ml-2 font-semibold text-k8s-gray-900">K8s Center</div>
              </TransitionWrapper>
            )}
          </div>
        </TransitionWrapper>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {items.map((group, groupIndex) => (
          <SidebarItemGroup 
            key={group.group} 
            title={group.group} 
            isCollapsed={isCollapsed}
            delay={groupIndex * 50}
          >
            {group.items.map((item, itemIndex) => (
              <SidebarItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                to={item.to}
                isActive={location.pathname === item.to}
                isCollapsed={isCollapsed}
                delay={(groupIndex * 100) + (itemIndex * 50) + 50}
              />
            ))}
          </SidebarItemGroup>
        ))}
      </div>

      <div className="border-t border-k8s-gray-200 p-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full h-8 rounded-lg bg-k8s-gray-100 text-k8s-gray-600 hover:bg-k8s-gray-200 transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!isCollapsed && <span className="ml-2 text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
