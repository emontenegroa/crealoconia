
// Security middleware utilities

export interface SecurityConfig {
  maxRequestsPerMinute: number;
  maxRequestsPerHour: number;
  blockedIPs: string[];
  allowedOrigins: string[];
}

const defaultConfig: SecurityConfig = {
  maxRequestsPerMinute: 10,
  maxRequestsPerHour: 100,
  blockedIPs: [],
  allowedOrigins: ['localhost', 'lovable.app', 'yxagfbefgqlsjrxjtgjr.supabase.co']
};

// Simple in-memory rate limiting (in production, use Redis or similar)
const requestCounts = new Map<string, { minute: number; hour: number; lastReset: number }>();

export const checkSecurityLimits = (
  identifier: string, 
  config: SecurityConfig = defaultConfig
): { allowed: boolean; reason?: string } => {
  const now = Date.now();
  const minuteKey = Math.floor(now / 60000); // Current minute
  const hourKey = Math.floor(now / 3600000); // Current hour
  
  let counts = requestCounts.get(identifier);
  
  if (!counts || Math.floor(counts.lastReset / 60000) !== minuteKey) {
    counts = { minute: 0, hour: 0, lastReset: now };
    requestCounts.set(identifier, counts);
  }
  
  // Reset hour counter if needed
  if (Math.floor(counts.lastReset / 3600000) !== hourKey) {
    counts.hour = 0;
  }
  
  // Check limits
  if (counts.minute >= config.maxRequestsPerMinute) {
    return { allowed: false, reason: 'Rate limit exceeded (per minute)' };
  }
  
  if (counts.hour >= config.maxRequestsPerHour) {
    return { allowed: false, reason: 'Rate limit exceeded (per hour)' };
  }
  
  // Increment counters
  counts.minute++;
  counts.hour++;
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

export const logSecurityEvent = (event: string, details: any): void => {
  console.warn(`[SECURITY] ${event}:`, details);
  
  // In production, you would send this to a security monitoring service
  // Example: await sendToSecurityMonitoring({ event, details, timestamp: new Date() });
};
