
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, XCircle, Clock, ArrowUpRight } from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';
import StatusBadge from '../ui/StatusBadge';

type WorkloadItemProps = {
  name: string;
  type: string;
  namespace: string;
  status: 'healthy' | 'warning' | 'critical' | 'pending';
  pods: {
    total: number;
    running: number;
    failed: number;
    pending: number;
  };
  age: string;
  delay?: number;
};

const WorkloadItem = ({ name, type, namespace, status, pods, age, delay = 0 }: WorkloadItemProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle size={16} className="text-k8s-green" />;
      case 'warning':
        return <AlertCircle size={16} className="text-k8s-yellow" />;
      case 'critical':
        return <XCircle size={16} className="text-k8s-red" />;
      case 'pending':
        return <Clock size={16} className="text-k8s-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <TransitionWrapper animation="slide-up" delay={delay}>
      <div className="neo-card p-4 hover-lift cursor-pointer group">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-medium mr-2">{name}</h3>
              <span className="text-xs bg-k8s-gray-100 text-k8s-gray-600 px-1.5 py-0.5 rounded">
                {type}
              </span>
            </div>
            <p className="text-xs text-k8s-gray-500 mt-1">Namespace: {namespace}</p>
          </div>
          <StatusBadge status={status} size="sm" />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <p className="text-xs text-k8s-gray-500">Total</p>
              <p className="text-sm font-medium">{pods.total}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-k8s-green">Running</p>
              <p className="text-sm font-medium">{pods.running}</p>
            </div>
            {pods.failed > 0 && (
              <div className="text-center">
                <p className="text-xs text-k8s-red">Failed</p>
                <p className="text-sm font-medium">{pods.failed}</p>
              </div>
            )}
            {pods.pending > 0 && (
              <div className="text-center">
                <p className="text-xs text-k8s-yellow">Pending</p>
                <p className="text-sm font-medium">{pods.pending}</p>
              </div>
            )}
          </div>
          <div className="text-xs text-k8s-gray-500">
            <span>{age}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-k8s-gray-100 flex justify-between items-center">
          <button className="text-xs text-k8s-blue hover:text-k8s-blue/80 transition-colors">
            View Details
          </button>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-k8s-gray-500 hover:text-k8s-gray-700 flex items-center">
            <span className="mr-1">Quick Actions</span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export const WorkloadStatus = () => {
  // Mock data for workloads
  const workloads = [
    {
      name: "frontend-web",
      type: "Deployment",
      namespace: "default",
      status: "healthy" as const,
      pods: { total: 3, running: 3, failed: 0, pending: 0 },
      age: "2d",
    },
    {
      name: "api-gateway",
      type: "Deployment",
      namespace: "api",
      status: "warning" as const,
      pods: { total: 5, running: 4, failed: 0, pending: 1 },
      age: "6h",
    },
    {
      name: "auth-service",
      type: "StatefulSet",
      namespace: "auth",
      status: "healthy" as const,
      pods: { total: 3, running: 3, failed: 0, pending: 0 },
      age: "5d",
    },
    {
      name: "database-primary",
      type: "StatefulSet",
      namespace: "db",
      status: "critical" as const,
      pods: { total: 2, running: 1, failed: 1, pending: 0 },
      age: "1d",
    },
    {
      name: "redis-cache",
      type: "Deployment",
      namespace: "cache",
      status: "healthy" as const,
      pods: { total: 2, running: 2, failed: 0, pending: 0 },
      age: "3d",
    },
    {
      name: "monitoring",
      type: "DaemonSet",
      namespace: "monitoring",
      status: "pending" as const,
      pods: { total: 21, running: 18, failed: 0, pending: 3 },
      age: "12h",
    },
  ];

  return (
    <div>
      <TransitionWrapper animation="fade">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Workload Status</h2>
            <p className="text-sm text-k8s-gray-500">Current state of deployments, statefulsets and daemonsets</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-xs bg-k8s-gray-100 hover:bg-k8s-gray-200 text-k8s-gray-700 px-3 py-1.5 rounded-lg transition-colors">
              Filter
            </button>
            <button className="text-xs bg-k8s-blue text-white px-3 py-1.5 rounded-lg hover:bg-k8s-blue/90 transition-colors">
              View All
            </button>
          </div>
        </div>
      </TransitionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workloads.map((workload, index) => (
          <WorkloadItem
            key={workload.name}
            name={workload.name}
            type={workload.type}
            namespace={workload.namespace}
            status={workload.status}
            pods={workload.pods}
            age={workload.age}
            delay={index * 75}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkloadStatus;
