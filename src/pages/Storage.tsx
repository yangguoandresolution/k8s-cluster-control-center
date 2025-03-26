
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/StatusBadge';
import { Database, HardDrive, Plus, RefreshCw, Layers } from 'lucide-react';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import MetricCard from '@/components/ui/MetricCard';

// Sample storage data
const storageClasses = [
  {
    id: 'sc-1',
    name: 'standard',
    provisioner: 'kubernetes.io/gce-pd',
    reclaimPolicy: 'Delete',
    volumeBindingMode: 'Immediate',
    isDefault: true,
    age: '125d',
  },
  {
    id: 'sc-2',
    name: 'premium-rwo',
    provisioner: 'kubernetes.io/gce-pd',
    reclaimPolicy: 'Delete',
    volumeBindingMode: 'Immediate',
    isDefault: false,
    age: '125d',
  },
  {
    id: 'sc-3',
    name: 'standard-rwx',
    provisioner: 'kubernetes.io/nfs',
    reclaimPolicy: 'Retain',
    volumeBindingMode: 'Immediate',
    isDefault: false,
    age: '98d',
  },
];

const persistentVolumes = [
  {
    id: 'pv-1',
    name: 'pv-data-001',
    capacity: '10Gi',
    accessModes: ['ReadWriteOnce'],
    reclaimPolicy: 'Delete',
    status: 'healthy',
    claim: 'default/postgres-data-claim',
    storageClass: 'standard',
    age: '5d',
  },
  {
    id: 'pv-2',
    name: 'pv-data-002',
    capacity: '50Gi',
    accessModes: ['ReadWriteOnce'],
    reclaimPolicy: 'Delete',
    status: 'healthy',
    claim: 'backend/api-data-claim',
    storageClass: 'premium-rwo',
    age: '2d',
  },
  {
    id: 'pv-3',
    name: 'pv-shared-001',
    capacity: '100Gi',
    accessModes: ['ReadWriteMany'],
    reclaimPolicy: 'Retain',
    status: 'healthy',
    claim: 'default/shared-files-claim',
    storageClass: 'standard-rwx',
    age: '8d',
  },
  {
    id: 'pv-4',
    name: 'pv-elastic-001',
    capacity: '200Gi',
    accessModes: ['ReadWriteOnce'],
    reclaimPolicy: 'Delete',
    status: 'warning',
    claim: 'monitoring/elastic-data-claim',
    storageClass: 'premium-rwo',
    age: '1d',
  },
];

const persistentVolumeClaims = [
  {
    id: 'pvc-1',
    name: 'postgres-data-claim',
    namespace: 'default',
    status: 'healthy',
    volume: 'pv-data-001',
    capacity: '10Gi',
    accessModes: ['ReadWriteOnce'],
    storageClass: 'standard',
    age: '5d',
  },
  {
    id: 'pvc-2',
    name: 'api-data-claim',
    namespace: 'backend',
    status: 'healthy',
    volume: 'pv-data-002',
    capacity: '50Gi',
    accessModes: ['ReadWriteOnce'],
    storageClass: 'premium-rwo',
    age: '2d',
  },
  {
    id: 'pvc-3',
    name: 'shared-files-claim',
    namespace: 'default',
    status: 'healthy',
    volume: 'pv-shared-001',
    capacity: '100Gi',
    accessModes: ['ReadWriteMany'],
    storageClass: 'standard-rwx',
    age: '8d',
  },
  {
    id: 'pvc-4',
    name: 'elastic-data-claim',
    namespace: 'monitoring',
    status: 'warning',
    volume: 'pv-elastic-001',
    capacity: '200Gi',
    accessModes: ['ReadWriteOnce'],
    storageClass: 'premium-rwo',
    age: '1d',
  },
];

type StorageTab = 'overview' | 'volumes' | 'claims' | 'classes';

