# jira-brag — a Claude skill

Turn the Jira tickets you worked on into a **brag doc** for your appraisal and
**resume-ready highlights** for your portfolio, in one command:

```
/jira-brag
/jira-brag 6 months
/jira-brag this year BILL CORE
/jira-brag Q3 public
```

You get two versions:

| Version | For | Contains |
|---|---|---|
| **Internal** | Appraisals, self-reviews, 1:1s | Achievements by epic and theme, real ticket counts, ticket keys your manager can check |
| **Public** | Resume, portfolio, LinkedIn | The same work with client names, codenames, ticket keys and security details removed |

See [examples/sample-output.md](examples/sample-output.md) for a full example.

## Why

At review time, most engineers try to remember a year of work from memory and
undersell it. Jira already has the record. This skill reads it, groups 40
tickets into the 5 things that mattered, counts what is countable, and leaves
clear placeholders for impact instead of making numbers up.

## Requirements

- [Claude Code](https://claude.com/claude-code) or Claude with skills enabled
- A **Jira MCP connection**: Atlassian's official remote MCP server (the
  Atlassian connector in Claude), or a community Jira MCP server that can run
  JQL searches

## Install

```bash
npx jira-brag
```

That copies the skill to `~/.claude/skills/jira-brag`, so it works in every
project. Run the same command again to update.

| Command | What it does |
|---|---|
| `npx jira-brag` | Install or update for your user |
| `npx jira-brag --project` | Install into this repo's `.claude/skills/` so your team gets it when you commit |
| `npx jira-brag --uninstall` | Remove it (add `--project` for the project copy) |
| `npx github:Nagaha/jira-brag` | Install straight from GitHub, without npm |

Or manually:

```bash
git clone https://github.com/Nagaha/jira-brag
cp -r jira-brag/skills/jira-brag ~/.claude/skills/
```

Then connect Jira, open Claude Code and run `/jira-brag`. You can also just ask:
"make a brag doc from my Jira tickets for this quarter".

## How it works

1. **Finds your tickets** with JQL: tickets assigned to you at any point in the
   period, or moved through the workflow by you, so work handed over to QA
   still counts. It falls back to a simpler query on sites that don't support
   history searches. ([reference/jql.md](skills/jira-brag/reference/jql.md))
2. **Groups** them by epic, component and subject, and sorts them into
   features, fixes, production support and engineering work.
3. **Reads the important ones in full** (high-priority bugs, incidents, main
   stories) so the write-up says what was actually done.
4. **Writes** both versions from the templates in
   [reference/output.md](skills/jira-brag/reference/output.md).

## Privacy and safety

- **Read-only**: it never creates, edits, moves or comments on tickets.
- The public version removes ticket keys, client and product names, and never
  describes security vulnerabilities.
- Ticket content is read by Claude as part of your conversation, so your
  company's rules for Jira data and AI tools apply. Check them before using it
  on work Jira.

## License

MIT
