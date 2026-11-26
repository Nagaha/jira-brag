# JQL queries

Replace `START` and `END` with `YYYY-MM-DD` dates, and add
`AND project in (KEY1, KEY2)` when the user named projects.

## 1. Precise: tickets the user actually worked on

Assigned to them at any point in the period, or moved through the workflow by
them:

```
(assignee WAS currentUser() DURING ("START", "END")
  OR status CHANGED BY currentUser() DURING ("START", "END"))
  AND statusCategoryChangedDate >= "START"
ORDER BY resolutiondate DESC, updated DESC
```

This catches tickets later reassigned to someone else (for example handed to QA)
and support tickets the user resolved without being the final assignee.

The `statusCategoryChangedDate` line matters: without it, `assignee WAS … DURING`
also returns tickets finished long before the period that simply stayed
assigned to the user (in testing, 39 tickets instead of the 22 that actually
moved in the period). If a site rejects that field, drop the line and instead
skip Done tickets whose `resolutiondate` or `updated` date is before START.

Tickets closed as **Won't Do** (or any Done-category status that isn't real
completion) are not achievements: leave them out of the counts.

## 2. Fallback: if the site rejects `WAS` or `CHANGED BY`

Some Jira setups or MCP servers don't support history operators:

```
assignee = currentUser()
  AND (resolved >= "START" AND resolved <= "END"
       OR updated >= "START" AND updated <= "END")
ORDER BY resolutiondate DESC, updated DESC
```

Say in one line that this version misses tickets reassigned away from the user.

## 3. Optional: work the user reported

Useful for people who file their own tickets, such as incident handlers. Run it
only if the first query returns fewer than 5 tickets:

```
reporter = currentUser() AND created >= "START" AND created <= "END"
  AND statusCategory = Done
```

Label these as "reported", since reporting a ticket is not the same as doing it.

## Notes

- `currentUser()` resolves to whoever the MCP connection is signed in as. If a
  tool needs an account ID instead, get it from the server's "user info" tool.
- Story points live in a custom field whose ID differs per site. Skip them
  unless the user asks; ticket counts are more reliable across teams.
- Keep `maxResults` at 100 per page and follow the paging token or `startAt`.
