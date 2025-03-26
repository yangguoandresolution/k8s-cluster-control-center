
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

type TransitionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-right' | 'scale' | 'none';
  once?: boolean;
};

export const TransitionWrapper = ({
  children,
  className,
  delay = 0,
  duration = 300,
  animation = 'fade',
  once = true,
}: TransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (once && hasAnimated) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      if (once) setHasAnimated(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, once, hasAnimated]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return isVisible ? 'animate-fade-in' : 'opacity-0';
      case 'slide-up':
        return isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-5';
      case 'slide-down':
        return isVisible ? 'animate-slide-down' : 'opacity-0 -translate-y-5';
      case 'slide-right':
        return isVisible ? 'animate-slide-in-right' : 'opacity-0 -translate-x-5';
      case 'scale':
        return isVisible ? 'animate-scale-in' : 'opacity-0 scale-95';
      case 'none':
        return '';
      default:
        return isVisible ? 'animate-fade-in' : 'opacity-0';
    }
  };

  return (
    <div
      className={cn(
        getAnimationClass(),
        "transition-all",
        { [`duration-${duration}`]: duration !== 300 },
        className
      )}
      style={{ animationDuration: `${duration}ms`, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
