
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Settings as SettingsIcon, User, Lock, Bell, Globe, Key, Server, Shield, Moon, Sun, Laptop } from 'lucide-react';

type SettingsTab = 'account' | 'security' | 'notifications' | 'preferences' | 'apikeys' | 'advanced';

type ThemeOption = 'light' | 'dark' | 'system';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [theme, setTheme] = useState<ThemeOption>('system');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timezone, setTimezone] = useState('UTC');
  const [showHelp, setShowHelp] = useState(true);
  
  const renderTab = () => {
    switch (activeTab) {
      case 'account':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Account Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">User Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm text-k8s-gray-500 mb-1">Full Name</label>
                        <input
                          id="fullName"
                          type="text"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                          defaultValue="Admin User"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-k8s-gray-500 mb-1">Email</label>
                        <input
                          id="email"
                          type="email"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                          defaultValue="admin@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Role Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="role" className="block text-sm text-k8s-gray-500 mb-1">Role</label>
                        <select
                          id="role"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                          defaultValue="admin"
                        >
                          <option value="admin">Administrator</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="department" className="block text-sm text-k8s-gray-500 mb-1">Department</label>
                        <input
                          id="department"
                          type="text"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                          defaultValue="IT Operations"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className="py-2 px-4 bg-k8s-blue text-white rounded-md text-sm font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );
      
      case 'security':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm text-k8s-gray-500 mb-1">Current Password</label>
                        <input
                          id="currentPassword"
                          type="password"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm text-k8s-gray-500 mb-1">New Password</label>
                        <input
                          id="newPassword"
                          type="password"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm text-k8s-gray-500 mb-1">Confirm New Password</label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                        />
                      </div>
                      <div>
                        <button className="py-2 px-4 bg-k8s-blue text-white rounded-md text-sm font-medium">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-k8s-gray-200">
                    <h3 className="text-sm font-medium mb-3">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-k8s-gray-600">Enable two-factor authentication for your account</p>
                        <p className="text-xs text-k8s-gray-500 mt-1">
                          Add an extra layer of security to your account by requiring a code in addition to your password.
                        </p>
                      </div>
                      <button className="py-2 px-4 bg-k8s-gray-100 hover:bg-k8s-gray-200 rounded-md text-sm font-medium">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-k8s-gray-200">
                    <h3 className="text-sm font-medium mb-3">Session Management</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-k8s-gray-600">Active Sessions</p>
                        <p className="text-xs text-k8s-gray-500 mt-1">
                          View and manage your active sessions across different devices.
                        </p>
                      </div>
                      <button className="py-2 px-4 border border-k8s-gray-200 rounded-md text-sm font-medium">
                        Manage Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );
      
      case 'notifications':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Critical Alerts</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Receive notifications for critical issues requiring immediate attention
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Warning Alerts</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Receive notifications for warning level alerts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">System Updates</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Receive notifications about system updates and maintenance
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-k8s-gray-200">
                    <h3 className="text-sm font-medium mb-3">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Resource Changes</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Receive in-app notifications for resource creations, updates, and deletions
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Security Events</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Receive in-app notifications for security events and alerts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className="py-2 px-4 bg-k8s-blue text-white rounded-md text-sm font-medium">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );
      
      case 'preferences':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Appearance & Preferences</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Theme</h3>
                    <div className="flex space-x-3">
                      <div
                        className={`flex flex-col items-center space-y-2 p-3 border rounded-lg cursor-pointer ${
                          theme === 'light' ? 'border-k8s-blue bg-k8s-blue/5' : 'border-k8s-gray-200'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="p-2 bg-white rounded-full border border-k8s-gray-200">
                          <Sun size={20} className="text-k8s-gray-800" />
                        </div>
                        <span className="text-sm">Light</span>
                      </div>
                      <div
                        className={`flex flex-col items-center space-y-2 p-3 border rounded-lg cursor-pointer ${
                          theme === 'dark' ? 'border-k8s-blue bg-k8s-blue/5' : 'border-k8s-gray-200'
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="p-2 bg-k8s-gray-800 rounded-full border border-k8s-gray-700">
                          <Moon size={20} className="text-white" />
                        </div>
                        <span className="text-sm">Dark</span>
                      </div>
                      <div
                        className={`flex flex-col items-center space-y-2 p-3 border rounded-lg cursor-pointer ${
                          theme === 'system' ? 'border-k8s-blue bg-k8s-blue/5' : 'border-k8s-gray-200'
                        }`}
                        onClick={() => setTheme('system')}
                      >
                        <div className="p-2 bg-k8s-gray-100 rounded-full border border-k8s-gray-200">
                          <Laptop size={20} className="text-k8s-gray-800" />
                        </div>
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-k8s-gray-200">
                    <h3 className="text-sm font-medium mb-3">Display Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="dateFormat" className="block text-sm text-k8s-gray-500 mb-1">Date Format</label>
                        <select
                          id="dateFormat"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                          value={dateFormat}
                          onChange={(e) => setDateFormat(e.target.value)}
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timezone" className="block text-sm text-k8s-gray-500 mb-1">Timezone</label>
                        <select
                          id="timezone"
                          className="w-full p-2 border border-k8s-gray-200 rounded-md"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                          <option value="Europe/Paris">Central European Time (CET)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-k8s-gray-200">
                    <h3 className="text-sm font-medium mb-3">User Interface Preferences</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-k8s-gray-600">Show Help Text</p>
                        <p className="text-xs text-k8s-gray-500 mt-0.5">
                          Display helpful tips and descriptions throughout the application
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={showHelp}
                          onChange={() => setShowHelp(!showHelp)} 
                        />
                        <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className="py-2 px-4 bg-k8s-blue text-white rounded-md text-sm font-medium">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );
      
      case 'apikeys':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">API Keys Management</CardTitle>
                <CardDescription>Manage API keys for programmatic access to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Your API Keys</h3>
                    <button className="py-1.5 px-3 bg-k8s-blue text-white rounded-md text-sm font-medium">
                      Create New Key
                    </button>
                  </div>
                  
                  <div className="border rounded-lg">
                    <div className="border-b last:border-b-0">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Production API Key</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Created on Sep 15, 2023 • Last used 2 days ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-k8s-green-100 text-k8s-green-700 rounded text-xs font-medium">
                            Active
                          </span>
                          <button className="p-1.5 hover:bg-k8s-gray-100 rounded">
                            <Key size={14} className="text-k8s-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b last:border-b-0">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Development API Key</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Created on Aug 22, 2023 • Last used 5 days ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-k8s-green-100 text-k8s-green-700 rounded text-xs font-medium">
                            Active
                          </span>
                          <button className="p-1.5 hover:bg-k8s-gray-100 rounded">
                            <Key size={14} className="text-k8s-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b last:border-b-0">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">CI/CD Pipeline Key</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Created on Jul 10, 2023 • Last used today
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-k8s-green-100 text-k8s-green-700 rounded text-xs font-medium">
                            Active
                          </span>
                          <button className="p-1.5 hover:bg-k8s-gray-100 rounded">
                            <Key size={14} className="text-k8s-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-3">API Rate Limits</h3>
                    <div className="bg-k8s-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-k8s-gray-600">Current Usage</p>
                        <p className="text-sm font-medium">2,450 / 10,000 requests</p>
                      </div>
                      <div className="w-full h-2 bg-k8s-gray-200 rounded-full">
                        <div className="h-2 bg-k8s-blue rounded-full" style={{ width: '24.5%' }}></div>
                      </div>
                      <p className="text-xs text-k8s-gray-500 mt-2">
                        Rate limit resets in 18 hours and 24 minutes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TransitionWrapper>
        );
      
      case 'advanced':
        return (
          <TransitionWrapper animation="fade">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Advanced Settings</CardTitle>
                <CardDescription>Configure advanced system settings and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Kubernetes Configuration</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Default Namespace</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Set the default namespace for operations
                          </p>
                        </div>
                        <select className="p-1.5 border border-k8s-gray-200 rounded-md text-sm">
                          <option value="default">default</option>
                          <option value="kube-system">kube-system</option>
                          <option value="monitoring">monitoring</option>
                          <option value="backend">backend</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Auto-refresh Interval</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Set how often dashboard data should refresh
                          </p>
                        </div>
                        <select className="p-1.5 border border-k8s-gray-200 rounded-md text-sm">
                          <option value="0">Never</option>
                          <option value="10">Every 10 seconds</option>
                          <option value="30">Every 30 seconds</option>
                          <option value="60">Every minute</option>
                          <option value="300">Every 5 minutes</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Auto-timezone Detection</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Automatically detect and set timezone based on browser
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-k8s-gray-200">
                    <h3 className="text-sm font-medium mb-3">Log Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Log Verbosity</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Set the detail level for application logs
                          </p>
                        </div>
                        <select className="p-1.5 border border-k8s-gray-200 rounded-md text-sm">
                          <option value="error">Error only</option>
                          <option value="warning">Warning</option>
                          <option value="info">Information</option>
                          <option value="debug">Debug</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Console Logs</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Enable browser console logs for debugging
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-k8s-gray-200">
                    <h3 className="text-sm font-medium mb-3">Experimental Features</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Advanced Terminal</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Enable enhanced terminal with autocompletion and syntax highlighting
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-k8s-gray-600">Beta Features</p>
                          <p className="text-xs text-k8s-gray-500 mt-0.5">
                            Enable access to beta features that are still in development
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-k8s-gray-200 rounded-full peer peer-checked:bg-k8s-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className="py-2 px-4 bg-k8s-blue text-white rounded-md text-sm font-medium">
                      Save Settings
                    </button>
                  </div>
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
      title="Settings" 
      description="Configure your account and application preferences."
    >
      <div className="flex flex-col md:flex-row gap-6">
        <TransitionWrapper animation="fade" className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border border-k8s-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-k8s-gray-200">
              <h3 className="text-sm font-medium text-k8s-gray-900">Settings</h3>
            </div>
            <div className="py-2">
              {[
                { id: 'account', icon: User, label: 'Account' },
                { id: 'security', icon: Lock, label: 'Security' },
                { id: 'notifications', icon: Bell, label: 'Notifications' },
                { id: 'preferences', icon: Globe, label: 'Preferences' },
                { id: 'apikeys', icon: Key, label: 'API Keys' },
                { id: 'advanced', icon: Server, label: 'Advanced' },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center py-2 px-4 text-sm ${
                    activeTab === item.id
                      ? 'bg-k8s-blue/10 text-k8s-blue font-medium'
                      : 'text-k8s-gray-600 hover:bg-k8s-gray-50'
                  }`}
                  onClick={() => setActiveTab(item.id as SettingsTab)}
                >
                  <item.icon size={16} className="mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </TransitionWrapper>

        <div className="flex-1">
          {renderTab()}
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
