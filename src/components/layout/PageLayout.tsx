
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TransitionWrapper from '../ui/TransitionWrapper';

type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

const PageLayout = ({ children, title, description }: PageLayoutProps) => {
  return (
    <div className="flex h-screen bg-k8s-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <TransitionWrapper animation="fade">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-k8s-gray-900">{title}</h1>
                {description && <p className="mt-1 text-k8s-gray-500">{description}</p>}
              </div>
            </TransitionWrapper>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
