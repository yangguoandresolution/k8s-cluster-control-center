
import { cn } from "@/lib/utils";
import TransitionWrapper from "./TransitionWrapper";

type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
  children?: React.ReactNode;
};

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  children,
}: MetricCardProps) => {
  const getTrendColor = () => {
    if (!trend) return '';
    
    return trend.direction === 'up'
      ? 'text-k8s-green'
      : trend.direction === 'down'
      ? 'text-k8s-red'
      : 'text-k8s-gray-500';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    return trend.direction === 'up' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
          clipRule="evenodd"
        />
      </svg>
    ) : trend.direction === 'down' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <TransitionWrapper animation="slide-up" className={cn("neo-card p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-k8s-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <TransitionWrapper animation="fade" delay={100}>
              <p className="text-2xl font-semibold">{value}</p>
            </TransitionWrapper>
            {trend && (
              <TransitionWrapper animation="fade" delay={200}>
                <span
                  className={cn(
                    "ml-2 flex items-center text-sm font-medium",
                    getTrendColor()
                  )}
                >
                  {getTrendIcon()}
                  <span className="ml-1">{trend.value}%</span>
                </span>
              </TransitionWrapper>
            )}
          </div>
          {subtitle && (
            <TransitionWrapper animation="fade" delay={300}>
              <p className="mt-1 text-sm text-k8s-gray-400">{subtitle}</p>
            </TransitionWrapper>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-k8s-gray-50 rounded-lg">
            <TransitionWrapper animation="fade" delay={100}>
              <div className="text-k8s-blue">{icon}</div>
            </TransitionWrapper>
          </div>
        )}
      </div>
      {children && (
        <TransitionWrapper animation="fade" delay={400}>
          <div className="mt-4">{children}</div>
        </TransitionWrapper>
      )}
    </TransitionWrapper>
  );
};

export default MetricCard;
