import { execSync } from "child_process";
import readline from "readline";
import fs from "fs";
import path from "path";

// Function to run shell commands synchronously
function runCommand(command) {
  try {
    console.log(`Running command: ${command}`);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error while executing command: ${command}`);
    process.exit(1);
  }
}

// Start the setup process
console.log("Setting up project...");

// Run npm install
runCommand("npm i");

// Run custom setup steps (if any)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const envPath = path.join(process.cwd(), ".env");
const urlsPath1 = path.join(
  process.cwd(),
  "flickezz",
  "src",
  "api",
  "urls.js"
);

rl.question("What is your main domain ? ", (domain) => {
  if (!domain) {
    console.error("Domain cannot be empty.");
    process.exit(1);
  }

  // Update .env file
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const updatedEnvContent = envContent.includes("ORIGIN1=")
      ? envContent.replace(/ORIGIN1=.*/g, `ORIGIN1=${domain}`)
      : `${envContent}\nORIGIN1=${domain}`;
    fs.writeFileSync(envPath, updatedEnvContent);
    console.log(`Updated .env file with ORIGIN1=${domain}`);
  } else {
    fs.writeFileSync(envPath, `ORIGIN1=${domain}`);
    console.log(`Created .env file with ORIGIN1=${domain}`);
  }

  // Update urls.js file - frontend
  if (fs.existsSync(urlsPath1)) {
    const urlsContent = fs.readFileSync(urlsPath1, "utf-8");
    const updatedUrlsContent = urlsContent.replace(
      /export const BASE_URL = ".*";/,
      `export const BASE_URL = "${domain}";`
    );
    fs.writeFileSync(urlsPath1, updatedUrlsContent);
    console.log(`Updated BASE_URL in ${urlsPath1} to ${domain}`);
  } else {
    console.error(`File not found: ${urlsPath1}`);
  }

  // Install dependencies and build for client/admin
  runCommand("cd flickezz && npm i && npm run build && cd ../");

  // SUCCESS
  console.log("\n🎉 Congratulations! The project is successfully set up! 🎉");

  rl.close();
});
