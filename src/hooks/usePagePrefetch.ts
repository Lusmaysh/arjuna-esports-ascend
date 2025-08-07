import { useEffect } from 'react';

// Cache for prefetched modules
const prefetchCache = new Set<string>();

interface PrefetchRoute {
  route: string;
  delay?: number;
}

export const usePagePrefetch = (routes: (string | PrefetchRoute)[]) => {
  useEffect(() => {
    const prefetchRoute = async (routePath: string, delay: number = 100) => {
      // Skip if already prefetched
      if (prefetchCache.has(routePath)) return;
      
      try {
        // Add delay to avoid blocking main thread
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Dynamic import to prefetch the route component
        await import(`../pages/${routePath}.tsx`);
        
        // Mark as prefetched
        prefetchCache.add(routePath);
        
        console.log(`Prefetched route: ${routePath}`);
      } catch (error) {
        console.warn(`Failed to prefetch route: ${routePath}`, error);
      }
    };

    routes.forEach((route, index) => {
      if (typeof route === 'string') {
        // Simple string route
        prefetchRoute(route, index * 50); // Stagger prefetching
      } else {
        // Route with options
        prefetchRoute(route.route, route.delay ?? index * 50);
      }
    });
  }, [routes]);
};

// Hook for prefetching based on user interactions
export const usePrefetchOnHover = () => {
  const prefetchOnHover = (routePath: string) => {
    if (prefetchCache.has(routePath)) return;
    
    import(`../pages/${routePath}.tsx`)
      .then(() => {
        prefetchCache.add(routePath);
        console.log(`Hover prefetched: ${routePath}`);
      })
      .catch(error => {
        console.warn(`Failed to hover prefetch: ${routePath}`, error);
      });
  };

  return { prefetchOnHover };
};