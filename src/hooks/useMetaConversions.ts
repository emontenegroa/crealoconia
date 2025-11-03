import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConversionEventData {
  eventType: 'PageView' | 'Lead' | 'CompleteRegistration' | 'Purchase';
  email?: string;
  phone?: string;
  customData?: Record<string, any>;
}

export const useMetaConversions = () => {
  const trackEvent = useCallback(async (eventData: ConversionEventData) => {
    try {
      // Generate unique event ID for deduplication
      const eventId = `${eventData.eventType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Get client information with current URL
      const eventSourceUrl = window.location.href;
      const userAgent = navigator.userAgent;
      
      // Get client IP (will be handled server-side)
      const clientIpAddress = undefined; // Server will use request IP
      
      console.log('Tracking Meta Conversion:', {
        eventType: eventData.eventType,
        eventId,
        hasEmail: !!eventData.email
      });
      
      // Send to our edge function
      const { data, error } = await supabase.functions.invoke('meta-conversions', {
        body: {
          eventType: eventData.eventType,
          eventId,
          eventSourceUrl,
          userAgent,
          clientIpAddress,
          email: eventData.email,
          phone: eventData.phone,
          customData: eventData.customData
        }
      });
      
      if (error) {
        // Only log as error if it's not a skipped PageView
        if (eventData.eventType === 'PageView' && !eventData.email) {
          console.log('PageView without email - tracking client-side only');
          return { success: true, skipped: true };
        }
        console.error('Meta Conversion tracking error:', error);
        return { success: false, error };
      }
      
      // Check if event was skipped
      if (data?.skipped) {
        console.log('Meta Conversion skipped:', data.reason);
        return { success: true, skipped: true, data };
      }
      
      console.log('Meta Conversion tracked successfully:', data);
      return { success: true, data };
      
    } catch (error) {
      console.error('Meta Conversion tracking error:', error);
      return { success: false, error };
    }
  }, []);
  
  const trackPageView = useCallback(() => {
    return trackEvent({ eventType: 'PageView' });
  }, [trackEvent]);
  
  const trackLead = useCallback((email?: string, customData?: Record<string, any>) => {
    return trackEvent({ 
      eventType: 'Lead', 
      email,
      customData 
    });
  }, [trackEvent]);
  
  const trackCompleteRegistration = useCallback((email?: string, customData?: Record<string, any>) => {
    return trackEvent({ 
      eventType: 'CompleteRegistration', 
      email,
      customData 
    });
  }, [trackEvent]);
  
  const trackPurchase = useCallback((email?: string, customData?: Record<string, any>) => {
    return trackEvent({ 
      eventType: 'Purchase', 
      email,
      customData 
    });
  }, [trackEvent]);
  
  return {
    trackEvent,
    trackPageView,
    trackLead,
    trackCompleteRegistration,
    trackPurchase
  };
};