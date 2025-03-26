import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Network, RefreshCw, PlusCircle, Server, Database, Cpu } from 'lucide-react';

// Define the proper type for cluster status
type ClusterStatus = 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending';

// Sample cluster data
const clusterData = [
  {
    id: 'cluster-1',
    name: 'Production Cluster',
    region: 'us-west-1',
    nodes: 5,
    status: 'healthy' as ClusterStatus,
    version: 'v1.26.3',
    uptime: '99.98%',
    pods: 78,
    lastUpdated: '2023-10-15T12:30:00Z'
  },
  {
    id: 'cluster-2',
    name: 'Staging Cluster',
    region: 'eu-central-1',
    nodes: 3,
    status: 'warning' as ClusterStatus,
    version: 'v1.25.8',
    uptime: '99.91%',
    pods: 42,
    lastUpdated: '2023-10-14T08:45:00Z'
  },
  {
    id: 'cluster-3',
    name: 'Development Cluster',
    region: 'ap-southeast-1',
    nodes: 2,
    status: 'healthy' as ClusterStatus,
    version: 'v1.27.1',
    uptime: '99.95%',
    pods: 24,
    lastUpdated: '2023-10-13T16:20:00Z'
  },
  {
    id: 'cluster-4',
    name: 'Testing Cluster',
    region: 'us-east-1',
    nodes: 1,
    status: 'critical' as ClusterStatus,
    version: 'v1.24.12',
    uptime: '95.32%',
    pods: 18,
    lastUpdated: '2023-10-12T14:10:00Z'
  }
];

const Clusters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [activeView, setActiveView] = useState('list');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastRefresh(new Date());
    }, 1000);
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-k8s-gray-50 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <TransitionWrapper animation="fade">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Clusters</h1>
                  <p className="text-sm text-k8s-gray-500 mt-1">
                    View and manage all your Kubernetes clusters
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleRefresh}
                    disabled={isLoading}
                    variant="outline"
                    className="flex items-center"
                  >
                    <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                  </Button>
                  <Button className="flex items-center">
                    <PlusCircle size={16} className="mr-2" />
                    <span>Add Cluster</span>
                  </Button>
                </div>
              </div>
            </TransitionWrapper>
            
            <Tabs defaultValue="list" className="space-y-4" value={activeView} onValueChange={setActiveView}>
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="space-y-4">
                {isLoading ? (
                  <Card className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-64 bg-k8s-gray-200 rounded-md"></div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Nodes</TableHead>
                            <TableHead>Pods</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Uptime</TableHead>
                            <TableHead>Last Updated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clusterData.map((cluster) => (
                            <TableRow key={cluster.id}>
                              <TableCell className="font-medium">{cluster.name}</TableCell>
                              <TableCell>
                                <StatusBadge status={cluster.status} />
                              </TableCell>
                              <TableCell>{cluster.region}</TableCell>
                              <TableCell>{cluster.nodes}</TableCell>
                              <TableCell>{cluster.pods}</TableCell>
                              <TableCell>{cluster.version}</TableCell>
                              <TableCell>{cluster.uptime}</TableCell>
                              <TableCell>{formatDate(cluster.lastUpdated)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="grid" className="space-y-4">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-32 bg-k8s-gray-200 rounded-md"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clusterData.map((cluster) => (
                      <Card key={cluster.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="bg-white pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div className="bg-k8s-blue/10 rounded-md p-2 mr-3">
                                <Network className="w-6 h-6 text-k8s-blue" />
                              </div>
                              <CardTitle className="text-lg">{cluster.name}</CardTitle>
                            </div>
                            <StatusBadge status={cluster.status} />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="flex items-center text-k8s-gray-500">
                              <Server size={14} className="mr-1" /> 
                              <span>Nodes:</span>
                            </div>
                            <div className="font-medium">{cluster.nodes}</div>
                            
                            <div className="flex items-center text-k8s-gray-500">
                              <Cpu size={14} className="mr-1" /> 
                              <span>Version:</span>
                            </div>
                            <div className="font-medium">{cluster.version}</div>
                            
                            <div className="flex items-center text-k8s-gray-500">
                              <Database size={14} className="mr-1" /> 
                              <span>Pods:</span>
                            </div>
                            <div className="font-medium">{cluster.pods}</div>
                            
                            <div className="flex items-center text-k8s-gray-500">
                              <span>Region:</span>
                            </div>
                            <div className="font-medium">{cluster.region}</div>
                            
                            <div className="flex items-center text-k8s-gray-500">
                              <span>Uptime:</span>
                            </div>
                            <div className="font-medium">{cluster.uptime}</div>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-k8s-gray-200 text-xs text-k8s-gray-500">
                            Last updated: {formatDate(cluster.lastUpdated)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-xs text-k8s-gray-400">
              <p>Last refreshed: {lastRefresh.toLocaleTimeString()}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clusters;
