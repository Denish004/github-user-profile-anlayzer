import { useState, useEffect } from 'react';
import { GitHubRepo } from '../types/github';

export function useGitHubRepos(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const reposData = await response.json();
        setRepos(reposData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
}