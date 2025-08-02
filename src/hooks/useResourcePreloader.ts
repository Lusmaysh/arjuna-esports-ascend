import { useEffect } from 'react';

interface PreloadResource {
  href: string;
  as: 'image' | 'script' | 'style' | 'font';
  type?: string;
  crossorigin?: boolean;
}

export const useResourcePreloader = (resources: PreloadResource[]) => {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    resources.forEach(({ href, as, type, crossorigin }) => {
      // Check if already preloaded
      const existing = document.querySelector(`link[href="${href}"]`);
      if (existing) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      
      if (type) link.type = type;
      if (crossorigin) link.crossOrigin = 'anonymous';
      
      document.head.appendChild(link);
      links.push(link);
    });

    // Cleanup function
    return () => {
      links.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources]);
};

// Hook for prefetching routes
export const useRoutePrefetch = (routes: string[]) => {
  useEffect(() => {
    const prefetchRoute = async (route: string) => {
      try {
        // For Vite, we can use dynamic imports to prefetch route components
        await import(`../pages/${route}.tsx`);
      } catch (error) {
        console.warn(`Failed to prefetch route: ${route}`, error);
      }
    };

    routes.forEach(route => {
      const timer = setTimeout(() => prefetchRoute(route), 100);
      return () => clearTimeout(timer);
    });
  }, [routes]);
};