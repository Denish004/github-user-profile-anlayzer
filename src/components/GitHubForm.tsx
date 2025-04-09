import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GitHubFormProps {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export function GitHubForm({ onSubmit, isLoading }: GitHubFormProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 disabled:opacity-50"
        disabled={isLoading}
      />
      <Button  className='bg-bluish-50 text-white hover:bg-indigo-600' type="submit" disabled={isLoading || !username.trim()}>
        {isLoading ? 'Loading...' : 'Search'}
      </Button>
    </form>
  );
}