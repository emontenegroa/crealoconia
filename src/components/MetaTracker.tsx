import { useEffect } from 'react';
import { useMetaConversions } from '@/hooks/useMetaConversions';

// Component to track page view on app initialization
export const MetaTracker = () => {
  const { trackPageView } = useMetaConversions();
  
  useEffect(() => {
    // Track initial page view
    trackPageView();
  }, [trackPageView]);
  
  return null;
};