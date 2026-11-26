# Sample output

*Fictional company, tickets and numbers, made up to show the format.*

`/jira-brag 3 months`

---

## Brag doc (internal) · 1 Aug – 31 Oct 2026

38 tickets done: 14 features, 17 bugs (5 high priority), 6 support, 1 engineering. 3 still in progress.

**Usage-based billing (PAY-40)**
- **Delivered** usage-based invoicing for enterprise tenants: per-transaction charges, freight surcharges and monthly invoice line items. (PAY-40, 11 tickets) [impact: e.g. tenants moved to the new billing]
- **Fixed** rounding and timezone errors that produced wrong month-end totals. (PAY-61, PAY-63, PAY-70)

**Sign-in and accounts**
- **Shipped** optional MFA per tenant, without breaking existing logins. (AUTH-12, and 4 more)

**Production support**
- **Resolved** 6 production incidents, 4 of them caused by tenant configuration errors. [impact: e.g. average time to resolve]

**In progress**
- Bulk export to S3 (PAY-77): API done, file cleanup job left.

**Numbers to fill in, if you have them:**
1. How many tenants use usage-based billing now.
2. Average time to resolve the incidents.

**Missing:** code reviews, client calls and support handled outside Jira don't show up here.

---

## Highlights · Aug – Oct 2026

- **Delivered** usage-based invoicing for a multi-tenant B2B SaaS platform: per-transaction charges, surcharges and monthly invoice line items.
- **Shipped** per-tenant multi-factor authentication without disrupting existing users.
- **Resolved** 17 bugs (5 high priority) and 6 production incidents, tracing most incidents to tenant configuration errors.
