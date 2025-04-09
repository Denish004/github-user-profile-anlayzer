import React from 'react';

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

interface CommitDebugProps {
  commitData: GitHubCommit[];
  repoName: string;
  loading: boolean;
  error: string | null;
}

const CommitDebug: React.FC<CommitDebugProps> = ({ 
  commitData, 
  repoName, 
  loading, 
  error 
}) => {
  console.log("CommitDebug rendering with:", {
    commitData: commitData.length > 0 ? 'data available' : 'no data',
    repoName,
    loading,
    error
  });

  // Check if commitData has the expected structure
  

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Commit Debug - {repoName}</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-2 rounded">
            <p className="font-medium">Status:</p>
            <p>{loading ? "🔄 Loading..." : "✅ Loaded"}</p>
          </div>
          <div className="border p-2 rounded">
            <p className="font-medium">Data Count:</p>
            <p>{commitData.length} commits</p>
          </div>
          <div className="border p-2 rounded">
            <p className="font-medium">Repository:</p>
            <p>{repoName || "None selected"}</p>
          </div>
          <div className="border p-2 rounded">
            <p className="font-medium">Error:</p>
            <p className="text-red-500">{error || "None"}</p>
          </div>
        </div>
        
       
        
        
      </div>
    </div>
  );
};

export default CommitDebug;