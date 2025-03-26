
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { Plus, Filter, RefreshCw, MoreHorizontal, Edit, ExternalLink, Trash2 } from 'lucide-react';

// Sample services data
const servicesData = [
  {
    id: 'svc-1',
    name: 'frontend-service',
    namespace: 'default',
    type: 'LoadBalancer',
    clusterIP: '10.96.0.1',
    externalIP: '34.123.45.67',
    ports: '80:30080/TCP',
    status: 'healthy',
    age: '5d',
  },
  {
    id: 'svc-2',
    name: 'backend-api',
    namespace: 'backend',
    type: 'ClusterIP',
    clusterIP: '10.96.0.2',
    externalIP: '-',
    ports: '8080:32080/TCP',
    status: 'healthy',
    age: '2d',
  },
  {
    id: 'svc-3',
    name: 'redis-cache',
    namespace: 'database',
    type: 'ClusterIP',
    clusterIP: '10.96.0.3',
    externalIP: '-',
    ports: '6379:31079/TCP',
    status: 'healthy',
    age: '8d',
  },
  {
    id: 'svc-4',
    name: 'metrics-service',
    namespace: 'monitoring',
    type: 'NodePort',
    clusterIP: '10.96.0.4',
    externalIP: '-',
    ports: '9090:30090/TCP',
    status: 'warning',
    age: '1d',
  },
  {
    id: 'svc-5',
    name: 'auth-service',
    namespace: 'security',
    type: 'LoadBalancer',
    clusterIP: '10.96.0.5',
    externalIP: '34.123.45.68',
    ports: '443:30443/TCP',
    status: 'warning',
    age: '4d',
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <PageLayout
      title="Services" 
      description="Manage and monitor Kubernetes services across your clusters."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
            <Plus size={16} className="mr-1.5" />
            <span>Create Service</span>
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
            <CardTitle className="text-lg">All Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Namespace</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Cluster IP</TableHead>
                    <TableHead>External IP</TableHead>
                    <TableHead>Ports</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicesData.map((service) => (
                    <TableRow 
                      key={service.id}
                      className="cursor-pointer hover:bg-k8s-gray-50"
                      onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
                    >
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.namespace}</TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.clusterIP}</TableCell>
                      <TableCell>{service.externalIP}</TableCell>
                      <TableCell>{service.ports}</TableCell>
                      <TableCell>
                        <StatusBadge status={service.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={service.status.charAt(0).toUpperCase() + service.status.slice(1)} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {service.externalIP !== '-' && (
                            <button className="p-1 rounded hover:bg-k8s-gray-100">
                              <ExternalLink size={14} className="text-k8s-gray-500" />
                            </button>
                          )}
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

      {selectedService && (
        <TransitionWrapper animation="slide-up" delay={100} className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Service Details
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
                const service = servicesData.find(s => s.id === selectedService);
                if (!service) return null;
                
                return (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Basic Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Name</span>
                          <span className="text-sm font-medium">{service.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Namespace</span>
                          <span className="text-sm">{service.namespace}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Type</span>
                          <span className="text-sm">{service.type}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Age</span>
                          <span className="text-sm">{service.age}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Networking</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Cluster IP</span>
                          <span className="text-sm">{service.clusterIP}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">External IP</span>
                          <span className="text-sm">{service.externalIP}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Ports</span>
                          <span className="text-sm">{service.ports}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Status</span>
                          <span className="text-sm">
                            <StatusBadge status={service.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={service.status.charAt(0).toUpperCase() + service.status.slice(1)} />
                          </span>
                        </div>
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

export default Services;
