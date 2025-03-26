
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { Plus, Filter, RefreshCw, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

// Sample deployment data
const deploymentData = [
  {
    id: 'dep-1',
    name: 'frontend-web',
    namespace: 'default',
    replicas: '3/3',
    status: 'healthy',
    age: '5d',
    cluster: 'production',
    labels: { app: 'frontend', env: 'prod', tier: 'web' },
    lastUpdated: '2023-09-15T10:32:45Z',
  },
  {
    id: 'dep-2',
    name: 'backend-api',
    namespace: 'backend',
    replicas: '2/2',
    status: 'healthy',
    age: '2d',
    cluster: 'production',
    labels: { app: 'backend', env: 'prod', tier: 'api' },
    lastUpdated: '2023-09-17T14:22:12Z',
  },
  {
    id: 'dep-3',
    name: 'redis-cache',
    namespace: 'database',
    replicas: '3/3',
    status: 'healthy',
    age: '8d',
    cluster: 'production',
    labels: { app: 'redis', env: 'prod', tier: 'cache' },
    lastUpdated: '2023-09-12T08:15:33Z',
  },
  {
    id: 'dep-4',
    name: 'metrics-collector',
    namespace: 'monitoring',
    replicas: '1/1',
    status: 'healthy',
    age: '1d',
    cluster: 'production',
    labels: { app: 'metrics', env: 'prod', tier: 'monitoring' },
    lastUpdated: '2023-09-19T16:43:21Z',
  },
  {
    id: 'dep-5',
    name: 'auth-service',
    namespace: 'security',
    replicas: '2/3',
    status: 'warning',
    age: '4d',
    cluster: 'production',
    labels: { app: 'auth', env: 'prod', tier: 'security' },
    lastUpdated: '2023-09-16T09:11:05Z',
  },
];

const Deployments = () => {
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);

  return (
    <PageLayout 
      title="Deployments" 
      description="Manage and monitor Kubernetes deployments across your clusters."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
            <Plus size={16} className="mr-1.5" />
            <span>Create Deployment</span>
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

      <TransitionWrapper animation="fade" delay={100}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">All Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Namespace</TableHead>
                    <TableHead>Replicas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Cluster</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deploymentData.map((deployment) => (
                    <TableRow 
                      key={deployment.id}
                      className="cursor-pointer hover:bg-k8s-gray-50"
                      onClick={() => setSelectedDeployment(deployment.id === selectedDeployment ? null : deployment.id)}
                    >
                      <TableCell className="font-medium">{deployment.name}</TableCell>
                      <TableCell>{deployment.namespace}</TableCell>
                      <TableCell>{deployment.replicas}</TableCell>
                      <TableCell>
                        <StatusBadge status={deployment.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)} />
                      </TableCell>
                      <TableCell>{deployment.age}</TableCell>
                      <TableCell>{deployment.cluster}</TableCell>
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

      {selectedDeployment && (
        <TransitionWrapper animation="slide-up" delay={100} className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Deployment Details
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
                const deployment = deploymentData.find(d => d.id === selectedDeployment);
                if (!deployment) return null;
                
                return (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Deployment Info</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Name</span>
                          <span className="text-sm font-medium">{deployment.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Namespace</span>
                          <span className="text-sm">{deployment.namespace}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Cluster</span>
                          <span className="text-sm">{deployment.cluster}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Last Updated</span>
                          <span className="text-sm">{new Date(deployment.lastUpdated).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Labels</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(deployment.labels).map(([key, value]) => (
                          <div key={key} className="px-2 py-1 bg-k8s-gray-100 rounded text-xs">
                            {key}: {value}
                          </div>
                        ))}
                      </div>
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

export default Deployments;
