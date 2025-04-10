import { useState, useEffect } from 'react';
import { GitHubUser } from '../types/github';

export function useGitHubUser(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (response.status === 404) {
          throw new Error('User not found');
        }

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error };
}