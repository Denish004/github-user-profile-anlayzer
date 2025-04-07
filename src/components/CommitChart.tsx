import { useEffect, useRef } from 'react';
import { CommitActivity } from '@/types/github';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface CommitChartProps {
  commitData: CommitActivity[];
  repoName: string;
}

export function CommitChart({ commitData, repoName }: CommitChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || commitData.length === 0) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Prepare data for the chart
    const weeks = commitData.map((week, index) => `Week ${index + 1}`).slice(-12);
    const totals = commitData.map(week => week.total).slice(-12);

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: weeks,
          datasets: [{
            label: 'Commits',
            data: totals,
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Weekly Commit Activity for ${repoName}`,
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Commits'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Week'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [commitData, repoName]);

  return (
    <div className="w-full max-w-2xl bg-white p-4 border rounded-lg mt-4">
      <canvas ref={chartRef} />
      {commitData.length === 0 && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No commit data available.</p>
        </div>
      )}
    </div>
  );
}