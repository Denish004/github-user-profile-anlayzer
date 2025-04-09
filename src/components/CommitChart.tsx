import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Updated type to match GitHub API response structure
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

type Props = {
  commitData: GitHubCommit[];
  repoName: string;
};

const CommitChart: React.FC<Props> = ({ commitData, repoName }) => {
  // Group commits by date
  const groupedData = commitData.reduce<Record<string, number>>((acc, item) => {
    // Extract date from commit data (YYYY-MM-DD)
    const date = item.commit.author.date.split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Sort dates and format for display
  const chartData = Object.entries(groupedData)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, count]) => ({
      date,
      commits: count,
    }));

  return (
    <Card className="rounded-2xl shadow-lg p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Daily Commits - {repoName}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }}
            />
            <Bar dataKey="commits" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>

      {/* Display recent commits */}
      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Recent Commits</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {commitData.slice(0, 10).map((commit) => (
            <div key={commit.sha} className="border-l-4 border-blue-500 pl-3 py-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium truncate">{commit.commit.message}</p>
                  <p className="text-sm text-gray-500">
                    {commit.commit.author.name} • {new Date(commit.commit.author.date).toLocaleDateString()}
                  </p>
                </div>
                <a 
                  href={commit.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline text-sm"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CommitChart;
