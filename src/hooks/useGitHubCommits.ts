import { useState, useEffect } from 'react';
import { CommitActivity } from '../types/github';

export function useGitHubCommits(username: string, repoName: string) {
  const [commitData, setCommitData] = useState<CommitActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username || !repoName) return;
    
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/stats/commit_activity`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        setCommitData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setCommitData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [username, repoName]);

  return { commitData, loading, error };
}