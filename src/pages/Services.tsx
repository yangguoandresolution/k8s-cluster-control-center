
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { Plus, Filter, RefreshCw, ExternalLink, ArrowUpDown } from 'lucide-react';

// Sample service data
const serviceData = [
  {
    id: 'svc-1',
    name: 'frontend-web-svc',
    namespace: 'default',
    type: 'LoadBalancer',
    clusterIp: '10.96.134.156',
    externalIp: '34.102.136.180',
    ports: '80:30080/TCP',
    status: 'healthy',
    age: '5d',
    selector: { app: 'frontend', tier: 'web' },
  },
  {
    id: 'svc-2',
    name: 'backend-api-svc',
    namespace: 'backend',
    type: 'ClusterIP',
    clusterIp: '10.96.167.218',
    externalIp: null,
    ports: '8080:30081/TCP',
    status: 'healthy',
    age: '2d',
    selector: { app: 'backend', tier: 'api' },
  },
  {
    id: 'svc-3',
    name: 'redis-cache-svc',
    namespace: 'database',
    type: 'ClusterIP',
    clusterIp: '10.96.44.125',
    externalIp: null,
    ports: '6379:32291/TCP',
    status: 'healthy',
    age: '8d',
    selector: { app: 'redis', tier: 'cache' },
  },
  {
    id: 'svc-4',
    name: 'metrics-collector-svc',
    namespace: 'monitoring',
    type: 'NodePort',
    clusterIp: '10.96.189.56',
    externalIp: null,
    ports: '9090:31090/TCP',
    status: 'healthy',
    age: '1d',
    selector: { app: 'metrics', tier: 'monitoring' },
  },
  {
    id: 'svc-5',
    name: 'auth-service-svc',
    namespace: 'security',
    type: 'LoadBalancer',
    clusterIp: '10.96.212.78',
    externalIp: '35.188.97.145',
    ports: '443:30443/TCP',
    status: 'warning',
    age: '4d',
    selector: { app: 'auth', tier: 'security' },
  },
];

const Services = () => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedServices = [...serviceData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (aValue === null) return sortDirection === 'asc' ? 1 : -1;
    if (bValue === null) return sortDirection === 'asc' ? -1 : 1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? (aValue > bValue ? 1 : -1) 
      : (aValue < bValue ? 1 : -1);
  });

  return (
    <PageLayout 
      title="Services" 
      description="Manage Kubernetes services that enable communication between application components."
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
            <CardTitle className="text-lg">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name
                        {sortField === 'name' && (
                          <ArrowUpDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center">
                        Type
                        {sortField === 'type' && (
                          <ArrowUpDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Cluster IP</TableHead>
                    <TableHead>External IP</TableHead>
                    <TableHead>Ports</TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortField === 'status' && (
                          <ArrowUpDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('age')}
                    >
                      <div className="flex items-center">
                        Age
                        {sortField === 'age' && (
                          <ArrowUpDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedServices.map((service) => (
                    <TableRow 
                      key={service.id}
                      className="cursor-pointer hover:bg-k8s-gray-50"
                      onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {service.name}
                          {service.externalIp && (
                            <ExternalLink size={14} className="ml-2 text-k8s-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.clusterIp}</TableCell>
                      <TableCell>{service.externalIp || '-'}</TableCell>
                      <TableCell>{service.ports}</TableCell>
                      <TableCell>
                        <StatusBadge status={service.status as any}>
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{service.age}</TableCell>
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
              <CardTitle className="text-lg">
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const service = serviceData.find(s => s.id === selectedService);
                if (!service) return null;
                
                return (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Service Info</h3>
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
                          <span className="text-sm text-k8s-gray-500">Cluster IP</span>
                          <span className="text-sm">{service.clusterIp}</span>
                        </div>
                        {service.externalIp && (
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">External IP</span>
                            <span className="text-sm">{service.externalIp}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                          <span className="text-sm text-k8s-gray-500">Ports</span>
                          <span className="text-sm">{service.ports}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Selectors</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(service.selector).map(([key, value]) => (
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

export default Services;
