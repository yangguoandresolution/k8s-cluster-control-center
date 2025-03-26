
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { RefreshCw, Filter, MoreVertical, Cpu, Memory, HardDrive, Monitor } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import { AreaChart } from '@/components/ui/AreaChart';

// Sample nodes data
const nodesData = [
  {
    id: 'node-1',
    name: 'worker-node-1',
    status: 'healthy',
    roles: ['worker'],
    version: 'v1.26.3',
    internalIp: '10.240.0.10',
    externalIp: '35.222.43.121',
    age: '125d',
    cpu: {
      capacity: '8',
      used: '4.2',
      percent: 52.5
    },
    memory: {
      capacity: '32Gi',
      used: '18.4Gi',
      percent: 57.5
    },
    pods: {
      capacity: '110',
      used: '78',
      percent: 70.9
    },
    conditions: {
      ready: true,
      diskPressure: false,
      memoryPressure: false,
      pidPressure: false,
      networkUnavailable: false
    },
    labels: {
      'kubernetes.io/hostname': 'worker-node-1',
      'node.kubernetes.io/instance-type': 'e2-standard-8',
      'topology.kubernetes.io/zone': 'us-central1-a',
      'failure-domain.beta.kubernetes.io/zone': 'us-central1-a'
    }
  },
  {
    id: 'node-2',
    name: 'worker-node-2',
    status: 'healthy',
    roles: ['worker'],
    version: 'v1.26.3',
    internalIp: '10.240.0.11',
    externalIp: '35.222.43.122',
    age: '125d',
    cpu: {
      capacity: '8',
      used: '3.8',
      percent: 47.5
    },
    memory: {
      capacity: '32Gi',
      used: '16.8Gi',
      percent: 52.5
    },
    pods: {
      capacity: '110',
      used: '65',
      percent: 59.1
    },
    conditions: {
      ready: true,
      diskPressure: false,
      memoryPressure: false,
      pidPressure: false,
      networkUnavailable: false
    },
    labels: {
      'kubernetes.io/hostname': 'worker-node-2',
      'node.kubernetes.io/instance-type': 'e2-standard-8',
      'topology.kubernetes.io/zone': 'us-central1-b',
      'failure-domain.beta.kubernetes.io/zone': 'us-central1-b'
    }
  },
  {
    id: 'node-3',
    name: 'master-node-1',
    status: 'healthy',
    roles: ['master', 'control-plane'],
    version: 'v1.26.3',
    internalIp: '10.240.0.2',
    externalIp: '35.222.43.120',
    age: '125d',
    cpu: {
      capacity: '4',
      used: '2.1',
      percent: 52.5
    },
    memory: {
      capacity: '16Gi',
      used: '8.2Gi',
      percent: 51.3
    },
    pods: {
      capacity: '110',
      used: '32',
      percent: 29.1
    },
    conditions: {
      ready: true,
      diskPressure: false,
      memoryPressure: false,
      pidPressure: false,
      networkUnavailable: false
    },
    labels: {
      'kubernetes.io/hostname': 'master-node-1',
      'node.kubernetes.io/instance-type': 'e2-standard-4',
      'topology.kubernetes.io/zone': 'us-central1-a',
      'failure-domain.beta.kubernetes.io/zone': 'us-central1-a',
      'node-role.kubernetes.io/control-plane': '',
      'node-role.kubernetes.io/master': ''
    }
  },
  {
    id: 'node-4',
    name: 'worker-node-3',
    status: 'warning',
    roles: ['worker'],
    version: 'v1.26.3',
    internalIp: '10.240.0.12',
    externalIp: '35.222.43.123',
    age: '125d',
    cpu: {
      capacity: '8',
      used: '7.1',
      percent: 88.8
    },
    memory: {
      capacity: '32Gi',
      used: '29.5Gi',
      percent: 92.2
    },
    pods: {
      capacity: '110',
      used: '102',
      percent: 92.7
    },
    conditions: {
      ready: true,
      diskPressure: true,
      memoryPressure: true,
      pidPressure: false,
      networkUnavailable: false
    },
    labels: {
      'kubernetes.io/hostname': 'worker-node-3',
      'node.kubernetes.io/instance-type': 'e2-standard-8',
      'topology.kubernetes.io/zone': 'us-central1-c',
      'failure-domain.beta.kubernetes.io/zone': 'us-central1-c'
    }
  }
];

