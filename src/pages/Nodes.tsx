
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { 
  Plus, Filter, RefreshCw, MoreHorizontal, Edit, 
  Trash2, Cpu, HardDrive, Network
} from 'lucide-react';

// Sample nodes data
const nodesData = [
  {
    id: 'node-1',
    name: 'worker-node-1',
    status: 'healthy',
    role: 'worker',
    instanceType: 't3.large',
    zone: 'us-east-1a',
    cpu: '2/4 cores',
    memory: '4/8 GiB',
    age: '30d',
    labels: {
      'kubernetes.io/hostname': 'worker-node-1',
      'node.kubernetes.io/instance-type': 't3.large',
      'topology.kubernetes.io/zone': 'us-east-1a',
      'node-role.kubernetes.io/worker': '',
    },
    taints: [],
  },
  {
    id: 'node-2',
    name: 'worker-node-2',
    status: 'healthy',
    role: 'worker',
    instanceType: 't3.large',
    zone: 'us-east-1b',
    cpu: '3/4 cores',
    memory: '6/8 GiB',
    age: '30d',
    labels: {
      'kubernetes.io/hostname': 'worker-node-2',
      'node.kubernetes.io/instance-type': 't3.large',
      'topology.kubernetes.io/zone': 'us-east-1b',
      'node-role.kubernetes.io/worker': '',
    },
    taints: [],
  },
  {
    id: 'node-3',
    name: 'worker-node-3',
    status: 'warning',
    role: 'worker',
    instanceType: 't3.large',
    zone: 'us-east-1c',
    cpu: '4/4 cores',
    memory: '7/8 GiB',
    age: '30d',
    labels: {
      'kubernetes.io/hostname': 'worker-node-3',
      'node.kubernetes.io/instance-type': 't3.large',
      'topology.kubernetes.io/zone': 'us-east-1c',
      'node-role.kubernetes.io/worker': '',
    },
    taints: [
      {
        key: 'dedicated',
        value: 'high-memory',
        effect: 'NoSchedule',
      },
    ],
  },
  {
    id: 'node-4',
    name: 'control-plane-1',
    status: 'healthy',
    role: 'control-plane',
    instanceType: 'm5.large',
    zone: 'us-east-1a',
    cpu: '1/2 cores',
    memory: '2/4 GiB',
    age: '45d',
    labels: {
      'kubernetes.io/hostname': 'control-plane-1',
      'node.kubernetes.io/instance-type': 'm5.large',
      'topology.kubernetes.io/zone': 'us-east-1a',
      'node-role.kubernetes.io/control-plane': '',
    },
    taints: [
      {
        key: 'node-role.kubernetes.io/control-plane',
        value: '',
        effect: 'NoSchedule',
      },
    ],
  },
];

const Nodes = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <PageLayout
      title="Nodes" 
      description="Manage and monitor Kubernetes nodes in your clusters."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
            <Plus size={16} className="mr-1.5" />
            <span>Add Node</span>
          </button>
          <button className="py-1.5 px-3 rounded-lg flex items-center text-sm font-medium border border-k8s-gray-200 bg-white hover:bg-k8s-gray-50">
            <Filter size={16} className="mr-1.5 text-k8s-gray-500" />
            <span>Filter</span>
          </button>
        </div>
        <button className="p-2 rounded-lg hover:bg-k8s-gray-100 text-k8s-gray-600">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <TransitionWrapper animation="fade" delay={100}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-k8s-blue-50 flex items-center justify-center mr-3">
                  <Cpu size={20} className="text-k8s-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-k8s-gray-500">Total Nodes</div>
                  <div className="text-xl font-semibold">{nodesData.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TransitionWrapper>

        <TransitionWrapper animation="fade" delay={200}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-k8s-green-50 flex items-center justify-center mr-3">
                  <HardDrive size={20} className="text-k8s-green-500" />
                </div>
                <div>
                  <div className="text-sm text-k8s-gray-500">Healthy Nodes</div>
                  <div className="text-xl font-semibold">{nodesData.filter(node => node.status === 'healthy').length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TransitionWrapper>

        <TransitionWrapper animation="fade" delay={300}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-k8s-yellow-50 flex items-center justify-center mr-3">
                  <Network size={20} className="text-k8s-yellow-500" />
                </div>
                <div>
                  <div className="text-sm text-k8s-gray-500">Warning Nodes</div>
                  <div className="text-xl font-semibold">{nodesData.filter(node => node.status === 'warning').length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TransitionWrapper>
      </div>

      <TransitionWrapper animation="fade" delay={100}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">All Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Instance Type</TableHead>
                    <TableHead>CPU</TableHead>
                    <TableHead>Memory</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                        <StatusBadge status={node.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={node.status.charAt(0).toUpperCase() + node.status.slice(1)} />
                      </TableCell>
                      <TableCell>{node.role}</TableCell>
                      <TableCell>{node.instanceType}</TableCell>
                      <TableCell>{node.cpu}</TableCell>
                      <TableCell>{node.memory}</TableCell>
                      <TableCell>{node.zone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1 rounded hover:bg-k8s-gray-100">
                            <Edit size={14} className="text-k8s-gray-500" />
                          </button>
                          <button className="p-1 rounded hover:bg-k8s-gray-100">
                            <MoreHorizontal size={14} className="text-k8s-gray-500" />
                          </button>
                        </div>
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
        <TransitionWrapper animation="slide-up" delay={100} className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Node Details
                </CardTitle>
                <div className="flex space-x-2">
                  <button className="p-1.5 rounded hover:bg-k8s-gray-100">
                    <Edit size={14} className="text-k8s-gray-500" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-k8s-gray-100">
                    <Trash2 size={14} className="text-k8s-red" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                const node = nodesData.find(n => n.id === selectedNode);
                if (!node) return null;
                
                return (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Basic Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Name</span>
                          <span className="text-sm font-medium">{node.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Status</span>
                          <span className="text-sm">
                            <StatusBadge status={node.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={node.status.charAt(0).toUpperCase() + node.status.slice(1)} />
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Role</span>
                          <span className="text-sm">{node.role}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Instance Type</span>
                          <span className="text-sm">{node.instanceType}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Age</span>
                          <span className="text-sm">{node.age}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium mt-4 mb-2">Resources</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">CPU Usage</span>
                          <span className="text-sm">{node.cpu}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Memory Usage</span>
                          <span className="text-sm">{node.memory}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Zone</span>
                          <span className="text-sm">{node.zone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Labels</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(node.labels).map(([key, value]) => (
                          <div key={key} className="px-2 py-1 bg-k8s-gray-100 rounded text-xs text-k8s-gray-700">
                            {key}: {value || ''}
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="text-sm font-medium mt-4 mb-2">Taints</h3>
                      {node.taints.length > 0 ? (
                        <div className="space-y-2">
                          {node.taints.map((taint, idx) => (
                            <div key={idx} className="py-1 px-2 border border-k8s-gray-200 rounded-md">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium bg-k8s-gray-100 px-1.5 py-0.5 rounded">
                                  {taint.key}
                                </span>
                                {taint.value && (
                                  <span className="text-xs text-k8s-gray-600">= {taint.value}</span>
                                )}
                                <span className="text-xs ml-auto bg-k8s-blue-100 text-k8s-blue-700 px-1.5 py-0.5 rounded">
                                  {taint.effect}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-k8s-gray-500">No taints</div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </TransitionWrapper>
      )}
    </PageLayout>
  );
};

export default Nodes;
