
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import { ShieldAlert, User, RefreshCw, Filter, ChevronDown, Lock, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import { AreaChart } from '@/components/ui/AreaChart';

// Sample security data
const securityIncidents = [
  {
    id: 'incident-1',
    timestamp: '2023-09-19T14:32:45Z',
    severity: 'critical',
    type: 'unauthorized-access',
    resource: 'kube-apiserver',
    description: 'Failed login attempts from unknown IP (192.168.1.45)',
    status: 'resolved',
    resolvedAt: '2023-09-19T15:17:22Z',
  },
  {
    id: 'incident-2',
    timestamp: '2023-09-18T08:12:31Z',
    severity: 'warning',
    type: 'pod-security-violation',
    resource: 'backend/api-data-pod',
    description: 'Pod running with escalated privileges',
    status: 'active',
    resolvedAt: null,
  },
  {
    id: 'incident-3',
    timestamp: '2023-09-17T22:45:12Z',
    severity: 'critical',
    type: 'network-anomaly',
    resource: 'worker-node-3',
    description: 'Unusual outbound traffic detected',
    status: 'active',
    resolvedAt: null,
  },
  {
    id: 'incident-4',
    timestamp: '2023-09-15T11:23:05Z',
    severity: 'low',
    type: 'config-issue',
    resource: 'security/auth-service-svc',
    description: 'Service using deprecated API version',
    status: 'resolved',
    resolvedAt: '2023-09-15T12:45:18Z',
  },
  {
    id: 'incident-5',
    timestamp: '2023-09-14T09:17:38Z',
    severity: 'warning',
    type: 'resource-abuse',
    resource: 'monitoring/metrics-collector',
    description: 'CPU throttling due to excessive usage',
    status: 'resolved',
    resolvedAt: '2023-09-14T10:32:15Z',
  },
];

const roleBindings = [
  {
    id: 'rb-1',
    name: 'cluster-admin-binding',
    namespace: 'all',
    role: 'cluster-admin',
    subjects: [
      { kind: 'User', name: 'admin@example.com' },
      { kind: 'ServiceAccount', name: 'ci-pipeline' },
    ],
    scope: 'cluster',
  },
  {
    id: 'rb-2',
    name: 'view-binding',
    namespace: 'default',
    role: 'view',
    subjects: [
      { kind: 'Group', name: 'developers' },
    ],
    scope: 'namespace',
  },
  {
    id: 'rb-3',
    name: 'edit-binding',
    namespace: 'backend',
    role: 'edit',
    subjects: [
      { kind: 'User', name: 'backend-lead@example.com' },
    ],
    scope: 'namespace',
  },
  {
    id: 'rb-4',
    name: 'monitoring-binding',
    namespace: 'monitoring',
    role: 'monitoring-admin',
    subjects: [
      { kind: 'ServiceAccount', name: 'prometheus' },
    ],
    scope: 'namespace',
  },
];

const securityScans = [
  {
    id: 'scan-1',
    timestamp: '2023-09-19T00:00:00Z',
    status: 'completed',
    critical: 2,
    high: 5,
    medium: 12,
    low: 7,
  },
  {
    id: 'scan-2',
    timestamp: '2023-09-18T00:00:00Z',
    status: 'completed',
    critical: 2,
    high: 6,
    medium: 14,
    low: 8,
  },
  {
    id: 'scan-3',
    timestamp: '2023-09-17T00:00:00Z',
    status: 'completed',
    critical: 3,
    high: 7,
    medium: 15,
    low: 9,
  },
  {
    id: 'scan-4',
    timestamp: '2023-09-16T00:00:00Z',
    status: 'completed',
    critical: 3,
    high: 8,
    medium: 15,
    low: 10,
  },
  {
    id: 'scan-5',
    timestamp: '2023-09-15T00:00:00Z',
    status: 'completed',
    critical: 4,
    high: 9,
    medium: 16,
    low: 11,
  },
  {
    id: 'scan-6',
    timestamp: '2023-09-14T00:00:00Z',
    status: 'completed',
    critical: 5,
    high: 11,
    medium: 18,
    low: 12,
  },
  {
    id: 'scan-7',
    timestamp: '2023-09-13T00:00:00Z',
    status: 'completed',
    critical: 5,
    high: 12,
    medium: 20,
    low: 14,
  },
];

const vulnerabilityTrend = securityScans.map(scan => ({
  name: new Date(scan.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  critical: scan.critical,
  high: scan.high,
  medium: scan.medium,
  low: scan.low,
})).reverse();

type SecurityTab = 'overview' | 'incidents' | 'roles' | 'compliance';

const Security = () => {
  const [activeTab, setActiveTab] = useState<SecurityTab>('overview');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  
  // Calculate stats
  const activeIncidents = securityIncidents.filter(incident => incident.status === 'active');
  const criticalIncidents = securityIncidents.filter(
    incident => incident.severity === 'critical'
  );
  const latestScan = securityScans[0];
  
  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TransitionWrapper animation="slide-up" delay={100}>
                <MetricCard
                  title="Active Incidents"
                  value={activeIncidents.length}
                  subtitle="Security alerts requiring attention"
                  icon={<AlertCircle size={20} />}
                  trend={{
                    value: Math.round((activeIncidents.length / securityIncidents.length) * 100),
                    direction: 'up'
                  }}
                />
              </TransitionWrapper>
              <TransitionWrapper animation="slide-up" delay={150}>
                <MetricCard
                  title="Critical Vulnerabilities"
                  value={latestScan.critical}
                  subtitle="From latest security scan"
                  icon={<ShieldAlert size={20} />}
                  trend={{
                    value: Math.round(((latestScan.critical - securityScans[1].critical) / securityScans[1].critical) * 100),
                    direction: latestScan.critical < securityScans[1].critical ? 'down' : 'up'
                  }}
                />
              </TransitionWrapper>
              <TransitionWrapper animation="slide-up" delay={200}>
                <MetricCard
                  title="Access Controls"
                  value={roleBindings.length}
                  subtitle="Active role bindings"
                  icon={<Lock size={20} />}
                />
              </TransitionWrapper>
            </div>
            
            <TransitionWrapper animation="fade" delay={100}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Vulnerability Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <AreaChart 
                      data={vulnerabilityTrend}
                      dataKey="critical"
                      xAxisKey="name"
                      height={300}
                      stroke="#EF4444"
                      gradientFrom="rgba(239, 68, 68, 0.4)"
                      gradientTo="rgba(239, 68, 68, 0.0)"
                    />
                  </div>
                </CardContent>
              </Card>
            </TransitionWrapper>
            
            <TransitionWrapper animation="fade" delay={200}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Recent Security Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityIncidents.slice(0, 3).map((incident) => (
                        <TableRow 
                          key={incident.id}
                          className="cursor-pointer hover:bg-k8s-gray-50"
                          onClick={() => setSelectedIncident(incident.id === selectedIncident ? null : incident.id)}
                        >
                          <TableCell>
                            {new Date(incident.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={
                              incident.severity === 'critical' ? 'critical' :
                              incident.severity === 'warning' ? 'warning' : 'neutral'
                            }>
                              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>{incident.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</TableCell>
                          <TableCell>{incident.resource}</TableCell>
                          <TableCell>
                            <StatusBadge status={incident.status === 'active' ? 'warning' : 'healthy'}>
                              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                            </StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TransitionWrapper>
          </div>
        );
  
      case 'incidents':
        return (
          <div className="space-y-6">
            <TransitionWrapper animation="fade">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">Security Incidents</CardTitle>
                      <CardDescription>Track and manage security alerts across your clusters</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="py-1.5 px-3 rounded-lg flex items-center text-sm font-medium border border-k8s-gray-200 bg-white hover:bg-k8s-gray-50">
                        <Filter size={16} className="mr-1.5 text-k8s-gray-500" />
                        <span>Filter</span>
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityIncidents.map((incident) => (
                        <TableRow 
                          key={incident.id}
                          className={`cursor-pointer hover:bg-k8s-gray-50 ${
                            selectedIncident === incident.id ? 'bg-k8s-gray-50' : ''
                          }`}
                          onClick={() => setSelectedIncident(incident.id === selectedIncident ? null : incident.id)}
                        >
                          <TableCell>
                            {new Date(incident.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={
                              incident.severity === 'critical' ? 'critical' :
                              incident.severity === 'warning' ? 'warning' : 'neutral'
                            }>
                              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>{incident.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</TableCell>
                          <TableCell>{incident.resource}</TableCell>
                          <TableCell className="max-w-xs truncate">{incident.description}</TableCell>
                          <TableCell>
                            <StatusBadge status={incident.status === 'active' ? 'warning' : 'healthy'}>
                              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                            </StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TransitionWrapper>
            
            {selectedIncident && (
              <TransitionWrapper animation="slide-up">
                {(() => {
                  const incident = securityIncidents.find(i => i.id === selectedIncident);
                  if (!incident) return null;
                  
                  return (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Incident Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Basic Info</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                                <span className="text-sm text-k8s-gray-500">Type</span>
                                <span className="text-sm font-medium">
                                  {incident.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                                <span className="text-sm text-k8s-gray-500">Severity</span>
                                <StatusBadge status={
                                  incident.severity === 'critical' ? 'critical' :
                                  incident.severity === 'warning' ? 'warning' : 'neutral'
                                }>
                                  {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                                </StatusBadge>
                              </div>
                              <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                                <span className="text-sm text-k8s-gray-500">Status</span>
                                <StatusBadge status={incident.status === 'active' ? 'warning' : 'healthy'}>
                                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                                </StatusBadge>
                              </div>
                              <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                                <span className="text-sm text-k8s-gray-500">Detected</span>
                                <span className="text-sm">
                                  {new Date(incident.timestamp).toLocaleString()}
                                </span>
                              </div>
                              {incident.resolvedAt && (
                                <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                                  <span className="text-sm text-k8s-gray-500">Resolved</span>
                                  <span className="text-sm">
                                    {new Date(incident.resolvedAt).toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-2">Details</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between py-1 border-b border-k8s-gray-100">
                                <span className="text-sm text-k8s-gray-500">Resource</span>
                                <span className="text-sm">{incident.resource}</span>
                              </div>
                              <div className="py-1 border-b border-k8s-gray-100">
                                <span className="text-sm text-k8s-gray-500 block mb-1">Description</span>
                                <span className="text-sm block">{incident.description}</span>
                              </div>
                              <div className="py-3">
                                {incident.status === 'active' ? (
                                  <button className="w-full py-2 px-3 bg-k8s-blue text-white rounded-md text-sm font-medium">
                                    Investigate Incident
                                  </button>
                                ) : (
                                  <div className="flex items-center justify-center text-k8s-green">
                                    <CheckCircle2 size={16} className="mr-1.5" />
                                    <span className="text-sm font-medium">This incident has been resolved</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}
              </TransitionWrapper>
            )}
          </div>
        );
  
      case 'roles':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">RBAC Configuration</CardTitle>
                    <CardDescription>Manage role-based access control for your clusters</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Namespace</TableHead>
                      <TableHead>Scope</TableHead>
                      <TableHead>Subjects</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleBindings.map((binding) => (
                      <TableRow key={binding.id}>
                        <TableCell className="font-medium">{binding.name}</TableCell>
                        <TableCell>{binding.role}</TableCell>
                        <TableCell>{binding.namespace}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            binding.scope === 'cluster' ? 'bg-k8s-blue-100 text-k8s-blue-700' : 'bg-k8s-gray-100'
                          }`}>
                            {binding.scope}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {binding.subjects.map((subject, idx) => (
                              <div key={idx} className="flex items-center px-2 py-0.5 bg-k8s-gray-100 rounded text-xs">
                                {subject.kind === 'User' ? (
                                  <User size={12} className="mr-1 text-k8s-gray-500" />
                                ) : subject.kind === 'ServiceAccount' ? (
                                  <Key size={12} className="mr-1 text-k8s-gray-500" />
                                ) : (
                                  <User size={12} className="mr-1 text-k8s-gray-500" />
                                )}
                                <span>{subject.name}</span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );
  
      case 'compliance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TransitionWrapper animation="slide-up" delay={100}>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Latest Security Scan</CardTitle>
                    <CardDescription>
                      {new Date(latestScan.timestamp).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-medium text-k8s-red-700">Critical</span>
                          <span className="text-sm text-k8s-gray-500">{latestScan.critical}</span>
                        </div>
                        <div className="w-full h-2 bg-k8s-gray-100 rounded-full">
                          <div className="h-2 bg-k8s-red rounded-full" style={{ width: `${(latestScan.critical / 10) * 100}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-medium text-k8s-orange-700">High</span>
                          <span className="text-sm text-k8s-gray-500">{latestScan.high}</span>
                        </div>
                        <div className="w-full h-2 bg-k8s-gray-100 rounded-full">
                          <div className="h-2 bg-k8s-orange rounded-full" style={{ width: `${(latestScan.high / 20) * 100}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-medium text-k8s-yellow-700">Medium</span>
                          <span className="text-sm text-k8s-gray-500">{latestScan.medium}</span>
                        </div>
                        <div className="w-full h-2 bg-k8s-gray-100 rounded-full">
                          <div className="h-2 bg-k8s-yellow rounded-full" style={{ width: `${(latestScan.medium / 30) * 100}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-medium text-k8s-gray-700">Low</span>
                          <span className="text-sm text-k8s-gray-500">{latestScan.low}</span>
                        </div>
                        <div className="w-full h-2 bg-k8s-gray-100 rounded-full">
                          <div className="h-2 bg-k8s-gray-600 rounded-full" style={{ width: `${(latestScan.low / 20) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TransitionWrapper>
              
              <TransitionWrapper animation="slide-up" delay={150}>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Compliance Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start p-3 bg-k8s-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium">Pod Security Standards</h4>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">Enforce pod security standards across namespaces</p>
                        </div>
                        <StatusBadge status="healthy">Active</StatusBadge>
                      </div>
                      <div className="flex justify-between items-start p-3 bg-k8s-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium">Network Policies</h4>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">Control traffic flow between pods and namespaces</p>
                        </div>
                        <StatusBadge status="warning">Partial</StatusBadge>
                      </div>
                      <div className="flex justify-between items-start p-3 bg-k8s-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium">Secret Encryption</h4>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">Encrypt secrets at rest in etcd</p>
                        </div>
                        <StatusBadge status="healthy">Active</StatusBadge>
                      </div>
                      <div className="flex justify-between items-start p-3 bg-k8s-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium">API Server Audit Logging</h4>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">Log all API server requests for auditing</p>
                        </div>
                        <StatusBadge status="healthy">Active</StatusBadge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TransitionWrapper>
            </div>
            
            <TransitionWrapper animation="fade" delay={200}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Historical Scans</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Critical</TableHead>
                        <TableHead>High</TableHead>
                        <TableHead>Medium</TableHead>
                        <TableHead>Low</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityScans.map((scan) => (
                        <TableRow key={scan.id}>
                          <TableCell>
                            {new Date(scan.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status="healthy">
                              {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                            </StatusBadge>
                          </TableCell>
                          <TableCell className="text-k8s-red-700 font-medium">{scan.critical}</TableCell>
                          <TableCell className="text-k8s-orange-700">{scan.high}</TableCell>
                          <TableCell className="text-k8s-yellow-700">{scan.medium}</TableCell>
                          <TableCell>{scan.low}</TableCell>
                          <TableCell className="font-medium">
                            {scan.critical + scan.high + scan.medium + scan.low}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TransitionWrapper>
          </div>
        );
  
      default:
        return null;
    }
  };

  return (
    <PageLayout 
      title="Security" 
      description="Monitor and manage security across your Kubernetes infrastructure."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="flex border border-k8s-gray-200 rounded-lg bg-white overflow-hidden">
            {(['overview', 'incidents', 'roles', 'compliance'] as SecurityTab[]).map((tab) => (
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

export default Security;