const cpuHistory = Array(24).fill(0).map((_, i) => ({
  name: `${i}h`,
  value: Math.floor(Math.random() * 30) + 40
}));

const memoryHistory = Array(24).fill(0).map((_, i) => ({
  name: `${i}h`,
  value: Math.floor(Math.random() * 25) + 45
}));

const Nodes = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // Calculate aggregated metrics
  const totalCpuCapacity = nodesData.reduce((acc, node) => acc + parseInt(node.cpu.capacity), 0);
  const totalMemoryCapacity = nodesData.reduce((acc, node) => {
    const memValue = parseInt(node.memory.capacity);
    return acc + memValue;
  }, 0);
  const totalPodCapacity = nodesData.reduce((acc, node) => acc + parseInt(node.pods.capacity), 0);
  
  const totalCpuUsed = nodesData.reduce((acc, node) => acc + parseFloat(node.cpu.used), 0);
  const totalPodsUsed = nodesData.reduce((acc, node) => acc + parseInt(node.pods.used), 0);
  
  return (
    <PageLayout 
      title="Nodes" 
      description="Manage and monitor the physical or virtual machines that make up your Kubernetes cluster."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button className="py-1.5 px-3 rounded-lg flex items-center text-sm font-medium border border-k8s-gray-200 bg-white hover:bg-k8s-gray-50">
            <Filter size={16} className="mr-1.5 text-k8s-gray-500" />
            <span>Filter</span>
          </button>
        </div>
        <button className="p-2 rounded-lg hover:bg-k8s-gray-100 text-k8s-gray-600">
          <RefreshCw size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <TransitionWrapper animation="slide-up" delay={100}>
          <MetricCard
            title="CPU Capacity"
            value={`${totalCpuCapacity} cores`}
            subtitle={`${totalCpuUsed.toFixed(1)} cores in use`}
            icon={<Cpu size={20} />}
            trend={{
              value: Math.round((totalCpuUsed / totalCpuCapacity) * 100),
              direction: 'up'
            }}
          />
        </TransitionWrapper>
        <TransitionWrapper animation="slide-up" delay={150}>
          <MetricCard
            title="Memory Capacity"
            value={`${totalMemoryCapacity} Gi`}
            subtitle="Across all nodes"
            icon={<Memory size={20} />}
          />
        </TransitionWrapper>
        <TransitionWrapper animation="slide-up" delay={200}>
          <MetricCard
            title="Pods"
            value={totalPodsUsed}
            subtitle={`of ${totalPodCapacity} capacity`}
            icon={<HardDrive size={20} />}
            trend={{
              value: Math.round((totalPodsUsed / totalPodCapacity) * 100),
              direction: 'up'
            }}
          />
        </TransitionWrapper>
      </div>
      
      <TransitionWrapper animation="fade" delay={100}>
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Cluster Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>CPU</TableHead>
                    <TableHead>Memory</TableHead>
                    <TableHead>Pods</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nodesData.map((node) => (
                    <TableRow 
                      key={node.id}
                      className="cursor-pointer hover:bg-k8s-gray-50"
                      onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                    >
                      <TableCell className="font-medium">{node.name}</TableCell>
                      <TableCell>
                        <StatusBadge status={node.status as any}>
                          {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {node.roles.map((role) => (
                            <span key={role} className="px-2 py-0.5 bg-k8s-gray-100 rounded text-xs">
                              {role}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-k8s-gray-100 rounded-full mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                node.cpu.percent > 80 ? 'bg-k8s-red' : 
                                node.cpu.percent > 60 ? 'bg-k8s-yellow' : 'bg-k8s-green'
                              }`}
                              style={{ width: `${node.cpu.percent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-k8s-gray-500">
                            {node.cpu.used}/{node.cpu.capacity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-k8s-gray-100 rounded-full mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                node.memory.percent > 80 ? 'bg-k8s-red' : 
                                node.memory.percent > 60 ? 'bg-k8s-yellow' : 'bg-k8s-green'
                              }`}
                              style={{ width: `${node.memory.percent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-k8s-gray-500">
                            {node.memory.used}/{node.memory.capacity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-k8s-gray-100 rounded-full mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                node.pods.percent > 80 ? 'bg-k8s-red' : 
                                node.pods.percent > 60 ? 'bg-k8s-yellow' : 'bg-k8s-green'
                              }`}
                              style={{ width: `${node.pods.percent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-k8s-gray-500">
                            {node.pods.used}/{node.pods.capacity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{node.version}</TableCell>
                      <TableCell>{node.age}</TableCell>
                      <TableCell>
                        <button className="p-1 rounded hover:bg-k8s-gray-200">
                          <MoreVertical size={14} className="text-k8s-gray-500" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TransitionWrapper>
      
      {selectedNode && (
        <TransitionWrapper animation="slide-up" className="mb-6">
          {(() => {
            const node = nodesData.find(n => n.id === selectedNode);
            if (!node) return null;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Node Details: {node.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Basic Info</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Name</span>
                            <span className="text-sm font-medium">{node.name}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Roles</span>
                            <span className="text-sm">{node.roles.join(', ')}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Internal IP</span>
                            <span className="text-sm">{node.internalIp}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">External IP</span>
                            <span className="text-sm">{node.externalIp}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Version</span>
                            <span className="text-sm">{node.version}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Age</span>
                            <span className="text-sm">{node.age}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Conditions</h3>
                        <div className="space-y-2">
                          {Object.entries(node.conditions).map(([condition, value]) => (
                            <div key={condition} className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">
                                {condition.charAt(0).toUpperCase() + condition.slice(1)}
                              </span>
                              <span className={`text-sm ${value === true ? 'text-k8s-green' : value === false ? 'text-k8s-red' : ''}`}>
                                {value ? 'True' : 'False'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Resource Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">CPU Usage</h3>
                          <span className="text-sm text-k8s-gray-500">
                            {node.cpu.used}/{node.cpu.capacity} cores
                          </span>
                        </div>
                        <div className="w-full h-3 bg-k8s-gray-100 rounded-full">
                          <div 
                            className={`h-3 rounded-full ${
                              node.cpu.percent > 80 ? 'bg-k8s-red' : 
                              node.cpu.percent > 60 ? 'bg-k8s-yellow' : 'bg-k8s-green'
                            }`}
                            style={{ width: `${node.cpu.percent}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Memory Usage</h3>
                          <span className="text-sm text-k8s-gray-500">
                            {node.memory.used}/{node.memory.capacity}
                          </span>
                        </div>
                        <div className="w-full h-3 bg-k8s-gray-100 rounded-full">
                          <div 
                            className={`h-3 rounded-full ${
                              node.memory.percent > 80 ? 'bg-k8s-red' : 
                              node.memory.percent > 60 ? 'bg-k8s-yellow' : 'bg-k8s-green'
                            }`}
                            style={{ width: `${node.memory.percent}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Pod Usage</h3>
                          <span className="text-sm text-k8s-gray-500">
                            {node.pods.used}/{node.pods.capacity} pods
                          </span>
                        </div>
                        <div className="w-full h-3 bg-k8s-gray-100 rounded-full">
                          <div 
                            className={`h-3 rounded-full ${
                              node.pods.percent > 80 ? 'bg-k8s-red' : 
                              node.pods.percent > 60 ? 'bg-k8s-yellow' : 'bg-k8s-green'
                            }`}
                            style={{ width: `${node.pods.percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })()}
        </TransitionWrapper>
      )}
      
      <TransitionWrapper animation="fade" delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">CPU Trend (Cluster)</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart 
                data={cpuHistory}
                dataKey="value"
                height={200}
                stroke="#3B82F6"
                gradientFrom="rgba(59, 130, 246, 0.4)"
                gradientTo="rgba(59, 130, 246, 0.0)"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Memory Trend (Cluster)</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart 
                data={memoryHistory}
                dataKey="value"
                height={200}
                stroke="#10B981"
                gradientFrom="rgba(16, 185, 129, 0.4)"
                gradientTo="rgba(16, 185, 129, 0.0)"
              />
            </CardContent>
          </Card>
        </div>
      </TransitionWrapper>
    </PageLayout>
  );
};

export default Nodes;
