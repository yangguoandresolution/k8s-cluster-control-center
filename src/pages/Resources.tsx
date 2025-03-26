
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import MetricCard from '@/components/ui/MetricCard';
import AreaChart from '@/components/ui/AreaChart';
import { RefreshCw, Cpu, HardDrive, Database, Wifi, BarChart2 } from 'lucide-react';

// Sample resources data
const resourcesData = {
  cpu: {
    current: 42,
    total: 100,
    unit: 'cores',
    trend: [40, 38, 45, 50, 42, 39, 41, 42],
    trendLabels: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', 'Now']
  },
  memory: {
    current: 24,
    total: 64,
    unit: 'GB',
    trend: [20, 22, 19, 23, 25, 24, 24, 24],
    trendLabels: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', 'Now']
  },
  storage: {
    current: 425,
    total: 1000,
    unit: 'GB',
    trend: [380, 390, 400, 410, 420, 425, 425, 425],
    trendLabels: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', 'Now']
  },
  network: {
    current: 28,
    total: 100,
    unit: 'Mbps',
    trend: [15, 20, 35, 30, 25, 32, 28, 28],
    trendLabels: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', 'Now']
  }
};

// Sample cluster resource allocations
const clusterResourceUsage = [
  {
    name: 'Production Cluster',
    cpu: 65,
    memory: 58,
    storage: 42,
    network: 31,
  },
  {
    name: 'Staging Cluster',
    cpu: 38,
    memory: 45,
    storage: 28,
    network: 22,
  },
  {
    name: 'Development Cluster',
    cpu: 20,
    memory: 35,
    storage: 15,
    network: 18,
  }
];

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [selectedResource, setSelectedResource] = useState('cpu');

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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'cpu':
        return <Cpu className="h-5 w-5 text-blue-500" />;
      case 'memory':
        return <HardDrive className="h-5 w-5 text-purple-500" />;
      case 'storage':
        return <Database className="h-5 w-5 text-amber-500" />;
      case 'network':
        return <Wifi className="h-5 w-5 text-green-500" />;
      default:
        return <BarChart2 className="h-5 w-5 text-gray-500" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'cpu':
        return 'blue';
      case 'memory':
        return 'purple';
      case 'storage':
        return 'amber';
      case 'network':
        return 'green';
      default:
        return 'gray';
    }
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
                  <h1 className="text-2xl font-bold">Resource Monitor</h1>
                  <p className="text-sm text-k8s-gray-500 mt-1">
                    View and analyze resource utilization across all clusters
                  </p>
                </div>
                <Button 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  variant="outline"
                  className="flex items-center"
                >
                  <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                </Button>
              </div>
            </TransitionWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(resourcesData).map(([key, data]) => (
                <TransitionWrapper key={key} animation="fade" delay={200}>
                  <MetricCard
                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={data.current}
                    subtitle={`of ${data.total} ${data.unit}`}
                    icon={getResourceIcon(key)}
                    onClick={() => setSelectedResource(key)}
                    className={selectedResource === key ? 'ring-2 ring-primary ring-opacity-50' : ''}
                  />
                </TransitionWrapper>
              ))}
            </div>
            
            {isLoading ? (
              <Card className="animate-pulse mb-6">
                <CardContent className="p-6">
                  <div className="h-64 bg-k8s-gray-200 rounded-md"></div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {selectedResource.charAt(0).toUpperCase() + selectedResource.slice(1)} Usage Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <AreaChart 
                      data={resourcesData[selectedResource as keyof typeof resourcesData].trend.map((value, index) => ({
                        name: resourcesData[selectedResource as keyof typeof resourcesData].trendLabels[index],
                        value
                      }))}
                      dataKey="value"
                      stroke={`var(--k8s-${getResourceColor(selectedResource)})`}
                      gradientFrom={`rgba(var(--k8s-${getResourceColor(selectedResource)}-rgb), 0.4)`}
                      gradientTo={`rgba(var(--k8s-${getResourceColor(selectedResource)}-rgb), 0.0)`}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-k8s-gray-500">
                  Showing usage over the last 7 hours
                </CardFooter>
              </Card>
            )}
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Resource Allocation by Cluster</h2>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-24 bg-k8s-gray-200 rounded-md"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Tabs defaultValue="cpu">
                  <TabsList className="mb-4">
                    <TabsTrigger value="cpu">CPU</TabsTrigger>
                    <TabsTrigger value="memory">Memory</TabsTrigger>
                    <TabsTrigger value="storage">Storage</TabsTrigger>
                    <TabsTrigger value="network">Network</TabsTrigger>
                  </TabsList>
                  
                  {['cpu', 'memory', 'storage', 'network'].map((resource) => (
                    <TabsContent key={resource} value={resource} className="space-y-4">
                      {clusterResourceUsage.map((cluster, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{cluster.name}</h3>
                                <p className="text-sm text-k8s-gray-500">
                                  {cluster[resource as keyof typeof cluster]}% utilization
                                </p>
                              </div>
                              <div className="w-2/3">
                                <div className="h-4 w-full bg-k8s-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full bg-${getResourceColor(resource)}-500`}
                                    style={{ width: `${cluster[resource as keyof typeof cluster]}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
            
            <div className="mt-6 text-center text-xs text-k8s-gray-400">
              <p>Last refreshed: {lastRefresh.toLocaleTimeString()}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resources;
