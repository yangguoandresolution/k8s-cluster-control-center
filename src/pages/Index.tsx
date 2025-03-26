
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ClusterOverview from '../components/dashboard/ClusterOverview';
import ResourceMonitor from '../components/dashboard/ResourceMonitor';
import WorkloadStatus from '../components/dashboard/WorkloadStatus';
import TransitionWrapper from '../components/ui/TransitionWrapper';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

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
                  <h1 className="text-2xl font-bold">K8s Multi-Cluster Dashboard</h1>
                  <p className="text-sm text-k8s-gray-500 mt-1">
                    Monitoring and management interface for your Kubernetes clusters
                  </p>
                </div>
                <button 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center px-3 py-2 text-sm bg-white border border-k8s-gray-200 rounded-lg hover:bg-k8s-gray-100 transition-colors"
                >
                  <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </TransitionWrapper>
            
            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="neo-card h-96 shimmer animate-pulse"></div>
                  <div className="neo-card h-64 shimmer animate-pulse"></div>
                  <div className="neo-card h-80 shimmer animate-pulse"></div>
                </div>
              ) : (
                <>
                  <section>
                    <ClusterOverview />
                  </section>
                  
                  <section>
                    <ResourceMonitor />
                  </section>
                  
                  <section>
                    <WorkloadStatus />
                  </section>
                </>
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

export default Index;
