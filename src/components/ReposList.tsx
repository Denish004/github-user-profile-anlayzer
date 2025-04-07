import { GitHubRepo } from '@/types/github';
import { Button } from '@/components/ui/button';

interface ReposListProps {
  repos: GitHubRepo[];
  onSelectRepo: (repo: GitHubRepo) => void;
  selectedRepo: GitHubRepo | null;
}

export function ReposList({ repos, onSelectRepo, selectedRepo }: ReposListProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Repositories ({repos.length})</h2>
      <div className="space-y-3">
        {repos.map(repo => (
          <div 
            key={repo.id} 
            className={`border rounded-lg p-4 ${selectedRepo?.id === repo.id ? 'border-blue-500 bg-blue-50' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{repo.name}</h3>
                {repo.description && <p className="text-sm text-gray-600 mt-1">{repo.description}</p>}
                <div className="flex items-center gap-4 mt-2 text-sm">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1">🍴 {repo.forks_count}</span>
                </div>
              </div>
              <Button
                size="sm" 
                variant="outline" 
                onClick={() => onSelectRepo(repo)}
              >
                View Commits
              </Button>
            </div>
          </div>
        ))}
        {repos.length === 0 && (
          <p className="text-center py-4 text-gray-500">No repositories found.</p>
        )}
      </div>
    </div>
  );
}