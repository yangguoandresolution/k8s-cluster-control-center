
import React from 'react';
import { Layers, Database, Server, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import TransitionWrapper from '../ui/TransitionWrapper';
import StatusBadge from '../ui/StatusBadge';
import MetricCard from '../ui/MetricCard';
import AreaChart from '../ui/AreaChart';

// Mock data for the charts
const cpuData = [
  { name: '00:00', value: 30 },
  { name: '04:00', value: 25 },
  { name: '08:00', value: 60 },
  { name: '12:00', value: 75 },
  { name: '16:00', value: 45 },
  { name: '20:00', value: 40 },
  { name: '24:00', value: 35 },
];

const memoryData = [
  { name: '00:00', value: 40 },
  { name: '04:00', value: 45 },
  { name: '08:00', value: 70 },
  { name: '12:00', value: 65 },
  { name: '16:00', value: 55 },
  { name: '20:00', value: 60 },
  { name: '24:00', value: 50 },
];

type ClusterCardProps = {
  cluster: {
    name: string;
    environment: string;
    status: 'healthy' | 'warning' | 'critical' | 'neutral';
    nodesCount: number;
    podsCount: number;
    deployments: number;
    cpu: {
      usage: number;
      total: number;
    };
    memory: {
      usage: number;
      total: number;
    };
  };
  className?: string;
  delay?: number;
};

const ClusterCard = ({ cluster, className, delay = 0 }: ClusterCardProps) => {
  const cpuPercentage = Math.round((cluster.cpu.usage / cluster.cpu.total) * 100);
  const memoryPercentage = Math.round((cluster.memory.usage / cluster.memory.total) * 100);

  return (
    <TransitionWrapper animation="slide-up" delay={delay} className={cn("neo-card", className)}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-k8s-gray-900">{cluster.name}</h3>
            <p className="text-sm text-k8s-gray-500">Environment: {cluster.environment}</p>
          </div>
          <StatusBadge status={cluster.status} />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col p-3 bg-k8s-gray-50 rounded-lg">
            <span className="text-xs text-k8s-gray-500 mb-1">Nodes</span>
            <div className="flex items-center">
              <Server size={14} className="text-k8s-blue mr-1.5" />
              <span className="text-lg font-medium">{cluster.nodesCount}</span>
            </div>
          </div>
          <div className="flex flex-col p-3 bg-k8s-gray-50 rounded-lg">
            <span className="text-xs text-k8s-gray-500 mb-1">Pods</span>
            <div className="flex items-center">
              <Database size={14} className="text-k8s-purple mr-1.5" />
              <span className="text-lg font-medium">{cluster.podsCount}</span>
            </div>
          </div>
          <div className="flex flex-col p-3 bg-k8s-gray-50 rounded-lg">
            <span className="text-xs text-k8s-gray-500 mb-1">Deployments</span>
            <div className="flex items-center">
              <Layers size={14} className="text-k8s-teal mr-1.5" />
              <span className="text-lg font-medium">{cluster.deployments}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">CPU</span>
              <span className={cn(
                "text-xs font-medium",
                cpuPercentage > 80 ? "text-k8s-red" :
                cpuPercentage > 60 ? "text-k8s-yellow" : "text-k8s-green"
              )}>
                {cpuPercentage}%
              </span>
            </div>
            <div className="progress-bar-track h-2">
              <div 
                className={cn(
                  "progress-bar-fill",
                  cpuPercentage > 80 ? "bg-k8s-red" :
                  cpuPercentage > 60 ? "bg-k8s-yellow" : "bg-k8s-green"
                )}
                style={{ width: `${cpuPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-k8s-gray-500">
              <span>{cluster.cpu.usage} cores</span>
              <span>{cluster.cpu.total} cores</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">Memory</span>
              <span className={cn(
                "text-xs font-medium",
                memoryPercentage > 80 ? "text-k8s-red" :
                memoryPercentage > 60 ? "text-k8s-yellow" : "text-k8s-green"
              )}>
                {memoryPercentage}%
              </span>
            </div>
            <div className="progress-bar-track h-2">
              <div 
                className={cn(
                  "progress-bar-fill",
                  memoryPercentage > 80 ? "bg-k8s-red" :
                  memoryPercentage > 60 ? "bg-k8s-yellow" : "bg-k8s-green"
                )}
                style={{ width: `${memoryPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-k8s-gray-500">
              <span>{cluster.memory.usage} GB</span>
              <span>{cluster.memory.total} GB</span>
            </div>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export const ClusterOverview = () => {
  // Mock data for clusters
  const clusters = [
    {
      name: "Production",
      environment: "prod",
      status: "healthy" as const,
      nodesCount: 12,
      podsCount: 48,
      deployments: 15,
      cpu: {
        usage: 32,
        total: 48,
      },
      memory: {
        usage: 128,
        total: 256,
      },
    },
    {
      name: "Staging",
      environment: "staging",
      status: "warning" as const,
      nodesCount: 6,
      podsCount: 24,
      deployments: 10,
      cpu: {
        usage: 15,
        total: 24,
      },
      memory: {
        usage: 78,
        total: 128,
      },
    },
    {
      name: "Development",
      environment: "dev",
      status: "healthy" as const,
      nodesCount: 3,
      podsCount: 12,
      deployments: 6,
      cpu: {
        usage: 6,
        total: 12,
      },
      memory: {
        usage: 24,
        total: 64,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <TransitionWrapper animation="fade">
          <h2 className="text-xl font-semibold mb-1">Cluster Overview</h2>
          <p className="text-sm text-k8s-gray-500 mb-4">Monitor and manage your Kubernetes clusters</p>
        </TransitionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clusters.map((cluster, index) => (
            <ClusterCard key={cluster.name} cluster={cluster} delay={index * 100} />
          ))}
        </div>
      </div>

      <div>
        <TransitionWrapper animation="fade" delay={100}>
          <h2 className="text-xl font-semibold mb-1">Resource Usage</h2>
          <p className="text-sm text-k8s-gray-500 mb-4">24-hour overview of system resources</p>
        </TransitionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransitionWrapper animation="slide-up" delay={100}>
            <div className="neo-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium">CPU Utilization</h3>
                  <p className="text-sm text-k8s-gray-500">Across all clusters</p>
                </div>
                <div className="flex items-center">
                  <Cpu size={16} className="text-k8s-blue mr-1.5" />
                  <span className="text-lg font-semibold">43%</span>
                </div>
              </div>
              <AreaChart 
                data={cpuData} 
                dataKey="value" 
                stroke="#2673E5" 
                height={180} 
                gradientFrom="rgba(38, 115, 229, 0.2)" 
                gradientTo="rgba(38, 115, 229, 0.0)" 
              />
            </div>
          </TransitionWrapper>

          <TransitionWrapper animation="slide-up" delay={150}>
            <div className="neo-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium">Memory Usage</h3>
                  <p className="text-sm text-k8s-gray-500">Across all clusters</p>
                </div>
                <div className="flex items-center">
                  <Database size={16} className="text-k8s-purple mr-1.5" />
                  <span className="text-lg font-semibold">58%</span>
                </div>
              </div>
              <AreaChart 
                data={memoryData} 
                dataKey="value" 
                stroke="#8353F1" 
                height={180} 
                gradientFrom="rgba(131, 83, 241, 0.2)" 
                gradientTo="rgba(131, 83, 241, 0.0)"
              />
            </div>
          </TransitionWrapper>
        </div>
      </div>
    </div>
  );
};

export default ClusterOverview;
