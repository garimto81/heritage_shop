import type { NextConfig } from "next";
import { execSync } from "child_process";

// Git 정보 가져오기 (Vercel 또는 로컬)
const getGitInfo = () => {
  // Vercel 환경변수 우선 사용
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return {
      commitHash: process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7),
      commitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE || "",
    };
  }

  // 로컬 환경: git 명령어 사용
  try {
    const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    const commitMessage = execSync("git log -1 --pretty=%s").toString().trim();
    return { commitHash, commitMessage };
  } catch {
    return { commitHash: "dev", commitMessage: "local development" };
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
