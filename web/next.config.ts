import type { NextConfig } from "next";
import { execSync } from "child_process";

// Git 정보 가져오기
const getGitInfo = () => {
  try {
    const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    const commitMessage = execSync("git log -1 --pretty=%s").toString().trim();
    return { commitHash, commitMessage };
  } catch {
    return { commitHash: "unknown", commitMessage: "unknown" };
  }
};

const gitInfo = getGitInfo();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_COMMIT_HASH: gitInfo.commitHash,
    NEXT_PUBLIC_COMMIT_MESSAGE: gitInfo.commitMessage,
  },
};

export default nextConfig;
