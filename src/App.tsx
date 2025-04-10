import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GitHubForm } from './components/GitHubForm';
import { ProfileCard } from './components/ProfileCard';
import { ReposList } from './components/ReposList';
import CommitChart from './components/CommitChart';
import { LoadingState } from './components/LoadingState';
import { useGitHubUser } from './hooks/useGitHubUser';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { useGitHubCommits } from './hooks/useGitHubCommits';
import { GitHubRepo } from './types/github';
import CommitDebug from './components/CommitDebug';

function App() {
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  const { user, loading: loadingUser, error: userError } = useGitHubUser(searchUsername);
  const { repos, loading: loadingRepos, error: reposError } = useGitHubRepos(searchUsername);
  const { commitData, loading: loadingCommits, error } = useGitHubCommits(
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
    <div className=" bg-gradient-to-l from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-950 rounded-xl shadow-sm p-6">
        <header className="mb-8 text-center border-b pb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
            GitHub Profile Analyzer
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Analyze GitHub profiles, repositories, and commit histories with visual insights.
          </p>
        </header>
        
        <div className="flex justify-center mb-10">
          <GitHubForm onSubmit={handleSubmit} isLoading={loadingUser} />
        </div>

        {userError && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-center mb-6 border border-red-200 dark:border-red-800 flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {userError === 'User not found' ? 'User not found. Please check the username and try again.' : userError}
          </div>
        )}

        {loadingUser && (
          <div className="py-12">
            <LoadingState />
            <p className="text-center text-slate-500 mt-4">Searching for GitHub profile...</p>
          </div>
        )}

        {user && (
          <div className="space-y-8">
            <ProfileCard user={user} />
            
            {reposError && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-center border border-red-200 dark:border-red-800">
                {reposError}
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className={`lg:col-span-2 ${selectedRepo ? 'lg:block' : 'col-span-full'}`}>
                {loadingRepos ? (
                  <div className="border rounded-xl p-6 h-full flex flex-col justify-center items-center bg-white dark:bg-slate-900">
                    <LoadingState />
                    <p className="text-center text-slate-500 mt-4">Loading repositories...</p>
                  </div>
                ) : (
                  <ReposList 
                    repos={repos} 
                    onSelectRepo={handleSelectRepo} 
                    selectedRepo={selectedRepo} 
                  />
                )}
              </div>
              
              <div className={`lg:col-span-3 ${!selectedRepo && 'hidden lg:hidden'}`}>
                {selectedRepo ? (
                  <div className="border rounded-xl p-6 bg-white dark:bg-slate-900 transition-all duration-300 ease-in-out">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      {selectedRepo.name}
                    </h2>
                    
                    {loadingCommits ? (
                      <div className="py-16 flex flex-col items-center">
                        <LoadingState />
                        <p className="text-center text-slate-500 mt-4">Loading commit data...</p>
                      </div>
                    ) : error ? (
                      <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-6 rounded-lg text-center mb-6 border border-red-200 dark:border-red-800 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p>Error loading commits: {error}</p>
                        <Button 
                          variant="outline" 
                          className="mt-4" 
                          onClick={() => handleSelectRepo(selectedRepo)}
                        >
                          Retry
                        </Button>
                      </div>
                    ) : (
                      commitData.length > 0 ? (
                        <CommitChart 
                          commitData={commitData} 
                          repoName={selectedRepo.name} 
                        />
                      ) : (
                        <div className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 p-6 rounded-lg text-center my-6 border border-amber-200 dark:border-amber-800 flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <p>No commits found for this repository.</p>
                          <p className="text-sm mt-2 text-amber-600 dark:text-amber-500">This repository might be empty or recently created.</p>
                        </div>
                      )
                    )}
                    
                    {/* Debug component hidden in production */}
                    {process.env.NODE_ENV === 'development' && (
                      <CommitDebug
                        commitData={commitData}
                        repoName={selectedRepo.name}
                        loading={loadingCommits}
                        error={error || null}
                      />
                    )}
                  </div>
                ) : (
                  <div className="hidden lg:flex h-full border rounded-xl p-6 bg-white dark:bg-slate-900 items-center justify-center">
                    <p className="text-slate-500 dark:text-slate-400 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z" />
                      </svg>
                      Select a repository to view commit data
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!searchUsername && !user && (
          <div className="text-center text-slate-500 dark:text-slate-400 mt-12 py-16 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-xl mb-2">Enter a GitHub username to begin</p>
            <p className="text-sm max-w-md mx-auto">View user profiles, repositories, and analyze commit data with visual charts.</p>
          </div>
        )}
      </div>
      
      <footer className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>GitHub Profile Analyzer • {new Date().getFullYear()}</p>
        <p className="text-xs mt-1">Uses the GitHub API. Not affiliated with GitHub Inc.</p>
      </footer>
    </div>
  );
}

export default App;
