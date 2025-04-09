# GitHub Profile Analyzer

A modern web application that provides visual insights into GitHub profiles, repositories, and commit histories. Built with React, TypeScript, and Tailwind CSS.
[GitHub Profile Analyzer]
<img alt="GitHub Profile Analyzer" src="./src/assets/Screenshot 2025-04-09 231819.png>
<img alt="GitHub Profile Analyzer" src="./src/assets/Screenshot 2025-04-09 231831.png>

## Features

- 🔍 Search for GitHub users by username
- 👤 View comprehensive user profile information
- 📊 Browse repositories with sorting and filtering
- 📈 Visualize commit history with interactive charts
- 🌙 Dark mode support
- 📱 Fully responsive design

## Tech Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API**: GitHub REST API
- **Build**: Vite

## Local Development

### Prerequisites

- Node.js 16.x or newer
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-profile-analyzer.git
   cd github-profile-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

## Deploying to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended for Beginners)

1. Sign up or log in to [Vercel](https://vercel.com)

2. Click "Add New..." and select "Project"

3. Import your GitHub repository:
   - Connect your GitHub account if you haven't already
   - Select the repository from the list

4. Configure the project:
   - **Framework Preset**: Select "Vite"
   - **Build and Output Settings**:
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - **Environment Variables**: Add any needed environment variables (optional)

5. Click "Deploy"

### Method 2: Deploy with Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   # or
   yarn global add vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project directory and deploy:
   ```bash
   cd github-profile-analyzer
   vercel
   ```

4. Follow the interactive prompts:
   - Set up and deploy: `y`
   - Link to existing project: `n`
   - Project name: `github-profile-analyzer` (or your preferred name)
   - Directory: `.` (root directory)
   - Override settings: Select `n` to use detected settings

5. For subsequent deployments, you can use:
   ```bash
   vercel --prod
   ```

### Environment Variables (Optional)

If you want to add a GitHub Personal Access Token to increase API rate limits:

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens) with `public_repo` scope
2. Add it as an environment variable in Vercel:
   - Name: `VITE_GITHUB_TOKEN`
   - Value: `your_token_here`

## Usage

1. Enter a GitHub username in the search bar
2. Browse user repositories in the left panel
3. Click on a repository to view its commit history and statistics
4. Use the charts to analyze coding patterns and activity

## API Rate Limits

- Without authentication: 60 requests/hour
- With authentication (using token): 5,000 requests/hour

## Troubleshooting

### Common Issues

- **API Rate Limit Exceeded**: Consider adding a GitHub token as described above
- **Empty Repository List**: The user might not have public repositories
- **No Commits Showing**: The repository might be empty or recently created

### Vercel-Specific Issues

- **Build Fails**: Check that all dependencies are properly listed in `package.json`
- **Environment Variables Not Working**: Verify that they're added correctly in Vercel dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

