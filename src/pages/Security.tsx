
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { 
  Plus, Filter, RefreshCw, MoreHorizontal, Edit, Trash2, 
  ShieldAlert, ShieldCheck, Lock, AlertTriangle
} from 'lucide-react';

// Sample security data
const securityPoliciesData = [
  {
    id: 'policy-1',
    name: 'restrict-root-containers',
    scope: 'Cluster',
    enforcement: 'enabled',
    status: 'healthy',
    age: '10d',
  },
  {
    id: 'policy-2',
    name: 'require-ro-root-filesystem',
    scope: 'Namespace',
    namespaces: ['default', 'kube-system'],
    enforcement: 'enabled',
    status: 'healthy',
    age: '5d',
  },
  {
    id: 'policy-3',
    name: 'restrict-capabilities',
    scope: 'Cluster',
    enforcement: 'audit',
    status: 'warning',
    age: '3d',
  },
  {
    id: 'policy-4',
    name: 'require-non-root-user',
    scope: 'Namespace',
    namespaces: ['default', 'apps'],
    enforcement: 'disabled',
    status: 'critical',
    age: '7d',
  },
];

const vulnerabilityScansData = [
  {
    id: 'scan-1',
    name: 'weekly-image-scan',
    scope: 'All Images',
    critical: 1,
    high: 3,
    medium: 7,
    low: 12,
    status: 'warning',
    lastRun: '2023-09-15T10:32:45Z',
  },
  {
    id: 'scan-2',
    name: 'daily-runtime-scan',
    scope: 'All Pods',
    critical: 0,
    high: 1,
    medium: 5,
    low: 10,
    status: 'healthy',
    lastRun: '2023-09-19T16:43:21Z',
  },
  {
    id: 'scan-3',
    name: 'production-apps-scan',
    scope: 'Namespace: production',
    critical: 0,
    high: 0,
    medium: 2,
    low: 8,
    status: 'healthy',
    lastRun: '2023-09-18T21:11:05Z',
  },
];

const rbacAnomaliesData = [
  {
    id: 'rbac-1',
    user: 'system:serviceaccount:kube-system:deployment-controller',
    anomalyType: 'Privilege Escalation',
    severity: 'critical',
    resources: ['deployments', 'configmaps'],
    timestamp: '2023-09-17T14:22:12Z',
  },
  {
    id: 'rbac-2',
    user: 'alice@example.com',
    anomalyType: 'Unusual Access Pattern',
    severity: 'warning',
    resources: ['secrets'],
    timestamp: '2023-09-18T16:43:21Z',
  },
  {
    id: 'rbac-3',
    user: 'system:serviceaccount:default:default',
    anomalyType: 'Excessive Permissions',
    severity: 'neutral',
    resources: ['pods', 'deployments', 'services'],
    timestamp: '2023-09-19T09:11:05Z',
  },
];

const certificatesData = [
  {
    id: 'cert-1',
    name: 'kubernetes-dashboard',
    type: 'server',
    issuer: 'kubernetes-ca',
    subject: 'CN=kubernetes-dashboard',
    expiresIn: '25d',
    status: 'healthy',
  },
  {
    id: 'cert-2',
    name: 'kube-apiserver',
    type: 'server',
    issuer: 'kubernetes-ca',
    subject: 'CN=kube-apiserver',
    expiresIn: '10d',
    status: 'warning',
  },
  {
    id: 'cert-3',
    name: 'kube-controller-manager',
    type: 'client',
    issuer: 'kubernetes-ca',
    subject: 'CN=system:kube-controller-manager',
    expiresIn: '60d',
    status: 'healthy',
  },
  {
    id: 'cert-4',
    name: 'kube-scheduler',
    type: 'client',
    issuer: 'kubernetes-ca',
    subject: 'CN=system:kube-scheduler',
    expiresIn: '60d',
    status: 'healthy',
  },
];

