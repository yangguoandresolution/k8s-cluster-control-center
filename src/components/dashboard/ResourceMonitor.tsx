
import React from 'react';
import { Server, Database, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import TransitionWrapper from '../ui/TransitionWrapper';
import MetricCard from '../ui/MetricCard';
import StatusBadge from '../ui/StatusBadge';

type ResourceItemProps = {
  title: string;
  usage: string;
  status: 'healthy' | 'warning' | 'critical' | 'neutral';
  icon: React.ReactNode;
  delay?: number;
};

const ResourceItem = ({ title, usage, status, icon, delay = 0 }: ResourceItemProps) => {
  return (
    <TransitionWrapper animation="fade" delay={delay}>
      <div className="flex items-center justify-between p-3 border border-k8s-gray-200 rounded-lg hover:border-k8s-gray-300 transition-all duration-200 hover-lift">
        <div className="flex items-center">
          <div className="p-2 bg-k8s-gray-100 rounded-md text-k8s-gray-600 mr-3">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-xs text-k8s-gray-500">{usage}</p>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>
    </TransitionWrapper>
  );
};

export const ResourceMonitor = () => {
  const resources = [
    {
      title: "API Server",
      usage: "4.8 req/s",
      status: "healthy" as const,
      icon: <Server size={18} />,
    },
    {
      title: "etcd",
      usage: "1.2 ms latency",
      status: "healthy" as const,
      icon: <Database size={18} />,
    },
    {
      title: "Scheduler",
      usage: "32 sched/min",
      status: "healthy" as const,
      icon: <Clock size={18} />,
    },
    {
      title: "Controller Manager",
      usage: "8 ops/s",
      status: "warning" as const,
      icon: <Shield size={18} />,
    },
  ];

  return (
    <div>
      <TransitionWrapper animation="fade">
        <h2 className="text-xl font-semibold mb-1">Control Plane Health</h2>
        <p className="text-sm text-k8s-gray-500 mb-4">Status of key Kubernetes components</p>
      </TransitionWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <ResourceItem
            key={resource.title}
            title={resource.title}
            usage={resource.usage}
            status={resource.status}
            icon={resource.icon}
            delay={index * 75}
          />
        ))}
      </div>

      <div className="mt-6">
        <TransitionWrapper animation="fade" delay={100}>
          <h2 className="text-xl font-semibold mb-1">System Metrics</h2>
          <p className="text-sm text-k8s-gray-500 mb-4">Current resource utilization</p>
        </TransitionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="Nodes"
            value="21 / 24"
            subtitle="87.5% available"
            icon={<Server size={18} />}
            trend={{ value: 5, direction: 'up' }}
          />

          <MetricCard
            title="Pods"
            value="84 / 144"
            subtitle="58.3% utilized"
            icon={<Database size={18} />}
            trend={{ value: 12, direction: 'up' }}
          />

          <MetricCard
            title="CPU Utilization"
            value="43%"
            subtitle="53 / 124 cores"
            trend={{ value: 8, direction: 'down' }}
          />

          <MetricCard
            title="Memory Usage"
            value="58%"
            subtitle="230 / 396 GB"
            trend={{ value: 3, direction: 'up' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceMonitor;
