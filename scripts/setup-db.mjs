import { execSync } from "child_process";

try {
  console.log("Running prisma generate...");
  execSync("npx prisma generate", { stdio: "inherit" });

  console.log("Running prisma db push...");
  execSync("npx prisma db push", { stdio: "inherit" });

  console.log("Database schema pushed successfully!");
} catch (error) {
  console.error("Failed to push database schema:", error.message);
  process.exit(1);
}
