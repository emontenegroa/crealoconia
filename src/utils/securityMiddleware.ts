
// Enhanced security middleware with comprehensive protection

import { logSecurityEvent } from './securityValidation';

export interface SecurityConfig {
  maxRequestsPerMinute: number;
  maxRequestsPerHour: number;
  blockedIPs: string[];
  allowedOrigins: string[];
  suspiciousPatterns: RegExp[];
}

const defaultConfig: SecurityConfig = {
  maxRequestsPerMinute: 5,
  maxRequestsPerHour: 50,
  blockedIPs: [],
  allowedOrigins: ['localhost', 'lovable.app', 'yxagfbefgqlsjrxjtgjr.supabase.co'],
  suspiciousPatterns: [
    /<script|javascript:|data:|vbscript:/i,
    /\bselect\b.*\bfrom\b|\bunion\b.*\bselect\b/i,
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i
  ]
};

// Enhanced request tracking with decay
const requestCounts = new Map<string, { 
  minute: number; 
  hour: number; 
  day: number;
  lastReset: number;
  violations: number;
  blocked?: number;
}>();

// Honeypot detection
const honeypotFields = new Set(['bot_trap', 'human_check', 'verification']);

export const checkSecurityLimits = async (
  identifier: string, 
  config: SecurityConfig = defaultConfig,
  requestData?: any
): Promise<{ allowed: boolean; reason?: string; action?: string }> => {
  const now = Date.now();
  const minuteKey = Math.floor(now / 60000);
  const hourKey = Math.floor(now / 3600000);
  const dayKey = Math.floor(now / 86400000);
  
  let counts = requestCounts.get(identifier);
  
  // Initialize or reset counters
  if (!counts || Math.floor(counts.lastReset / 86400000) !== dayKey) {
    counts = { minute: 0, hour: 0, day: 0, lastReset: now, violations: 0 };
    requestCounts.set(identifier, counts);
  }
  
  // Reset minute counter if needed
  if (Math.floor(counts.lastReset / 60000) !== minuteKey) {
    counts.minute = 0;
  }
  
  // Reset hour counter if needed
  if (Math.floor(counts.lastReset / 3600000) !== hourKey) {
    counts.hour = 0;
  }

  // Check if currently blocked
  if (counts.blocked && now < counts.blocked) {
    return { 
      allowed: false, 
      reason: 'Temporarily blocked due to suspicious activity',
      action: 'block'
    };
  }

  // Check for honeypot detection
  if (requestData) {
    for (const [key, value] of Object.entries(requestData)) {
      if (honeypotFields.has(key) && value) {
        counts.violations += 10;
        counts.blocked = now + 3600000; // Block for 1 hour
        
        await logSecurityEvent({
          type: 'honeypot_triggered',
          email: identifier,
          eventData: { field: key, value }
        });
        
        return { 
          allowed: false, 
          reason: 'Bot activity detected',
          action: 'block'
        };
      }
    }

    // Check for suspicious patterns in data
    const dataString = JSON.stringify(requestData).toLowerCase();
    for (const pattern of config.suspiciousPatterns) {
      if (pattern.test(dataString)) {
        counts.violations += 5;
        
        await logSecurityEvent({
          type: 'malicious_pattern_detected',
          email: identifier,
          eventData: { pattern: pattern.source }
        });
        
        if (counts.violations >= 10) {
          counts.blocked = now + 1800000; // Block for 30 minutes
          return { 
            allowed: false, 
            reason: 'Malicious activity detected',
            action: 'block'
          };
        }
      }
    }
  }
  
  // Progressive rate limiting based on violations
  const minuteLimit = counts.violations > 5 ? 
    Math.max(1, config.maxRequestsPerMinute - counts.violations) : 
    config.maxRequestsPerMinute;
    
  const hourLimit = counts.violations > 5 ? 
    Math.max(5, config.maxRequestsPerHour - (counts.violations * 2)) : 
    config.maxRequestsPerHour;
  
  // Check limits
  if (counts.minute >= minuteLimit) {
    counts.violations += 1;
    
    await logSecurityEvent({
      type: 'rate_limit_exceeded_minute',
      email: identifier,
      eventData: { count: counts.minute, limit: minuteLimit }
    });
    
    return { 
      allowed: false, 
      reason: 'Rate limit exceeded (per minute)',
      action: 'rate_limit'
    };
  }
  
  if (counts.hour >= hourLimit) {
    counts.violations += 2;
    
    await logSecurityEvent({
      type: 'rate_limit_exceeded_hour',
      email: identifier,
      eventData: { count: counts.hour, limit: hourLimit }
    });
    
    return { 
      allowed: false, 
      reason: 'Rate limit exceeded (per hour)',
      action: 'rate_limit'
    };
  }
  
  // Increment counters
  counts.minute++;
  counts.hour++;
  counts.day++;
  counts.lastReset = now;
  
  return { allowed: true };
};

export const sanitizeEmail = (email: string): string => {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, '') // Remove special chars except valid email chars
    .substring(0, 254); // Max email length
};

export const isValidOrigin = (origin: string, config: SecurityConfig = defaultConfig): boolean => {
  if (!origin) return false;
  
  try {
    const url = new URL(origin);
    return config.allowedOrigins.some(allowed => 
      url.hostname.includes(allowed) || url.hostname === allowed
    );
  } catch {
    return false;
  }
};

export const logSecurityEventMiddleware = async (event: string, details: any): Promise<void> => {
  console.warn(`[SECURITY] ${event}:`, details);
  
  try {
    await logSecurityEvent({
      type: event,
      email: details.email || details.identifier,
      eventData: details
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

// Enhanced fingerprinting for better user tracking
export const generateSecurityFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Security fingerprint', 2, 2);
  }
  
  const fingerprint = {
    screen: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    canvas: canvas.toDataURL(),
    memory: (navigator as any).deviceMemory || 'unknown',
    cores: navigator.hardwareConcurrency || 'unknown'
  };
  
  return btoa(JSON.stringify(fingerprint)).substring(0, 32);
};

// Check for automated behavior patterns
export const detectAutomatedBehavior = (actions: Array<{timestamp: number, type: string}>): boolean => {
  if (actions.length < 3) return false;
  
  // Check for too-regular intervals (bot-like behavior)
  const intervals = [];
  for (let i = 1; i < actions.length; i++) {
    intervals.push(actions[i].timestamp - actions[i-1].timestamp);
  }
  
  // If all intervals are exactly the same, it's likely a bot
  const uniqueIntervals = new Set(intervals);
  if (uniqueIntervals.size === 1 && intervals[0] < 1000) {
    return true;
  }
  
  // Check for impossibly fast form completion
  const totalTime = actions[actions.length - 1].timestamp - actions[0].timestamp;
  const formFields = actions.filter(a => a.type === 'field_input').length;
  
  // Less than 1 second per field is suspicious for long form
  if (formFields > 5 && totalTime / formFields < 1000) {
    return true;
  }
  
  return false;
};

export default {
  checkSecurityLimits,
  sanitizeEmail,
  isValidOrigin,
  logSecurityEvent: logSecurityEventMiddleware,
  generateSecurityFingerprint,
  detectAutomatedBehavior
};
