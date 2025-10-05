import fs from "fs";
import path from "path";
import { exec } from "child_process";

export interface AgentDeployData {
  name: string;
  description: string;
  model?: string;
  creativity?: number;
  integrations?: string[];
  trigger?: string;
}

export async function deployAgent(agent: AgentDeployData, apiKey: string) {
  const projectId = agent.name.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now();
  const projectPath = path.join(process.cwd(), "temp_projects", projectId);

  // Ensure folder exists
  fs.mkdirSync(projectPath, { recursive: true });
  fs.mkdirSync(path.join(projectPath, "src", "utils"), { recursive: true });

  // axicov.config.ts
  const configContent = `
const axicovConfig = {
  name: "${agent.name}",
  description: "${agent.description}",
  readmePath: "./README.md",
  env: "./.env",
  params: {
    prompt: {
      type: String,
      description: "LLM prompt",
      required: false
    }
  },
  port: 3000,
  tags: ["LangChain", "AI", "NextJS"]
};

module.exports = axicovConfig;
`;
  fs.writeFileSync(path.join(projectPath, "axicov.config.ts"), configContent.trim());

  // README.md
  const readmeContent = `# ${agent.name}\n\n${agent.description}`;
  fs.writeFileSync(path.join(projectPath, "README.md"), readmeContent);

  // .env
  const envContent = `
NODE_ENV=production
OPENAI_API_KEY=sk-yourkey
LANGCHAIN_TRACING_V2=true
`;
  fs.writeFileSync(path.join(projectPath, ".env"), envContent.trim());

  // package.json
  const packageJson = {
    name: projectId,
    version: "1.0.0",
    main: "src/index.ts",
    scripts: {
      deploy: "axicov deploy -k " + apiKey
    },
    dependencies: {},
  };
  fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(packageJson, null, 2));

  // src/index.ts
  const indexTs = `
export async function run() {
  console.log("Agent ${agent.name} running...");
}
`;
  fs.writeFileSync(path.join(projectPath, "src", "index.ts"), indexTs.trim());

  // Run Axicov CLI deploy
  return new Promise<{ success: boolean; log: string }>((resolve) => {
    exec(`npx axicov deploy -k "${apiKey}"`, { cwd: projectPath }, (err, stdout, stderr) => {
      if (err) {
        resolve({ success: false, log: stderr });
      } else {
        resolve({ success: true, log: stdout });
      }
    });
  });
}