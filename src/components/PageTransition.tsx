import { useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionKey, setTransitionKey] = useState(location.pathname);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (location.pathname !== transitionKey) {
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionKey(location.pathname);
        setIsVisible(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, transitionKey, children]);

  return (
    <div
      className={`transition-all duration-400 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {displayChildren}
    </div>
  );
}
