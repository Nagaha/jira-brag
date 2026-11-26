# Output templates

## Internal version

```
## Brag doc (internal) · <start> – <end>

<N> tickets done: <n> features, <n> bugs (<n> high priority), <n> support, <n> engineering. <n> still in progress.

**<Theme or epic name>**
- **<Verb>** <what was delivered and why it mattered>. (<EPIC-12>, 9 tickets) [impact: ...]

**Production support**
- **Resolved** <n> production issues, mostly <the common cause, if the tickets show one>. [impact: e.g. mean time to resolve]

**Engineering**
- **<Verb>** <refactor, migration, tooling>.

**In progress**
- <item>: <where it stands>.
```

- 3–5 themes, named after epics or the work itself; 1–3 bullets each.
- Ticket keys in brackets at the end of a bullet, at most three per bullet
  (add "and N more").
- Lead with features and incidents; refactors and chores last.

## Public version (resume, portfolio, LinkedIn)

```
## Highlights · <start> – <end>

- **<Verb>** <what was built or fixed> for <general description of the product or client>, using <key technologies if known>. [impact: ...]
- **Resolved** <n> production issues on <a multi-tenant SaaS platform / general description>, ...
- ...
```

- 4–6 bullets, strongest first, each one or two lines.
- No ticket keys, client names, product codenames or internal service names.
- Never describe security vulnerabilities in detail.
- Real counts from Jira are fine ("40+ tickets", "12 production incidents").

## Verbs

Built, shipped, delivered, designed, migrated, automated, fixed, cut, resolved,
led, unblocked, replaced. Avoid "worked on", "helped with", "was involved in".
