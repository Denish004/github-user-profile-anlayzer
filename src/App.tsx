import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GitHubForm } from './components/GitHubForm';
import { ProfileCard } from './components/ProfileCard';
import { ReposList } from './components/ReposList';
import { CommitChart } from './components/CommitChart';
import { LoadingState } from './components/LoadingState';
import { useGitHubUser } from './hooks/useGitHubUser';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { useGitHubCommits } from './hooks/useGitHubCommits';
import { GitHubRepo } from './types/github';

function App() {
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  const { user, loading: loadingUser, error: userError } = useGitHubUser(searchUsername);
  const { repos, loading: loadingRepos, error: reposError } = useGitHubRepos(searchUsername);
  const { commitData, loading: loadingCommits } = useGitHubCommits(
    searchUsername,
    selectedRepo?.name || ''
  );

  const handleSubmit = (username: string) => {
    setSearchUsername(username);
    setSelectedRepo(null);
  };

  const handleSelectRepo = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">GitHub Profile Analyzer</h1>
        
        <div className="flex justify-center mb-8">
          <GitHubForm onSubmit={handleSubmit} isLoading={loadingUser} />
        </div>

        {userError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-6">
            {userError}
          </div>
        )}

        {loadingUser && <LoadingState />}

        {user && (
          <div className="space-y-8">
            <ProfileCard user={user} />
            
            {reposError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                {reposError}
              </div>
            )}
            
            {loadingRepos ? (
              <LoadingState />
            ) : (
              <ReposList 
                repos={repos} 
                onSelectRepo={handleSelectRepo} 
                selectedRepo={selectedRepo} 
              />
            )}
            
            {selectedRepo && (
              <div>
                {loadingCommits ? (
                  <LoadingState />
                ) : (
                  <CommitChart 
                    commitData={commitData} 
                    repoName={selectedRepo.name} 
                  />
                )}
              </div>
            )}
          </div>
        )}

        {!searchUsername && (
          <div className="text-center text-slate-500 mt-12">
            <p>Enter a GitHub username to see their profile and repositories.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
