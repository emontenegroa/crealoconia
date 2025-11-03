const ADMIN_TAGS_URL = 'https://yxagfbefgqlsjrxjtgjr.supabase.co/functions/v1/admin-tags';

export const adminTagsAPI = {
  getTags: async () => {
    const response = await fetch(ADMIN_TAGS_URL, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YWdmYmVmZ3Fsc2pyeGp0Z2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTk3MDksImV4cCI6MjA2Mzg5NTcwOX0.lARyIy_arVLqJguAT_gpjWe5CXUDhdBHvpEuJP0Kvvs'}`,
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YWdmYmVmZ3Fsc2pyeGp0Z2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTk3MDksImV4cCI6MjA2Mzg5NTcwOX0.lARyIy_arVLqJguAT_gpjWe5CXUDhdBHvpEuJP0Kvvs',
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
  },

  createTag: async (name: string, color: string) => {
    const response = await fetch(ADMIN_TAGS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YWdmYmVmZ3Fsc2pyeGp0Z2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTk3MDksImV4cCI6MjA2Mzg5NTcwOX0.lARyIy_arVLqJguAT_gpjWe5CXUDhdBHvpEuJP0Kvvs'}`,
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YWdmYmVmZ3Fsc2pyeGp0Z2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTk3MDksImV4cCI6MjA2Mzg5NTcwOX0.lARyIy_arVLqJguAT_gpjWe5CXUDhdBHvpEuJP0Kvvs',
      },
      body: JSON.stringify({ name, color }),
    });
    
    if (!response.ok) throw new Error('Failed to create tag');
    return response.json();
  },
};