const Security = () => {
  const [activeTab, setActiveTab] = useState<'policies' | 'vulnerabilities' | 'rbac' | 'certificates'>('policies');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <PageLayout
      title="Security" 
      description="Manage security policies, scan for vulnerabilities, and monitor security incidents."
    >
      <div className="flex overflow-x-auto pb-2 mb-6">
        <div className="flex space-x-2">
          <button
            className={`py-1.5 px-3 rounded-lg flex items-center text-sm font-medium ${
              activeTab === 'policies' 
                ? 'bg-k8s-blue text-white shadow-sm' 
                : 'bg-white border border-k8s-gray-200 hover:bg-k8s-gray-50'
            }`}
            onClick={() => {
              setActiveTab('policies');
              setSelectedItem(null);
            }}
          >
            <ShieldCheck size={16} className="mr-1.5" />
            Security Policies
          </button>
          <button
            className={`py-1.5 px-3 rounded-lg flex items-center text-sm font-medium ${
              activeTab === 'vulnerabilities' 
                ? 'bg-k8s-blue text-white shadow-sm' 
                : 'bg-white border border-k8s-gray-200 hover:bg-k8s-gray-50'
            }`}
            onClick={() => {
              setActiveTab('vulnerabilities');
              setSelectedItem(null);
            }}
          >
            <AlertTriangle size={16} className="mr-1.5" />
            Vulnerability Scans
          </button>
          <button
            className={`py-1.5 px-3 rounded-lg flex items-center text-sm font-medium ${
              activeTab === 'rbac' 
                ? 'bg-k8s-blue text-white shadow-sm' 
                : 'bg-white border border-k8s-gray-200 hover:bg-k8s-gray-50'
            }`}
            onClick={() => {
              setActiveTab('rbac');
              setSelectedItem(null);
            }}
          >
            <ShieldAlert size={16} className="mr-1.5" />
            RBAC Anomalies
          </button>
          <button
            className={`py-1.5 px-3 rounded-lg flex items-center text-sm font-medium ${
              activeTab === 'certificates' 
                ? 'bg-k8s-blue text-white shadow-sm' 
                : 'bg-white border border-k8s-gray-200 hover:bg-k8s-gray-50'
            }`}
            onClick={() => {
              setActiveTab('certificates');
              setSelectedItem(null);
            }}
          >
            <Lock size={16} className="mr-1.5" />
            Certificates
          </button>
        </div>
      </div>

      {activeTab === 'policies' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
                <Plus size={16} className="mr-1.5" />
                <span>Create Policy</span>
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
                <CardTitle className="text-lg">Security Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Scope</TableHead>
                        <TableHead>Enforcement</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityPoliciesData.map((policy) => (
                        <TableRow 
                          key={policy.id}
                          className="cursor-pointer hover:bg-k8s-gray-50"
                          onClick={() => setSelectedItem(policy.id === selectedItem ? null : policy.id)}
                        >
                          <TableCell className="font-medium">{policy.name}</TableCell>
                          <TableCell>{policy.scope}</TableCell>
                          <TableCell>{policy.enforcement}</TableCell>
                          <TableCell>
                            <StatusBadge status={policy.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={policy.status.charAt(0).toUpperCase() + policy.status.slice(1)} />
                          </TableCell>
                          <TableCell>{policy.age}</TableCell>
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
        </>
      )}

      {activeTab === 'vulnerabilities' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
                <Plus size={16} className="mr-1.5" />
                <span>New Scan</span>
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
                <CardTitle className="text-lg">Vulnerability Scans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Scope</TableHead>
                        <TableHead>Critical</TableHead>
                        <TableHead>High</TableHead>
                        <TableHead>Medium</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Run</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vulnerabilityScansData.map((scan) => (
                        <TableRow 
                          key={scan.id}
                          className="cursor-pointer hover:bg-k8s-gray-50"
                          onClick={() => setSelectedItem(scan.id === selectedItem ? null : scan.id)}
                        >
                          <TableCell className="font-medium">{scan.name}</TableCell>
                          <TableCell>{scan.scope}</TableCell>
                          <TableCell>{scan.critical > 0 ? <span className="text-k8s-red">{scan.critical}</span> : scan.critical}</TableCell>
                          <TableCell>{scan.high > 0 ? <span className="text-k8s-yellow">{scan.high}</span> : scan.high}</TableCell>
                          <TableCell>{scan.medium}</TableCell>
                          <TableCell>
                            <StatusBadge status={scan.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={scan.status.charAt(0).toUpperCase() + scan.status.slice(1)} />
                          </TableCell>
                          <TableCell>{new Date(scan.lastRun).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <button className="p-1 rounded hover:bg-k8s-gray-100">
                                <Edit size={14} className="text-k8s-gray-500" />
                              </button>
                              <button className="p-1 rounded hover:bg-k8s-gray-100">
                                <RefreshCw size={14} className="text-k8s-gray-500" />
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
        </>
      )}

      {activeTab === 'rbac' && (
        <>
          <div className="flex justify-between items-center mb-4">
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

          <TransitionWrapper animation="fade" delay={100}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">RBAC Anomalies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Anomaly Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Resources</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rbacAnomaliesData.map((anomaly) => (
                        <TableRow 
                          key={anomaly.id}
                          className="cursor-pointer hover:bg-k8s-gray-50"
                          onClick={() => setSelectedItem(anomaly.id === selectedItem ? null : anomaly.id)}
                        >
                          <TableCell className="font-medium">{anomaly.user}</TableCell>
                          <TableCell>{anomaly.anomalyType}</TableCell>
                          <TableCell>
                            <StatusBadge 
                              status={anomaly.severity === 'critical' 
                                ? 'critical' 
                                : (anomaly.severity === 'warning' ? 'warning' : 'neutral')} 
                              text={anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)} 
                            />
                          </TableCell>
                          <TableCell>{anomaly.resources.join(', ')}</TableCell>
                          <TableCell>{new Date(anomaly.timestamp).toLocaleDateString()}</TableCell>
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
        </>
      )}

      {activeTab === 'certificates' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button className="hover-lift py-1.5 px-3 rounded-lg flex items-center text-sm font-medium bg-k8s-blue text-white shadow-sm">
                <Plus size={16} className="mr-1.5" />
                <span>Generate Certificate</span>
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
                <CardTitle className="text-lg">Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Issuer</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Expires In</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {certificatesData.map((cert) => (
                        <TableRow 
                          key={cert.id}
                          className="cursor-pointer hover:bg-k8s-gray-50"
                          onClick={() => setSelectedItem(cert.id === selectedItem ? null : cert.id)}
                        >
                          <TableCell className="font-medium">{cert.name}</TableCell>
                          <TableCell>{cert.type}</TableCell>
                          <TableCell>{cert.issuer}</TableCell>
                          <TableCell>
                            <span className="truncate block max-w-[200px]">{cert.subject}</span>
                          </TableCell>
                          <TableCell>{cert.expiresIn}</TableCell>
                          <TableCell>
                            <StatusBadge status={cert.status as 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending'} text={cert.status.charAt(0).toUpperCase() + cert.status.slice(1)} />
                          </TableCell>
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
        </>
      )}
    </PageLayout>
  );
};

export default Security;
