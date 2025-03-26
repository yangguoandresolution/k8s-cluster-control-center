
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { Plus, Filter, RefreshCw, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

// Sample storage data
const persistentVolumesData = [
  {
    id: 'pv-1',
    name: 'data-volume-1',
    capacity: '10Gi',
    accessModes: ['ReadWriteOnce'],
    reclaimPolicy: 'Retain',
    status: 'healthy',
    claim: 'default/db-claim',
    storageClass: 'standard',
    age: '10d',
  },
  {
    id: 'pv-2',
    name: 'data-volume-2',
    capacity: '5Gi',
    accessModes: ['ReadWriteMany'],
    reclaimPolicy: 'Delete',
    status: 'healthy',
    claim: 'app/shared-claim',
    storageClass: 'fast',
    age: '5d',
  },
  {
    id: 'pv-3',
    name: 'backup-volume',
    capacity: '20Gi',
    accessModes: ['ReadOnlyMany'],
    reclaimPolicy: 'Retain',
    status: 'healthy',
    claim: 'backup/backup-claim',
    storageClass: 'standard',
    age: '15d',
  },
  {
    id: 'pv-4',
    name: 'logs-volume',
    capacity: '2Gi',
    accessModes: ['ReadWriteOnce'],
    reclaimPolicy: 'Delete',
    status: 'warning',
    claim: 'monitoring/logs-claim',
    storageClass: 'standard',
    age: '7d',
  },
];

const storageClassesData = [
  {
    id: 'sc-1',
    name: 'standard',
    provisioner: 'kubernetes.io/aws-ebs',
    reclaimPolicy: 'Delete',
    volumeBindingMode: 'Immediate',
    allowVolumeExpansion: true,
    age: '30d',
  },
  {
    id: 'sc-2',
    name: 'fast',
    provisioner: 'kubernetes.io/aws-ebs',
    reclaimPolicy: 'Delete',
    volumeBindingMode: 'Immediate',
    allowVolumeExpansion: true,
    age: '30d',
  },
  {
    id: 'sc-3',
    name: 'standard-gce',
    provisioner: 'kubernetes.io/gce-pd',
    reclaimPolicy: 'Delete',
    volumeBindingMode: 'WaitForFirstConsumer',
    allowVolumeExpansion: false,
    age: '15d',
  },
];

const Storage = () => {
  const [activeTab, setActiveTab] = useState<'volumes' | 'classes'>('volumes');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <PageLayout
      title="Storage" 
      description="Manage persistent volumes and storage classes in your Kubernetes clusters."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button
            className={`py-1.5 px-3 rounded-lg flex items-center text-sm font-medium ${
              activeTab === 'volumes' 
                ? 'bg-k8s-blue text-white shadow-sm' 
                : 'bg-white border border-k8s-gray-200 hover:bg-k8s-gray-50'
            }`}
            onClick={() => {
              setActiveTab('volumes');
              setSelectedItem(null);
            }}
          >
            Persistent Volumes
          </button>
          <button
            className={`py-1.5 px-3 rounded-lg flex items-center text-sm font-medium ${
              activeTab === 'classes' 
                ? 'bg-k8s-blue text-white shadow-sm' 
                : 'bg-white border border-k8s-gray-200 hover:bg-k8s-gray-50'
            }`}
            onClick={() => {
              setActiveTab('classes');
              setSelectedItem(null);
            }}
          >
            Storage Classes
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
            <Plus size={16} className="mr-1.5" />
            <span>Create {activeTab === 'volumes' ? 'Volume' : 'Storage Class'}</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-k8s-gray-100 text-k8s-gray-600">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {activeTab === 'volumes' && (
        <>
          <TransitionWrapper animation="fade" delay={100}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Persistent Volumes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Access Modes</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Claim</TableHead>
                        <TableHead>Storage Class</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {persistentVolumesData.map((volume) => (
                        <TableRow 
                          key={volume.id}
                          className="cursor-pointer hover:bg-k8s-gray-50"
                          onClick={() => setSelectedItem(volume.id === selectedItem ? null : volume.id)}
                        >
                          <TableCell className="font-medium">{volume.name}</TableCell>
                          <TableCell>{volume.capacity}</TableCell>
                          <TableCell>{volume.accessModes.join(', ')}</TableCell>
                          <TableCell>
                            <StatusBadge status={volume.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={volume.status.charAt(0).toUpperCase() + volume.status.slice(1)} />
                          </TableCell>
                          <TableCell>{volume.claim}</TableCell>
                          <TableCell>{volume.storageClass}</TableCell>
                          <TableCell>{volume.age}</TableCell>
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

          {selectedItem && activeTab === 'volumes' && (
            <TransitionWrapper animation="slide-up" delay={100} className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Volume Details
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
                    const volume = persistentVolumesData.find(v => v.id === selectedItem);
                    if (!volume) return null;
                    
                    return (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Basic Information</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Name</span>
                              <span className="text-sm font-medium">{volume.name}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Capacity</span>
                              <span className="text-sm">{volume.capacity}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Status</span>
                              <span className="text-sm">
                                <StatusBadge status={volume.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={volume.status.charAt(0).toUpperCase() + volume.status.slice(1)} />
                              </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Age</span>
                              <span className="text-sm">{volume.age}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Storage Details</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Access Modes</span>
                              <span className="text-sm">{volume.accessModes.join(', ')}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Reclaim Policy</span>
                              <span className="text-sm">{volume.reclaimPolicy}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Storage Class</span>
                              <span className="text-sm">{volume.storageClass}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                              <span className="text-sm text-k8s-gray-500">Claim</span>
                              <span className="text-sm">{volume.claim}</span>
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
        </>
      )}

      {activeTab === 'classes' && (
        <>
          <TransitionWrapper animation="fade" delay={100}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Storage Classes</CardTitle>
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
                        <TableHead>Allow Volume Expansion</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storageClassesData.map((storageClass) => (
                        <TableRow 
                          key={storageClass.id}
                          className="cursor-pointer hover:bg-k8s-gray-50"
                          onClick={() => setSelectedItem(storageClass.id === selectedItem ? null : storageClass.id)}
                        >
                          <TableCell className="font-medium">{storageClass.name}</TableCell>
                          <TableCell>{storageClass.provisioner}</TableCell>
                          <TableCell>{storageClass.reclaimPolicy}</TableCell>
                          <TableCell>{storageClass.volumeBindingMode}</TableCell>
                          <TableCell>{storageClass.allowVolumeExpansion ? 'Yes' : 'No'}</TableCell>
                          <TableCell>{storageClass.age}</TableCell>
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

          {selectedItem && activeTab === 'classes' && (
            <TransitionWrapper animation="slide-up" delay={100} className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Storage Class Details
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
                    const storageClass = storageClassesData.find(sc => sc.id === selectedItem);
                    if (!storageClass) return null;
                    
                    return (
                      <div>
                        <h3 className="text-sm font-medium mb-2">Storage Class Configuration</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Name</span>
                            <span className="text-sm font-medium">{storageClass.name}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Provisioner</span>
                            <span className="text-sm">{storageClass.provisioner}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Reclaim Policy</span>
                            <span className="text-sm">{storageClass.reclaimPolicy}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Volume Binding Mode</span>
                            <span className="text-sm">{storageClass.volumeBindingMode}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Allow Volume Expansion</span>
                            <span className="text-sm">{storageClass.allowVolumeExpansion ? 'Yes' : 'No'}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                            <span className="text-sm text-k8s-gray-500">Age</span>
                            <span className="text-sm">{storageClass.age}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </TransitionWrapper>
          )}
        </>
      )}
    </PageLayout>
  );
};

export default Storage;
