
import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Terminal as TerminalIcon, RefreshCw, X, Maximize2, Minimize2, ChevronDown } from 'lucide-react';

// Sample terminal history
const initialCommands = [
  { command: 'kubectl get pods', output: 'NAME                      READY   STATUS    RESTARTS   AGE\nfrontend-web-7d4b7c8f-2x7j5   1/1     Running   0          5d\nbackend-api-6c9f56c5-k7m4c    1/1     Running   0          2d\nredis-cache-5d8b9c7f-lj3n6    1/1     Running   0          8d\nmetrics-collector-f9c56-2js4  1/1     Running   0          1d\nauth-service-7f8d9c6-p3k7f    1/1     Running   0          4d' },
  { command: 'kubectl get nodes', output: 'NAME           STATUS   ROLES                  AGE    VERSION\nworker-node-1   Ready    worker                 125d   v1.26.3\nworker-node-2   Ready    worker                 125d   v1.26.3\nmaster-node-1   Ready    control-plane,master   125d   v1.26.3\nworker-node-3   Ready    worker                 125d   v1.26.3' },
  { command: 'kubectl version', output: 'Client Version: v1.26.3\nKustomize Version: v4.5.7\nServer Version: v1.26.3' },
];

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState(initialCommands);
  const [namespaces, setNamespaces] = useState(['default', 'kube-system', 'backend', 'monitoring', 'security']);
  const [selectedNamespace, setSelectedNamespace] = useState('default');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate mock response for commands
  const getCommandOutput = (cmd: string) => {
    const lowercaseCmd = cmd.toLowerCase();
    
    if (lowercaseCmd.includes('get pods') || lowercaseCmd.includes('get pod')) {
      return 'NAME                      READY   STATUS    RESTARTS   AGE\nfrontend-web-7d4b7c8f-2x7j5   1/1     Running   0          5d\nbackend-api-6c9f56c5-k7m4c    1/1     Running   0          2d\nredis-cache-5d8b9c7f-lj3n6    1/1     Running   0          8d\nmetrics-collector-f9c56-2js4  1/1     Running   0          1d\nauth-service-7f8d9c6-p3k7f    1/1     Running   0          4d';
    }
    
    if (lowercaseCmd.includes('get deployments') || lowercaseCmd.includes('get deployment')) {
      return 'NAME               READY   UP-TO-DATE   AVAILABLE   AGE\nfrontend-web        3/3     3            3           5d\nbackend-api         2/2     2            2           2d\nredis-cache         3/3     3            3           8d\nmetrics-collector   1/1     1            1           1d\nauth-service        2/3     3            2           4d';
    }
    
    if (lowercaseCmd.includes('get services') || lowercaseCmd.includes('get svc')) {
      return 'NAME                      TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)          AGE\nfrontend-web-svc        LoadBalancer   10.96.134.156    34.102.136.180   80:30080/TCP     5d\nbackend-api-svc         ClusterIP      10.96.167.218    <none>           8080:30081/TCP   2d\nredis-cache-svc         ClusterIP      10.96.44.125     <none>           6379:32291/TCP   8d\nmetrics-collector-svc   NodePort       10.96.189.56     <none>           9090:31090/TCP   1d\nauth-service-svc        LoadBalancer   10.96.212.78     35.188.97.145    443:30443/TCP    4d';
    }
    
    if (lowercaseCmd.includes('get nodes') || lowercaseCmd.includes('get node')) {
      return 'NAME           STATUS   ROLES                  AGE    VERSION\nworker-node-1   Ready    worker                 125d   v1.26.3\nworker-node-2   Ready    worker                 125d   v1.26.3\nmaster-node-1   Ready    control-plane,master   125d   v1.26.3\nworker-node-3   Ready    worker                 125d   v1.26.3';
    }
    
    if (lowercaseCmd.includes('version')) {
      return 'Client Version: v1.26.3\nKustomize Version: v4.5.7\nServer Version: v1.26.3';
    }
    
    if (lowercaseCmd.includes('get namespaces') || lowercaseCmd.includes('get namespace')) {
      return 'NAME          STATUS   AGE\ndefault       Active   125d\nbackend       Active   98d\nkube-system   Active   125d\nmonitoring    Active   87d\nsecurity      Active   45d';
    }
    
    if (lowercaseCmd.includes('help')) {
      return 'Available commands:\nkubectl get pods\nkubectl get deployments\nkubectl get services\nkubectl get nodes\nkubectl get namespaces\nkubectl version\nkubectl describe [resource] [name]\nclear';
    }
    
    if (lowercaseCmd === 'clear') {
      return '__clear__';
    }
    
    if (lowercaseCmd.startsWith('echo ')) {
      return cmd.substring(5);
    }
    
    return `Command not found: ${cmd}\nType 'help' to see available commands.`;
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    const output = getCommandOutput(command);
    
    if (output === '__clear__') {
      setHistory([]);
    } else {
      const newHistoryItem = { command, output };
      setHistory([...history, newHistoryItem]);
    }
    
    setCommand('');
    
    // Scroll to bottom after rendering
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Focus input on initial load
    focusInput();
  }, []);

  const clearTerminal = () => {
    setHistory([]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <PageLayout 
      title="Terminal" 
      description="Interactive Kubernetes command-line interface."
    >
      <TransitionWrapper animation="fade" delay={100}>
        <Card className={isFullscreen ? "fixed inset-4 z-50" : ""}>
          <CardHeader className="pb-3 border-b border-k8s-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TerminalIcon size={18} className="mr-2 text-k8s-gray-500" />
                <CardTitle className="text-lg">Kubernetes Terminal</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center relative">
                  <span className="text-sm text-k8s-gray-500 mr-2">Namespace:</span>
                  <div className="relative">
                    <button
                      className="flex items-center px-3 py-1 bg-k8s-gray-100 rounded-md text-sm hover:bg-k8s-gray-200"
                      onClick={() => document.getElementById('namespace-dropdown')?.classList.toggle('hidden')}
                    >
                      {selectedNamespace}
                      <ChevronDown size={14} className="ml-1 text-k8s-gray-500" />
                    </button>
                    <div
                      id="namespace-dropdown"
                      className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-k8s-gray-200 z-10 hidden"
                    >
                      {namespaces.map((ns) => (
                        <button
                          key={ns}
                          className="block w-full text-left px-4 py-2 hover:bg-k8s-gray-100 text-sm"
                          onClick={() => {
                            setSelectedNamespace(ns);
                            document.getElementById('namespace-dropdown')?.classList.add('hidden');
                          }}
                        >
                          {ns}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className="p-1.5 rounded hover:bg-k8s-gray-100"
                  onClick={clearTerminal}
                  title="Clear terminal"
                >
                  <X size={16} className="text-k8s-gray-500" />
                </button>
                <button
                  className="p-1.5 rounded hover:bg-k8s-gray-100"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 size={16} className="text-k8s-gray-500" />
                  ) : (
                    <Maximize2 size={16} className="text-k8s-gray-500" />
                  )}
                </button>
                <button
                  className="p-1.5 rounded hover:bg-k8s-gray-100"
                  onClick={() => window.location.reload()}
                  title="Reset terminal"
                >
                  <RefreshCw size={16} className="text-k8s-gray-500" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div 
              ref={terminalRef}
              className="bg-k8s-gray-900 text-white font-mono text-sm p-4 h-[500px] overflow-y-auto"
              onClick={focusInput}
            >
              <div className="mb-4">
                <p className="text-k8s-gray-400">Welcome to the Kubernetes CLI. Type 'help' to see available commands.</p>
                <p className="text-k8s-gray-400">Current context: <span className="text-k8s-blue">production-cluster</span> | Namespace: <span className="text-k8s-green">{selectedNamespace}</span></p>
              </div>
              
              {history.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="flex items-center text-k8s-green mb-1">
                    <span className="mr-1">$</span>
                    <span>{item.command}</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-k8s-gray-300 pl-4">{item.output}</pre>
                </div>
              ))}
              
              <form onSubmit={handleCommandSubmit} className="flex items-center">
                <span className="text-k8s-green mr-1">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                  placeholder="Type command..."
                  autoFocus
                />
              </form>
            </div>
          </CardContent>
        </Card>
      </TransitionWrapper>
    </PageLayout>
  );
};

export default Terminal;
