# Codex Prompt - Security Review

```md
Mode:
- Review-only.
- Do not modify files.
- Do not run production/deploy commands.
- Do not commit.
- Do not push.
- Do not use git add .
- Do not change deploy flow.

Context:
KIT handles lead forms and personal data. Security review must protect PII, secrets, consent/privacy, analytics, Directus/Postgres, notification delivery, and production deploy safety.

Task:
Review security for:
[INSERT DIFF / BRANCH / FILES / FEATURE]

Check:
1. Data flow:
   - what data is collected;
   - where it is sent;
   - what is stored;
   - what is logged.
2. PII:
   - no names, phones, usernames, comments, raw contact values, or full lead payloads in logs/analytics.
3. Secrets:
   - no secrets in code/docs;
   - no full env output;
   - no private token as NEXT_PUBLIC.
4. Consent/legal:
   - forms still match privacy/consent pages;
   - analytics behavior not changed unexpectedly.
5. API/server:
   - validation preserved;
   - safe error handling;
   - rate-limit/honeypot/origin rules not weakened.
6. Production/deploy:
   - no dangerous restart/reload/server commands;
   - production guardrail preserved.

Output:
1. Security verdict: Pass / Needs changes / Blocker.
2. Findings with severity, file, issue, risk, fix.
3. PII/logging review.
4. Secrets review.
5. Consent/legal review.
6. Production/deploy risk.
7. Required fixes before merge.
```
