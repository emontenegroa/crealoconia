const ADMIN_TAGS_URL = 'https://yxagfbefgqlsjrxjtgjr.supabase.co/functions/v1/admin-tags';

function getAuthToken(): string {
  const session = localStorage.getItem('admin_session');
  if (session) {
    try {
      const parsed = JSON.parse(session);
      return parsed.token || '';
    } catch {
      return '';
    }
  }
  return '';
}

export const adminTagsAPI = {
  getTags: async () => {
    const token = getAuthToken();
    const response = await fetch(ADMIN_TAGS_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
  },

  createTag: async (name: string, color: string) => {
    const token = getAuthToken();
    const response = await fetch(ADMIN_TAGS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, color }),
    });
    
    if (!response.ok) throw new Error('Failed to create tag');
    return response.json();
  },
};