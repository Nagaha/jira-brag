---
name: jira-brag
description: Build a brag doc from the Jira tickets you worked on, with an internal version for appraisals and a public-safe version for your resume, portfolio or LinkedIn. Use when the user runs /jira-brag, or asks for achievements, a brag doc, a self-review or resume bullets based on their Jira tickets. Needs a Jira MCP connection.
argument-hint: "[period] [project key...] [public]"
---

# /jira-brag

Turns the Jira tickets the user worked on into achievements. Read-only: never
create, edit, transition or comment on tickets.

## 1. Check the Jira connection

Look for a Jira tool that can run a JQL search (for example
`searchJiraIssuesUsingJql` from Atlassian's remote MCP server, or `jira_search`
from community servers). If there is none, stop and tell the user:

> This needs a Jira MCP connection. In Claude, add the Atlassian connector
> (Settings → Connectors), or in Claude Code add Atlassian's remote MCP server
> with `claude mcp add` using the URL from Atlassian's MCP docs, then run
> /jira-brag again.

If the tool needs a site or cloud ID, get it from the server's "accessible
resources" tool. If the user has several Jira sites, ask which one, once.

## 2. Read the arguments

All optional, any order:

| Argument | Meaning | Default |
|---|---|---|
| `3 months`, `6m`, `1 year`, `this year`, `Q3`, `H1`, or dates | period | last 3 months |
| one or more project keys (`BILL`, `CORE`) | limit to those projects | all projects |
| `public` | write only the public-safe version | both versions |

Turn the period into a start and end date (`YYYY-MM-DD`). Today is the end
unless a range was given.

## 3. Find the tickets

Use the queries in `reference/jql.md`, in order: the precise query first, the
fallback only if Jira rejects it. Request these fields: summary, issuetype,
status, statusCategory, resolution, resolutiondate, priority, labels,
components, parent (epic), created, updated, and description.

- Page through results up to 300 tickets. If there are more, say so and
  suggest a shorter period.
- No tickets: say exactly which query and period you searched, and suggest a
  longer period or checking the Jira site.

Fetch full details (description, comments) only for the 5–10 tickets that look
most important (high priority bugs, incidents, epics' main stories, tickets
with long descriptions), so the write-up can say what was actually done.

## 4. Sort the tickets into pieces of work

1. **Split by state**: done (status category Done, or resolved in the period)
   and in progress. Ignore tickets that were only touched and never moved forward.
2. **Group** done tickets by epic first, then component or label, then by
   obviously shared subject words. One epic with 12 tickets is one achievement,
   not twelve.
3. **Classify** each group by issue type: features (Story, Feature, Epic),
   fixes (Bug), production support (Incident, Support, Problem, or bugs labelled
   prod/hotfix), and engineering work (Task, Sub-task, Chore, Tech debt).
4. **Count** real numbers from Jira: tickets done per type, bugs by priority,
   epics completed. These are facts and may be used.
5. **Never invent impact.** Jira rarely records results such as latency, users
   or money. Put `[impact: ...]` placeholders where a number would clearly help.

## 5. Write it up

Use the templates in `reference/output.md`:

- **Internal version** (appraisals, 1:1s): may name epics, projects and ticket
  keys so a manager can check them.
- **Public version** (resume, portfolio, LinkedIn): no ticket keys, no client,
  customer, product-codename or internal system names. Replace them with general
  descriptions ("a logistics client", "the billing service", "a multi-tenant
  SaaS platform"). Keep technologies and real counts.

If ticket summaries are too vague to describe the work ("Fix issue",
"Changes as discussed"), say which tickets in one line and ask the user what
they involved instead of guessing.

## 6. Finish

End with:

1. **Numbers to fill in**: the one to three numbers that would most strengthen
   the doc.
2. **Missing**: one line on what Jira doesn't show (reviews, mentoring,
   unticketed support, design work).
3. One line offering to append the internal version to a running
   `brag-doc.md` in a folder the user chooses, newest period first.

## Privacy

Jira tickets often hold customer names, internal details and security issues.
Never put the internal version anywhere public. In the public version, leave
out security vulnerability details entirely; say "fixed security findings from
a penetration test", not what the hole was.
