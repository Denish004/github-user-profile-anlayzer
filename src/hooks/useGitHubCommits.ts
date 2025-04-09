import { useState, useEffect } from 'react';

// GitHub API returns an array of commit objects
type GitHubCommit = {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
  author?: {
    login: string;
    avatar_url: string;
  } | null;
};

export function useGitHubCommits(username: string, repoName: string) {
  const [commitData, setCommitData] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!username || !repoName) {
      setCommitData([]);
      setError(null);
      return;
    }
    
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching commits for ${username}/${repoName}`);
        // Use per_page parameter to get up to 100 commits
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=100`);
        
        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`GitHub API error: ${response.status}`, errorBody);
          throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Received ${data.length} commits`);
        setCommitData(data);
      } catch (err) {
        console.error("Error fetching commits:", err);
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