const Storage = () => {
  const [activeTab, setActiveTab] = useState<StorageTab>('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TransitionWrapper animation="slide-up" delay={100}>
              <MetricCard
                title="Total Storage"
                value="360 Gi"
                subtitle="Allocated across all volumes"
                icon={<Database size={20} />}
                trend={{ value: 12, direction: 'up' }}
              />
            </TransitionWrapper>
            <TransitionWrapper animation="slide-up" delay={150}>
              <MetricCard
                title="Persistent Volumes"
                value={persistentVolumes.length}
                subtitle="Active volumes"
                icon={<HardDrive size={20} />}
              />
            </TransitionWrapper>
            <TransitionWrapper animation="slide-up" delay={200}>
              <MetricCard
                title="Storage Classes"
                value={storageClasses.length}
                subtitle="Available provisioners"
                icon={<Layers size={20} />}
              />
            </TransitionWrapper>
            
            <TransitionWrapper animation="slide-up" delay={250} className="md:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Recent PVCs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Namespace</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Volume</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Age</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {persistentVolumeClaims.slice(0, 3).map((claim) => (
                          <TableRow key={claim.id}>
                            <TableCell className="font-medium">{claim.name}</TableCell>
                            <TableCell>{claim.namespace}</TableCell>
                            <TableCell>
                              <StatusBadge status={claim.status as any}>
                                {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                              </StatusBadge>
                            </TableCell>
                            <TableCell>{claim.volume}</TableCell>
                            <TableCell>{claim.capacity}</TableCell>
                            <TableCell>{claim.age}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TransitionWrapper>
          </div>
        );

      case 'volumes':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Persistent Volumes</CardTitle>
                  <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
                    <Plus size={16} className="mr-1.5" />
                    <span>Create PV</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Access Modes</TableHead>
                        <TableHead>Reclaim Policy</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Claim</TableHead>
                        <TableHead>Storage Class</TableHead>
                        <TableHead>Age</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {persistentVolumes.map((volume) => (
                        <TableRow key={volume.id}>
                          <TableCell className="font-medium">{volume.name}</TableCell>
                          <TableCell>{volume.capacity}</TableCell>
                          <TableCell>{volume.accessModes.join(', ')}</TableCell>
                          <TableCell>{volume.reclaimPolicy}</TableCell>
                          <TableCell>
                            <StatusBadge status={volume.status as any}>
                              {volume.status.charAt(0).toUpperCase() + volume.status.slice(1)}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>{volume.claim}</TableCell>
                          <TableCell>{volume.storageClass}</TableCell>
                          <TableCell>{volume.age}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );

      case 'claims':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Persistent Volume Claims</CardTitle>
                  <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
                    <Plus size={16} className="mr-1.5" />
                    <span>Create PVC</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Namespace</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Access Modes</TableHead>
                        <TableHead>Storage Class</TableHead>
                        <TableHead>Age</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {persistentVolumeClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium">{claim.name}</TableCell>
                          <TableCell>{claim.namespace}</TableCell>
                          <TableCell>
                            <StatusBadge status={claim.status as any}>
                              {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>{claim.volume}</TableCell>
                          <TableCell>{claim.capacity}</TableCell>
                          <TableCell>{claim.accessModes.join(', ')}</TableCell>
                          <TableCell>{claim.storageClass}</TableCell>
                          <TableCell>{claim.age}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );

      case 'classes':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Storage Classes</CardTitle>
                  <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
                    <Plus size={16} className="mr-1.5" />
                    <span>Create Storage Class</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Provisioner</TableHead>
                        <TableHead>Reclaim Policy</TableHead>
                        <TableHead>Volume Binding Mode</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Age</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storageClasses.map((sc) => (
                        <TableRow key={sc.id}>
                          <TableCell className="font-medium">{sc.name}</TableCell>
                          <TableCell>{sc.provisioner}</TableCell>
                          <TableCell>{sc.reclaimPolicy}</TableCell>
                          <TableCell>{sc.volumeBindingMode}</TableCell>
                          <TableCell>{sc.isDefault ? 'Yes' : 'No'}</TableCell>
                          <TableCell>{sc.age}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout 
      title="Storage" 
      description="Manage persistent storage resources in your Kubernetes clusters."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="flex border border-k8s-gray-200 rounded-lg bg-white overflow-hidden">
            {(['overview', 'volumes', 'claims', 'classes'] as StorageTab[]).map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-sm ${
                  activeTab === tab
                    ? 'bg-k8s-blue text-white'
                    : 'text-k8s-gray-600 hover:bg-k8s-gray-50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-k8s-gray-100 text-k8s-gray-600">
          <RefreshCw size={16} />
        </button>
      </div>

      {renderTab()}
    </PageLayout>
  );
};

export default Storage;
