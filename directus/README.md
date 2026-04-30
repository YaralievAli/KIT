# Directus schema setup

Directus remains optional for this project. The site must build and run on local fallback content when `DIRECTUS_URL` and `DIRECTUS_TOKEN` are not set.

## Schema file

The best-effort schema snapshot lives at:

```text
directus/schema/schema-snapshot.yaml
```

The `directus` service mounts the host folder as `/directus`, so the same file is available inside the container at:

```text
/directus/schema/schema-snapshot.yaml
```

This snapshot was authored for the current Phase 3.5 content model and must be validated against a running Directus instance before it is treated as production-tested.

## Apply schema

Start Directus:

```bash
docker compose up -d postgres directus
```

Apply the snapshot:

```bash
npm run directus:schema:apply
```

This runs:

```bash
docker compose exec directus npx directus schema apply /directus/schema/schema-snapshot.yaml --yes
```

## Update snapshot from Directus

After schema changes are made and verified in Directus, refresh the snapshot:

```bash
npm run directus:schema:snapshot
```

This runs:

```bash
docker compose exec directus npx directus schema snapshot /directus/schema/schema-snapshot.yaml --yes
```

## Notes

- This task does not seed production content.
- This task does not automate Directus roles or permissions.
- Image fields currently accept a local `/images/...` path or a Directus file id string handled by the content adapter.
- Keep `DIRECTUS_TOKEN`, admin password, database password, SMTP credentials, and Telegram tokens out of git.
- If Directus is unavailable, the app logs a warning and falls back to local content.
