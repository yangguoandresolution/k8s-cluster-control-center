
import { cn } from "@/lib/utils";
import React from "react";

type StatusBadgeProps = {
  status: 'healthy' | 'warning' | 'critical' | 'neutral' | 'pending';
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  children?: React.ReactNode;
};

export const StatusBadge = ({
  status,
  text,
  className,
  size = 'md',
  animate = true,
  children,
}: StatusBadgeProps) => {
  // Determine text based on status if not provided and if there are no children
  const statusText = children || text || {
    healthy: 'Healthy',
    warning: 'Warning',
    critical: 'Critical',
    neutral: 'Neutral',
    pending: 'Pending',
  }[status];

  // Determine styling based on status
  const statusClass = {
    healthy: 'status-healthy',
    warning: 'status-warning',
    critical: 'status-critical',
    neutral: 'status-neutral',
    pending: 'bg-k8s-gray-200 text-k8s-gray-700',
  }[status];

  // Size classes
  const sizeClass = {
    sm: 'text-xs px-1.5 py-0.5 rounded',
    md: 'text-xs px-2 py-1 rounded-md',
    lg: 'text-sm px-2.5 py-1 rounded-md',
  }[size];

  // Indicator animation
  const indicatorClass = animate
    ? status === 'pending'
      ? 'before:animate-pulse-subtle'
      : ''
    : '';

  return (
    <span
      className={cn(
        statusClass,
        sizeClass,
        "inline-flex items-center font-medium relative",
        "border before:w-2 before:h-2 before:rounded-full before:mr-1.5",
        indicatorClass,
        className
      )}
    >
      <span 
        className={cn(
          "w-2 h-2 rounded-full mr-1.5", 
          { "animate-pulse-subtle": animate && status !== 'neutral' }
        )}
        style={{
          backgroundColor: {
            healthy: 'var(--k8s-green, #47D16C)',
            warning: 'var(--k8s-yellow, #F9BC2D)',
            critical: 'var(--k8s-red, #F15355)',
            neutral: 'var(--k8s-gray-500, #6B7280)',
            pending: 'var(--k8s-gray-500, #6B7280)',
          }[status]
        }}
      />
      {statusText}
    </span>
  );
};

export default StatusBadge;
