#!/usr/bin/env node
// Installs the jira-brag Claude skill.
//   npx jira-brag              -> ~/.claude/skills/jira-brag (all your projects)
//   npx jira-brag --project    -> ./.claude/skills/jira-brag (commit it for your team)
//   npx jira-brag --uninstall  -> removes it (add --project for the project copy)

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL = "jira-brag";
const args = new Set(process.argv.slice(2));

if (args.has("--help") || args.has("-h")) {
  console.log(`Usage: npx ${SKILL} [--project] [--uninstall]

  (no flags)    install for your user: ~/.claude/skills/${SKILL}
  --project     install into this project: ./.claude/skills/${SKILL}
  --uninstall   remove the installed skill (combine with --project for the project copy)`);
  process.exit(0);
}

const base = args.has("--project")
  ? path.join(process.cwd(), ".claude", "skills")
  : path.join(os.homedir(), ".claude", "skills");
const dest = path.join(base, SKILL);
const src = path.join(__dirname, "..", "skills", SKILL);

if (args.has("--uninstall")) {
  if (!fs.existsSync(dest)) {
    console.log(`Nothing to remove: ${dest} does not exist.`);
  } else {
    fs.rmSync(dest, { recursive: true, force: true });
    console.log(`Removed ${dest}`);
  }
  process.exit(0);
}

if (!fs.existsSync(path.join(src, "SKILL.md"))) {
  console.error(`Skill files not found at ${src}. The package looks incomplete.`);
  process.exit(1);
}

const updating = fs.existsSync(dest);
fs.mkdirSync(base, { recursive: true });
fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });

console.log(`${updating ? "Updated" : "Installed"} ${SKILL} in ${dest}

Next:
  1. Connect Jira: add the Atlassian connector in Claude, or Atlassian's
     remote MCP server in Claude Code (claude mcp add ...).
  2. Start a new Claude Code session and run:  /${SKILL}
     e.g. /${SKILL} 6 months   or   /${SKILL} this year public`);
