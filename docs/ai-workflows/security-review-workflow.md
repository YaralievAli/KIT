# Security Review Workflow

Use this workflow when a task might affect personal data, forms, API behavior, privacy/legal posture, dependencies, server commands, or external integrations.

## Trigger Areas

Run security review before merge when changes touch:
- lead forms;
- lead payload;
- `/api/*`;
- Directus/Postgres;
- notifications through email, Telegram, VK, WhatsApp, MAX, or other channels;
- analytics/cookies/consent;
- privacy/legal pages;
- env handling;
- PM2/Docker/deploy scripts;
- file upload;
- webhooks;
- Google Sheets or CRM integrations;
- logging.

## Baseline Rules

- Do not log PII: name, phone, username, raw contact value, comments, or full payload.
- Do not send PII to analytics events.
- Do not expose secrets/env values.
- Do not add client-side secrets.
- Do not write directly to Google Sheets from the frontend.
- Do not block lead saving because an optional integration fails.
- Do not run production commands without the exact owner phrase.
- Do not change deploy flow without separate review.

## Review Sections

### Data Flow

- What data is collected?
- Where is it sent?
- Where is it stored?
- What is logged?
- Is any PII sent to analytics or client logs?

### Consent And Legal

- Does form consent still match the legal pages?
- Were new personal data fields added?
- Did analytics behavior change?
- Are cookies/trackers consent-gated as expected?

### Secrets

- No secrets in code or docs.
- No full env output in logs.
- Private tokens are not `NEXT_PUBLIC_*`.
- Examples do not contain real values.

### Server And Deploy

- No unsafe restart/reload commands.
- `.env.production` loading flow is preserved.
- PM2 reload standard is preserved.
- Downtime-prone commands are clearly marked as emergency-only.

### Error Handling

- External integration failure does not break core lead saving.
- Errors are diagnosable without PII.
- Retry/fallback behavior is safe.

## Output

```md
## Security verdict
- Pass / Needs changes / Blocker

## Findings
1. Severity:
   File:
   Issue:
   Risk:
   Fix:

## PII/logging review
## Secrets review
## Consent/legal review
## Production/deploy risk
## Required fixes before merge
```

Security review should not fix code when the task is review-only.
