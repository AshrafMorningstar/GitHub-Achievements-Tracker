import { UserStats } from "../types";

const BASE_URL = "https://api.github.com";

// GitHub API rate limits unauthenticated requests. 
// In a production app, we would use an OAuth token or a backend proxy.
export const fetchUserStats = async (username: string): Promise<UserStats | null> => {
  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`${BASE_URL}/users/${username}`);
    if (!userRes.ok) {
      if (userRes.status === 404) throw new Error("User not found");
      throw new Error("Failed to fetch user profile");
    }
    const userData = await userRes.json();

    // 2. Fetch Merged PR Count (Pull Shark)
    // We use the search API: type:pr author:username is:merged
    const prRes = await fetch(`${BASE_URL}/search/issues?q=author:${username}+type:pr+is:merged`);
    const prData = prRes.ok ? await prRes.json() : { total_count: 0 };

    // 3. Fetch Total Stars Received (Starstruck)
    // We need to fetch user's repos and sum the stargazers_count. 
    // Fetching up to 100 repos (first page) for efficiency. 
    const reposRes = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&type=owner`);
    let totalStars = 0;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        totalStars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
      }
    }

    return {
      username: userData.login,
      avatarUrl: userData.avatar_url,
      name: userData.name || userData.login,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      mergedPRs: prData.total_count || 0,
      totalStars: totalStars
    };

  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
};
