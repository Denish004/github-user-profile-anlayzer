import { GitHubUser } from '@/types/github';

interface ProfileCardProps {
  user: GitHubUser;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start bg-white border rounded-lg p-6 w-full max-w-2xl">
      <div className="flex-shrink-0">
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
          className="w-24 h-24 rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          @{user.login}
        </a>
        {user.bio && <p className="mt-2 text-gray-600">{user.bio}</p>}
        <div className="flex gap-4 mt-3">
          <div className="text-center">
            <span className="block font-bold">{user.public_repos}</span>
            <span className="text-sm text-gray-500">Repositories</span>
          </div>
          <div className="text-center">
            <span className="block font-bold">{user.followers}</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
          <div className="text-center">
            <span className="block font-bold">{user.following}</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}